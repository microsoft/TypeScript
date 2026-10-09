package api

import (
	"context"
	"fmt"
	"io"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
)

// StdioServerOptions configures the STDIO-based API server.
type StdioServerOptions struct {
	In                 io.ReadCloser
	Out                io.WriteCloser
	Err                io.Writer
	Cwd                tspath.RootedDirectoryPath
	DefaultLibraryPath tspath.RootedDirectoryPath
	// PipePath, if set, listens on a named pipe (Windows) or Unix domain
	// socket instead of using In/Out for communication.
	PipePath string
	// Callbacks specifies which filesystem operations should be delegated
	// to the client (e.g., "readFile", "fileExists"). Empty means no callbacks.
	Callbacks []string
	// UseCaseSensitiveFileNames overrides the base filesystem's case sensitivity.
	UseCaseSensitiveFileNames *bool
	// Async enables JSON-RPC protocol with async connection handling.
	// When false (default), uses MessagePack protocol with sync connection.
	Async bool
	// CollectTiming enables per-request server processing-time measurement.
	// When enabled, the server accumulates each request's processing time into
	// running totals and a recent-request ring buffer. Response messages are
	// left unchanged; the client folds this data into its own timing snapshot
	// on demand via getServerTiming / resetServerTiming requests.
	CollectTiming bool
	// RunExternalCode allows configured content mappers to execute.
	RunExternalCode      bool
	ContentMapperSpawner contentmapper.Spawner
}

// StdioServer runs an API session over STDIO using MessagePack protocol.
// This is the entry point for the synchronous STDIO-based API used by
// native TypeScript tooling integration.
type StdioServer struct {
	options *StdioServerOptions
}

// NewStdioServer creates a new STDIO-based API server.
func NewStdioServer(options *StdioServerOptions) *StdioServer {
	if options.Cwd == "" {
		panic("StdioServerOptions.Cwd is required")
	}

	return &StdioServer{
		options: options,
	}
}

// Run starts the server and blocks until the connection closes or ctx is cancelled.
func (s *StdioServer) Run(ctx context.Context) error {
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()
	var transport ipc.Transport
	if s.options.PipePath != "" {
		t, err := ipc.NewPipeTransport(s.options.PipePath)
		if err != nil {
			return fmt.Errorf("failed to create pipe transport: %w", err)
		}
		defer t.Close()
		transport = t
	} else {
		t := ipc.NewStdioTransport(s.options.In, s.options.Out)
		defer t.Close()
		transport = t
	}
	stopAccept := context.AfterFunc(ctx, func() { _ = transport.Close() })
	defer stopAccept()

	fs := bundled.WrapFS(osvfs.FS())

	// Wrap the base FS when callbacks or an explicit case-sensitivity setting are requested.
	var callbackFS *callbackFS
	if len(s.options.Callbacks) > 0 || s.options.UseCaseSensitiveFileNames != nil {
		callbackFS = newCallbackFS(fs, s.options.Callbacks, s.options.UseCaseSensitiveFileNames)
		fs = callbackFS
	}

	sessionInit := &project.SessionInit{
		BackgroundCtx: ctx,
		Logger:        nil, // TODO: Add logging support
		FS:            fs,
		Options: &project.SessionOptions{
			CurrentDirectory:   s.options.Cwd,
			DefaultLibraryPath: s.options.DefaultLibraryPath,
			PositionEncoding:   lsproto.PositionEncodingKindUTF8,
			LoggingEnabled:     false,
			RunExternalCode:    s.options.RunExternalCode,
		},
		Spawner: s.options.ContentMapperSpawner,
	}

	session := NewStandaloneSession(sessionInit, &SessionOptions{
		UseBinaryResponses: !s.options.Async, // Only msgpack uses binary responses
	})
	defer session.Close()

	// Accept connection from transport
	rwc, err := transport.Accept()
	if err != nil {
		return serverRunError(ctx, fmt.Errorf("failed to accept connection: %w", err))
	}
	defer rwc.Close()
	stopConnection := context.AfterFunc(ctx, func() { _ = rwc.Close() })
	defer stopConnection()

	// Create protocol and connection based on async mode
	var conn ipc.Conn
	if s.options.Async {
		protocol := newCancellableProtocol(ctx, ipc.NewJSONRPCProtocol(rwc))
		asyncConn := ipc.NewAsyncConnWithProtocol(rwc, protocol, session)
		asyncConn.SetCollectTiming(s.options.CollectTiming)
		conn = asyncConn
	} else {
		protocol := newCancellableProtocol(ctx, NewMessagePackProtocol(rwc))
		syncConn := ipc.NewSyncConn(rwc, protocol, session)
		syncConn.SetCollectTiming(s.options.CollectTiming)
		conn = syncConn
	}

	// If callbacks are enabled, set the connection on the FS
	if callbackFS != nil {
		callbackFS.SetConnection(ctx, conn)
	}
	session.SetConnection(conn)

	return serverRunError(ctx, conn.Run(ctx))
}

type protocolReadResult struct {
	message *ipc.Message
	err     error
}

type cancellableProtocol struct {
	ipc.Protocol
	ctx      context.Context
	requests chan struct{}
	results  chan protocolReadResult
}

func newCancellableProtocol(ctx context.Context, protocol ipc.Protocol) *cancellableProtocol {
	p := &cancellableProtocol{
		Protocol: protocol,
		ctx:      ctx,
		requests: make(chan struct{}),
		results:  make(chan protocolReadResult),
	}
	go func() {
		for {
			select {
			case <-ctx.Done():
				return
			case <-p.requests:
				message, err := protocol.ReadMessage()
				select {
				case <-ctx.Done():
					return
				case p.results <- protocolReadResult{message: message, err: err}:
					continue
				}
			}
		}
	}()
	return p
}

// Stdin reads may remain blocked even after Close. Keep that read separate from
// request handling so cancellation can finish handlers and close the session.
// Reads are demand-driven because synchronous callbacks also read responses.
func (p *cancellableProtocol) ReadMessage() (*ipc.Message, error) {
	select {
	case <-p.ctx.Done():
		return nil, p.ctx.Err()
	case p.requests <- struct{}{}:
		select {
		case <-p.ctx.Done():
			return nil, p.ctx.Err()
		case result := <-p.results:
			return result.message, result.err
		}
	}
}

func serverRunError(ctx context.Context, err error) error {
	if ctx.Err() != nil {
		return nil
	}
	return err
}

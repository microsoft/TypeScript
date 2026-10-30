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
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
)

// StdioServerOptions configures the STDIO-based API server.
type StdioServerOptions struct {
	In                 io.ReadCloser
	Out                io.WriteCloser
	Err                io.Writer
	Cwd                tspath.RootedDirectoryPath
	DefaultLibraryPath tspath.RootedDirectoryPath
	// PipePath, if set, is the named pipe path on Windows. On Unix, it must
	// not exist and is created as a private directory containing "socket".
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
	// FS replaces the operating-system file system as the server's base file
	// system, which callbacks fall back to.
	FS vfs.FS
	// Tuples, if set, carries synchronous protocol messages directly instead
	// of In, Out, or PipePath.
	Tuples TupleTransport
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

// Run starts the server and blocks until the connection closes.
func (s *StdioServer) Run(ctx context.Context) error {
	var transport ipc.Transport
	if s.options.Tuples != nil {
		if s.options.Async {
			panic("StdioServerOptions.Tuples requires the synchronous protocol")
		}
	} else if s.options.PipePath != "" {
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

	baseFS := s.options.FS
	if baseFS == nil {
		baseFS = osvfs.FS()
	}
	fs := bundled.WrapFS(baseFS)

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

	var conn ipc.Conn
	if s.options.Tuples != nil {
		syncConn := ipc.NewSyncConn(nil, NewTupleProtocol(s.options.Tuples), session)
		syncConn.SetCollectTiming(s.options.CollectTiming)
		conn = syncConn
	} else if rwc, err := transport.Accept(); err != nil {
		return fmt.Errorf("failed to accept connection: %w", err)
	} else if s.options.Async {
		protocol := ipc.NewJSONRPCProtocol(rwc)
		asyncConn := ipc.NewAsyncConnWithProtocol(rwc, protocol, session)
		asyncConn.SetCollectTiming(s.options.CollectTiming)
		conn = asyncConn
	} else {
		protocol := NewMessagePackProtocol(rwc)
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

func serverRunError(ctx context.Context, err error) error {
	if ctx.Err() != nil {
		return nil
	}
	return err
}

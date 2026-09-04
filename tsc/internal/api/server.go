package api

import (
	"context"
	"fmt"
	"os"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
)

// ServerOptions configures the API server.
type ServerOptions struct {
	Cwd                string
	DefaultLibraryPath string
	// Transport specifies "stdio", "pipe=<path>", or "sync=<path>".
	Transport string
	// Callbacks specifies which filesystem operations should be delegated
	// to the client (e.g., "readFile", "fileExists"). Empty means no callbacks.
	Callbacks []string
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

// Server runs an API session using MessagePack or JSON-RPC.
// This is the entry point for the API used by
// native TypeScript tooling integration.
type Server struct {
	options *ServerOptions
}

// NewServer creates an API server.
func NewServer(options *ServerOptions) *Server {
	if options.Cwd == "" {
		panic("ServerOptions.Cwd is required")
	}

	return &Server{
		options: options,
	}
}

// Run starts the server and blocks until the connection closes.
func (s *Server) Run(ctx context.Context) error {
	transport, err := s.createTransport()
	if err != nil {
		return fmt.Errorf("failed to create transport: %w", err)
	}
	defer transport.Close()

	fs := bundled.WrapFS(osvfs.FS())

	// Wrap the base FS with callbackFS if callbacks are requested
	var callbackFS *callbackFS
	if len(s.options.Callbacks) > 0 {
		callbackFS = newCallbackFS(fs, s.options.Callbacks)
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
	rwc, err := transport.Accept(ctx)
	if err != nil {
		return fmt.Errorf("failed to accept connection: %w", err)
	}
	defer rwc.Close()
	connectionDone := make(chan struct{})
	defer close(connectionDone)
	go func() {
		select {
		case <-ctx.Done():
			_ = rwc.Close()
		case <-connectionDone:
			return
		}
	}()

	// Create protocol and connection based on async mode
	var conn ipc.Conn
	if s.options.Async {
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

	return conn.Run(ctx)
}

func (s *Server) createTransport() (ipc.Transport, error) {
	spec := s.options.Transport
	switch {
	case spec == "" || spec == "stdio":
		return ipc.NewStdioTransport(
			os.Stdin,  //nolint:forbidigo
			os.Stdout, //nolint:forbidigo
		), nil
	case strings.HasPrefix(spec, "pipe="):
		return ipc.NewPipeTransport(strings.TrimPrefix(spec, "pipe="))
	case strings.HasPrefix(spec, "sync="):
		return ipc.NewSyncTransport(strings.TrimPrefix(spec, "sync="))
	default:
		return nil, fmt.Errorf("unknown transport: %q", spec)
	}
}

package api

import (
	"context"
	"fmt"
	"io"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/vfs/osvfs"
)

// StdioServerOptions configures the STDIO-based API server.
type StdioServerOptions struct {
	In                 io.ReadCloser
	Out                io.WriteCloser
	Err                io.Writer
	Cwd                string
	DefaultLibraryPath string
	// Callbacks specifies which filesystem operations should be delegated
	// to the client (e.g., "readFile", "fileExists"). Empty means no callbacks.
	Callbacks []string
	// Async enables JSON-RPC protocol with async connection handling.
	// When false (default), uses MessagePack protocol with sync connection.
	Async bool
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
	transport := NewStdioTransport(s.options.In, s.options.Out)
	defer transport.Close()

	fs := bundled.WrapFS(osvfs.FS())

	// Wrap the base FS with callbackFS if callbacks are requested
	var callbackFS *callbackFS
	if len(s.options.Callbacks) > 0 {
		callbackFS = newCallbackFS(fs, s.options.Callbacks)
		fs = callbackFS
	}

	projectSession := project.NewSession(&project.SessionInit{
		BackgroundCtx: ctx,
		Logger:        nil, // TODO: Add logging support
		FS:            fs,
		Options: &project.SessionOptions{
			CurrentDirectory:   s.options.Cwd,
			DefaultLibraryPath: s.options.DefaultLibraryPath,
			PositionEncoding:   lsproto.PositionEncodingKindUTF8,
			LoggingEnabled:     false,
		},
	})

	session := NewSession(projectSession, &SessionOptions{
		UseBinaryResponses: !s.options.Async, // Only msgpack uses binary responses
	})
	defer session.Close()

	// Accept connection from transport
	rwc, err := transport.Accept()
	if err != nil {
		return fmt.Errorf("failed to accept connection: %w", err)
	}

	// Create protocol and connection based on async mode
	var conn Conn
	if s.options.Async {
		protocol := NewJSONRPCProtocol(rwc)
		conn = NewAsyncConnWithProtocol(rwc, protocol, session)
	} else {
		protocol := NewMessagePackProtocol(rwc)
		conn = NewSyncConn(rwc, protocol, session)
	}

	// If callbacks are enabled, set the connection on the FS
	if callbackFS != nil {
		callbackFS.SetConnection(ctx, conn)
	}

	return conn.Run(ctx)
}

package lsp

import (
	"context"
	"io"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

type shutdownTestReader struct{}

func (shutdownTestReader) Read() (*lsproto.Message, error) { return nil, io.EOF }

type shutdownTestWriter struct{}

func (shutdownTestWriter) Write(*lsproto.Message) error { return nil }

// TestServerShutdownNoDeadlock verifies that operations after shutdown
// don't block.
func TestServerShutdownNoDeadlock(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
		"/test/tsconfig.json": "{}",
		"/test/index.ts":      "const x = 1;",
	}, false))

	server := NewServer(&ServerOptions{
		In:                 shutdownTestReader{},
		Out:                shutdownTestWriter{},
		Err:                io.Discard,
		Cwd:                "/test",
		FS:                 fs,
		DefaultLibraryPath: bundled.LibPath(),
	})

	ctx, cancel := context.WithCancel(context.Background())
	server.backgroundCtx = ctx

	// Start write loop to drain queue
	writeLoopDone := make(chan struct{})
	go func() {
		_ = server.writeLoop(ctx)
		close(writeLoopDone)
	}()

	// Create session with the server's lifecycle context
	server.initStarted.Store(true)
	server.session = project.NewSession(&project.SessionInit{
		BackgroundCtx: ctx,
		Options: &project.SessionOptions{
			CurrentDirectory:   "/test",
			DefaultLibraryPath: bundled.LibPath(),
			PositionEncoding:   lsproto.PositionEncodingKindUTF8,
			WatchEnabled:       false,
			LoggingEnabled:     true,
		},
		FS:     fs,
		Logger: server.logger,
	})

	// Open a file to establish a project
	server.session.DidOpenFile(ctx, "file:///test/index.ts", 1, "const x = 1;", lsproto.LanguageKindTypeScript)
	server.session.WaitForBackgroundTasks()

	// Shutdown (cancel context and wait for write loop to exit)
	cancel()
	<-writeLoopDone

	// Trigger operations that would log (these should not block)
	server.session.DidChangeFile(ctx, "file:///test/index.ts", 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
		{
			WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{
				Text: "const x = 2;",
			},
		},
	})
	_, _ = server.session.GetLanguageService(ctx, "file:///test/index.ts")
	server.session.WaitForBackgroundTasks()

	server.session.Close()
}

func TestServerOutgoingQueueDoesNotBlockWithoutWriter(t *testing.T) {
	t.Parallel()

	server := NewServer(&ServerOptions{
		In:  shutdownTestReader{},
		Out: shutdownTestWriter{},
		Err: io.Discard,
		Cwd: "/test",
	})
	server.backgroundCtx = t.Context()

	msg := lsproto.WindowLogMessageInfo.NewNotificationMessage(&lsproto.LogMessageParams{
		Type:    lsproto.MessageTypeInfo,
		Message: "queued",
	}).Message()

	done := make(chan error, 1)
	go func() {
		for range 1000 {
			if err := server.send(msg); err != nil {
				done <- err
				return
			}
		}
		done <- nil
	}()

	select {
	case err := <-done:
		if err != nil {
			t.Fatal(err)
		}
	case <-t.Context().Done():
		t.Fatal("sending outgoing messages blocked without a writer")
	}
}

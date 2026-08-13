package lsp

import (
	"context"
	"io"
	"testing"
	"time"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/jsonrpc"
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

// A response that exceeds the JSON encoder's nesting limit must fail only its
// request. The write loop must remain available to deliver subsequent responses.
func TestWriteLoopRecoversFromUnserializableResponse(t *testing.T) {
	t.Parallel()

	pr, pw := io.Pipe()
	server := NewServer(&ServerOptions{
		In:  shutdownTestReader{},
		Out: ToWriter(pw),
		Err: io.Discard,
		Cwd: "/test",
	})

	ctx, cancel := context.WithCancel(t.Context())
	defer cancel()
	server.backgroundCtx = ctx

	writeLoopErr := make(chan error, 1)
	go func() { writeLoopErr <- server.writeLoop(ctx) }()

	// A selection range whose parent chain is far deeper than the JSON encoder's nesting limit.
	var deep *lsproto.SelectionRange
	for range 20000 {
		deep = &lsproto.SelectionRange{Parent: deep}
	}
	badResult := []*lsproto.SelectionRange{deep}
	badID := jsonrpc.NewIDString("bad")
	if err := server.send((&lsproto.ResponseMessage{ID: badID, Result: &badResult}).Message()); err != nil {
		t.Fatalf("failed to enqueue bad response: %v", err)
	}

	// A subsequent well-formed response must still be delivered.
	goodID := jsonrpc.NewIDString("good")
	if err := server.send((&lsproto.ResponseMessage{ID: goodID, Result: &lsproto.SelectionRangesOrNull{}}).Message()); err != nil {
		t.Fatalf("failed to enqueue good response: %v", err)
	}

	reader := lsproto.NewBaseReader(pr)
	sawError := false
	sawGood := false
	for range 2 {
		msg := readMessageWithTimeout(t, reader)
		resp := msg.AsResponse()
		switch {
		case resp.ID != nil && *resp.ID == *badID:
			if resp.Error == nil {
				t.Errorf("expected an error response for the unserializable request, got a result")
			} else if resp.Error.Code != int32(lsproto.ErrorCodeInternalError) {
				t.Errorf("error response code = %d, want %d", resp.Error.Code, lsproto.ErrorCodeInternalError)
			}
			sawError = true
		case resp.ID != nil && *resp.ID == *goodID:
			if resp.Error != nil {
				t.Errorf("expected a successful response for the good request, got error: %v", resp.Error)
			}
			sawGood = true
		default:
			t.Errorf("unexpected response id: %v", resp.ID)
		}
	}

	if !sawError {
		t.Errorf("did not receive an error response for the unserializable request")
	}
	if !sawGood {
		t.Errorf("did not receive the subsequent well-formed response (write loop likely died)")
	}

	// The write loop must still be running.
	select {
	case err := <-writeLoopErr:
		t.Fatalf("write loop exited unexpectedly: %v", err)
	default:
		return
	}
}

func readMessageWithTimeout(t *testing.T, reader *lsproto.BaseReader) *lsproto.Message {
	t.Helper()
	type result struct {
		msg *lsproto.Message
		err error
	}
	ch := make(chan result, 1)
	go func() {
		data, err := reader.Read()
		if err != nil {
			ch <- result{err: err}
			return
		}
		msg := &lsproto.Message{}
		ch <- result{msg: msg, err: msg.UnmarshalJSON(data)}
	}()
	select {
	case r := <-ch:
		if r.err != nil {
			t.Fatalf("failed to read message: %v", r.err)
		}
		return r.msg
	case <-time.After(2 * time.Second):
		t.Fatal("timed out waiting for a message (write loop may have died)")
		return nil
	}
}

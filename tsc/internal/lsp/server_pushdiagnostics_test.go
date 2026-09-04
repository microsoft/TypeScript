package lsp_test

import (
	"context"
	"io"
	"sync"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/lsp"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/lsptestutil"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

// TestPushFileDiagnosticsGate verifies the initialization gate for per-file push
// diagnostics: clients without pull-diagnostics support receive them, while
// pull-capable clients and clients that set disablePushDiagnostics do not.
func TestPushFileDiagnosticsGate(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileContent = `const x: number = "";`
	files := map[string]string{
		"/home/project/tsconfig.json": `{}`,
		"/home/project/index.ts":      fileContent,
	}
	uri := lsproto.DocumentUri("file:///home/project/index.ts")

	// run initializes a server with the given capabilities and options, opens the
	// file, waits for background tasks and a transport round trip, and returns the
	// publishDiagnostics params received for the file.
	run := func(t *testing.T, caps *lsproto.ClientCapabilities, initializationOptions *lsproto.InitializationOptions) []*lsproto.PublishDiagnosticsParams {
		onServerRequest := func(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
			switch req.Method {
			case lsproto.MethodWorkspaceConfiguration:
				return &lsproto.ResponseMessage{ID: req.ID, JSONRPC: req.JSONRPC, Result: []any{nil, nil, nil, nil}}
			case lsproto.MethodClientRegisterCapability, lsproto.MethodClientUnregisterCapability:
				return &lsproto.ResponseMessage{ID: req.ID, JSONRPC: req.JSONRPC, Result: lsproto.Null{}}
			default:
				return nil
			}
		}

		fs := bundled.WrapFS(vfstest.FromMap(files, false))
		client, closeClient := lsptestutil.NewLSPClient(t, lsp.ServerOptions{
			Err:                io.Discard,
			Cwd:                "/home/project",
			FS:                 fs,
			DefaultLibraryPath: bundled.LibPath(),
		}, onServerRequest)
		t.Cleanup(func() { assert.NilError(t, closeClient()) })

		var mu sync.Mutex
		var published []*lsproto.PublishDiagnosticsParams
		client.OnServerNotification = func(_ context.Context, req *lsproto.RequestMessage) {
			if req.Method == lsproto.MethodTextDocumentPublishDiagnostics {
				if params, err := lsproto.UnmarshalParams[*lsproto.PublishDiagnosticsParams](req); err == nil && params.Uri == uri {
					mu.Lock()
					published = append(published, params)
					mu.Unlock()
				}
			}
		}

		var initOptionsOrNull *lsproto.InitializationOptionsOrNull
		if initializationOptions != nil {
			initOptionsOrNull = &lsproto.InitializationOptionsOrNull{InitializationOptions: initializationOptions}
		}
		initMsg, _, ok := lsptestutil.SendRequest(t, client, lsproto.InitializeInfo, &lsproto.InitializeParams{
			Capabilities:          caps,
			InitializationOptions: initOptionsOrNull,
		})
		assert.Assert(t, ok && initMsg.AsResponse().Error == nil, "initialize failed")
		lsptestutil.SendNotification(t, client, lsproto.InitializedInfo, &lsproto.InitializedParams{})
		<-client.Server.InitComplete()

		lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
			TextDocument: &lsproto.TextDocumentItem{Uri: uri, LanguageId: "typescript", Version: 1, Text: fileContent},
		})

		// A request round trip ensures the didOpen has been processed.
		msg, _, ok := lsptestutil.SendRequest(t, client, lsproto.CustomProjectInfoInfo, &lsproto.ProjectInfoParams{
			TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
		})
		assert.Assert(t, ok && msg.AsResponse().Error == nil)
		client.Server.Session().WaitForBackgroundTasks()

		// Another round trip drains notifications written by the background tasks,
		// since the client router processes the ordered output stream sequentially.
		msg, _, ok = lsptestutil.SendRequest(t, client, lsproto.CustomProjectInfoInfo, &lsproto.ProjectInfoParams{
			TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
		})
		assert.Assert(t, ok && msg.AsResponse().Error == nil)

		mu.Lock()
		defer mu.Unlock()
		return append([]*lsproto.PublishDiagnosticsParams(nil), published...)
	}

	pushOnlyCaps := &lsproto.ClientCapabilities{
		TextDocument: &lsproto.TextDocumentClientCapabilities{
			PublishDiagnostics: &lsproto.PublishDiagnosticsClientCapabilities{},
		},
	}

	t.Run("push-only client receives file diagnostics", func(t *testing.T) {
		t.Parallel()
		published := run(t, pushOnlyCaps, nil)
		assert.Assert(t, len(published) > 0, "expected publishDiagnostics for the file")
		last := published[len(published)-1]
		assert.Equal(t, len(last.Diagnostics), 1)
	})

	t.Run("pull-capable client receives no file diagnostics pushes", func(t *testing.T) {
		t.Parallel()
		pullCaps := &lsproto.ClientCapabilities{
			TextDocument: &lsproto.TextDocumentClientCapabilities{
				PublishDiagnostics: &lsproto.PublishDiagnosticsClientCapabilities{},
				Diagnostic:         &lsproto.DiagnosticClientCapabilities{},
			},
		}
		published := run(t, pullCaps, nil)
		assert.Equal(t, len(published), 0)
	})

	t.Run("disablePushDiagnostics disables file diagnostics pushes", func(t *testing.T) {
		t.Parallel()
		published := run(t, pushOnlyCaps, &lsproto.InitializationOptions{
			DisablePushDiagnostics: new(true),
		})
		assert.Equal(t, len(published), 0)
	})
}

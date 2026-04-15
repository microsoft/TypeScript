package lsp_test

import (
	"context"
	"io"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/lsptestutil"
	"github.com/microsoft/typescript-go/internal/vfs/iovfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func initMutableLSPClient(t *testing.T, files map[string]string, prefs *lsutil.UserPreferences) (*lsptestutil.LSPClient, *vfstest.MapFS) {
	t.Helper()

	base := vfstest.FromMap(files, false)
	baseFS := base.(iovfs.FsWithSys).FSys().(*vfstest.MapFS)
	fs := bundled.WrapFS(base)

	onServerRequest := func(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
		switch req.Method {
		case lsproto.MethodWorkspaceConfiguration:
			return &lsproto.ResponseMessage{
				ID:      req.ID,
				JSONRPC: req.JSONRPC,
				Result:  []any{prefs},
			}
		case lsproto.MethodClientRegisterCapability, lsproto.MethodClientUnregisterCapability:
			return &lsproto.ResponseMessage{
				ID:      req.ID,
				JSONRPC: req.JSONRPC,
				Result:  lsproto.Null{},
			}
		default:
			return nil
		}
	}

	client, closeClient := lsptestutil.NewLSPClient(t, lsp.ServerOptions{
		Err:                io.Discard,
		Cwd:                "/root",
		FS:                 fs,
		DefaultLibraryPath: bundled.LibPath(),
	}, onServerRequest)
	t.Cleanup(func() { _ = closeClient() })

	initMsg, _, ok := lsptestutil.SendRequest(t, client, lsproto.InitializeInfo, &lsproto.InitializeParams{
		Capabilities: &lsproto.ClientCapabilities{},
	})
	assert.Assert(t, ok && initMsg.AsResponse().Error == nil, "Initialize failed")
	lsptestutil.SendNotification(t, client, lsproto.InitializedInfo, &lsproto.InitializedParams{})
	<-client.Server.InitComplete()

	lsptestutil.SendNotification(t, client, lsproto.WorkspaceDidChangeConfigurationInfo, &lsproto.DidChangeConfigurationParams{
		Settings: map[string]any{"typescript": prefs},
	})

	return client, baseFS
}

func TestReferencesAfterAncestorProjectConfigDeletion1(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	client, fs := initMutableLSPClient(t, map[string]string{
		"/root/tsconfig.json": `{
			"files": [],
			"references": [{ "path": "./project" }]
		}`,
		"/root/project/tsconfig.json": `{
			"compilerOptions": { "composite": true },
			"include": ["src/**/*.ts"]
		}`,
		"/root/project/src/main.ts": "export function helloWorld() {}\nhelloWorld()\n",
	}, &lsutil.UserPreferences{})

	mainURI := lsconv.FileNameToDocumentURI("/root/project/src/main.ts")
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: mainURI, LanguageId: "typescript", Text: "export function helloWorld() {}\nhelloWorld()\n"},
	})

	// Prime the child project so opening a file creates the ancestor configured-project placeholder.
	msg, _, ok := lsptestutil.SendRequest(t, client, lsproto.TextDocumentDocumentSymbolInfo, &lsproto.DocumentSymbolParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: mainURI},
	})
	assert.Assert(t, ok, "expected response")
	assert.Assert(t, msg.AsResponse().Error == nil)

	assert.NilError(t, fs.Remove("root/tsconfig.json"))
	lsptestutil.SendNotification(t, client, lsproto.WorkspaceDidChangeWatchedFilesInfo, &lsproto.DidChangeWatchedFilesParams{
		Changes: []*lsproto.FileEvent{{
			Uri:  lsconv.FileNameToDocumentURI("/root/tsconfig.json"),
			Type: lsproto.FileChangeTypeDeleted,
		}},
	})

	msg, resp, ok := lsptestutil.SendRequest(t, client, lsproto.TextDocumentReferencesInfo, &lsproto.ReferenceParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: mainURI},
		Position:     lsproto.Position{Line: 1, Character: 3},
		Context:      &lsproto.ReferenceContext{IncludeDeclaration: true},
	})
	assert.Assert(t, ok, "expected response")
	assert.Assert(t, msg.AsResponse().Error == nil)
	assert.Assert(t, resp.Locations != nil)
	assert.Equal(t, len(*resp.Locations), 2)
	assert.DeepEqual(t, []lsproto.Location{
		{
			Uri: mainURI,
			Range: lsproto.Range{
				Start: lsproto.Position{Line: 0, Character: 16},
				End:   lsproto.Position{Line: 0, Character: 26},
			},
		},
		{
			Uri: mainURI,
			Range: lsproto.Range{
				Start: lsproto.Position{Line: 1, Character: 0},
				End:   lsproto.Position{Line: 1, Character: 10},
			},
		},
	}, *resp.Locations)
}

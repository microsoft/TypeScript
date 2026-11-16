package lsp_test

import (
	"context"
	"io"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/lsp"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/lsptestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

// TestDocumentHighlightUnescapedAtSign reproduces #64758: clients are not
// required to percent-encode every character the server encodes, and Neovim
// sends an unescaped @. The server used to filter highlights with a raw URI
// string comparison, which dropped every result for such paths.
func TestDocumentHighlightUnescapedAtSign(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const file = "/home/projects/a@b/x.ts"
	files := map[string]string{
		"/home/projects/tsconfig.json": `{}`,
		file:                           "const foo = 1;\nconsole.log(foo);\nconsole.log(foo);\n",
	}
	fs := bundled.WrapFS(vfstest.FromMap(files, tspath.CaseInsensitive))

	onServerRequest := func(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
		switch req.Method {
		case lsproto.MethodClientRegisterCapability, lsproto.MethodClientUnregisterCapability, lsproto.MethodWindowWorkDoneProgressCreate:
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
		Cwd:                "/home/projects",
		FS:                 fs,
		DefaultLibraryPath: bundled.LibPath(),
	}, onServerRequest)
	t.Cleanup(func() { _ = closeClient() })

	initMsg, _, ok := client.SendRequest(t, lsproto.InitializeInfo, &lsproto.InitializeParams{
		Capabilities: &lsproto.ClientCapabilities{},
	})
	assert.Assert(t, ok && initMsg.AsResponse().Error == nil, "Initialize failed")
	client.SendNotification(t, lsproto.InitializedInfo, &lsproto.InitializedParams{})
	<-client.Server.InitComplete()

	// Deliberately leave @ unescaped.
	uri := lsproto.DocumentUri("file:///home/projects/a@b/x.ts")
	client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{
			Uri:        uri,
			LanguageId: "typescript",
			Text:       files[file],
		},
	})

	msg, highlights, ok := client.SendRequest(t, lsproto.TextDocumentDocumentHighlightInfo, &lsproto.DocumentHighlightParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
		Position:     lsproto.Position{Line: 0, Character: 7},
	})
	assert.Assert(t, ok)
	assert.Assert(t, msg.AsResponse().Error == nil)
	assert.Assert(t, highlights.DocumentHighlights != nil)
	assert.Equal(t, len(*highlights.DocumentHighlights), 3)
}

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

// TestDocumentHighlightUnencodedURI reproduces #64758: a client may send a URI
// with characters such as '@' left unencoded, while the server builds result
// URIs with them percent-encoded. Document highlights for the requested file
// must still be returned.
func TestDocumentHighlightUnencodedURI(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	files := map[string]string{
		"/home/a@b/proj/tsconfig.json": `{}`,
		"/home/a@b/proj/x.ts":          "const foo = 1;\nconsole.log(foo);\nconsole.log(foo);\n",
	}
	fs := bundled.WrapFS(vfstest.FromMap(files, tspath.CaseSensitive))

	onServerRequest := func(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
		if req.Method == lsproto.MethodClientRegisterCapability || req.Method == lsproto.MethodClientUnregisterCapability {
			return &lsproto.ResponseMessage{ID: req.ID, JSONRPC: req.JSONRPC, Result: lsproto.Null{}}
		}
		return nil
	}

	client, closeClient := lsptestutil.NewLSPClient(t, lsp.ServerOptions{
		Err: io.Discard, Cwd: "/home/a@b/proj", FS: fs, DefaultLibraryPath: bundled.LibPath(),
	}, onServerRequest)
	t.Cleanup(func() { _ = closeClient() })

	initMsg, _, ok := client.SendRequest(t, lsproto.InitializeInfo, &lsproto.InitializeParams{
		Capabilities: &lsproto.ClientCapabilities{},
	})
	assert.Assert(t, ok && initMsg.AsResponse().Error == nil, "Initialize failed")
	client.SendNotification(t, lsproto.InitializedInfo, &lsproto.InitializedParams{})
	<-client.Server.InitComplete()

	uri := lsproto.DocumentUri("file:///home/a@b/proj/x.ts")
	client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: uri, LanguageId: "typescript", Text: files["/home/a@b/proj/x.ts"]},
	})

	msg, resp, ok := client.SendRequest(t, lsproto.TextDocumentDocumentHighlightInfo, &lsproto.DocumentHighlightParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
		Position:     lsproto.Position{Line: 0, Character: 7},
	})
	assert.Assert(t, ok && msg.AsResponse().Error == nil, "Document highlight request failed")
	assert.Assert(t, resp.DocumentHighlights != nil)
	assert.Equal(t, len(*resp.DocumentHighlights), 3)
}

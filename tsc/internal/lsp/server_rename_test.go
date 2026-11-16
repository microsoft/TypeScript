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

// TestPrepareRenamePlaceholderForQuotedProperties reproduces #65444: the
// placeholder used the printed declaration name, including quotes and brackets.
func TestPrepareRenamePlaceholderForQuotedProperties(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const text = "const obj = {\n  a: 1,\n  'b': 1,\n  ['c']: 1,\n};\n\nobj.a;\nobj['a'];\nobj.b;\nobj.c;\n"
	files := map[string]string{
		"/home/projects/tsconfig.json": `{}`,
		"/home/projects/repro.ts":      text,
	}
	fs := bundled.WrapFS(vfstest.FromMap(files, tspath.CaseInsensitive))

	onServerRequest := func(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
		if req.Method == lsproto.MethodClientRegisterCapability || req.Method == lsproto.MethodClientUnregisterCapability {
			return &lsproto.ResponseMessage{ID: req.ID, JSONRPC: req.JSONRPC, Result: lsproto.Null{}}
		}
		return nil
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

	uri := lsproto.DocumentUri("file:///home/projects/repro.ts")
	client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: uri, LanguageId: "typescript", Text: text},
	})

	for _, tc := range []struct {
		position    lsproto.Position
		placeholder string
	}{
		{lsproto.Position{Line: 6, Character: 4}, "a"},
		{lsproto.Position{Line: 7, Character: 5}, "a"},
		{lsproto.Position{Line: 8, Character: 4}, "b"},
		{lsproto.Position{Line: 9, Character: 4}, "c"},
	} {
		msg, res, ok := client.SendRequest(t, lsproto.TextDocumentPrepareRenameInfo, &lsproto.PrepareRenameParams{
			TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
			Position:     tc.position,
		})
		assert.Assert(t, ok && msg.AsResponse().Error == nil)
		assert.Assert(t, res.PrepareRenamePlaceholder != nil)
		assert.Equal(t, res.PrepareRenamePlaceholder.Placeholder, tc.placeholder)
	}
}

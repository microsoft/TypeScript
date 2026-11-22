package lsp_test

import (
	"context"
	"io"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/lsp"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/lsptestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestDocumentHighlightsWithEquivalentFileURIs(t *testing.T) {
	t.Parallel()

	for _, test := range []struct {
		name            string
		root            tspath.RootedDirectoryPath
		uri             lsproto.DocumentUri
		caseSensitivity tspath.CaseSensitivity
	}{
		{"Windows drive", "c:/Project", "file:///C:/Project/main.ts", tspath.CaseInsensitive},
		{"escaped filename", "/Project", "file:///Project/%6Dain.ts", tspath.CaseSensitive},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()

			const contents = "import { greet } from './library';\ngreet('Ada');\ngreet('Lin');\n"
			root := test.root.AsString()
			fs := vfstest.FromMap(map[string]string{
				root + "/tsconfig.json": `{"compilerOptions":{"noLib":true}}`,
				root + "/library.ts":    "export function greet(name: string) { return name; }",
				root + "/main.ts":       contents,
			}, test.caseSensitivity)
			client, closeClient := lsptestutil.NewLSPClient(t, lsp.ServerOptions{
				Err: io.Discard,
				Cwd: test.root,
				FS:  fs,
			}, func(_ context.Context, request *lsproto.RequestMessage) *lsproto.ResponseMessage {
				switch request.Method {
				case lsproto.MethodClientRegisterCapability, lsproto.MethodClientUnregisterCapability:
					return &lsproto.ResponseMessage{ID: request.ID, JSONRPC: request.JSONRPC, Result: lsproto.Null{}}
				default:
					return nil
				}
			})
			t.Cleanup(func() { _ = closeClient() })

			init, _, ok := client.SendRequest(t, lsproto.InitializeInfo, &lsproto.InitializeParams{
				Capabilities: &lsproto.ClientCapabilities{},
			})
			assert.Assert(t, ok && init.AsResponse().Error == nil, "Initialize failed")
			client.SendNotification(t, lsproto.InitializedInfo, &lsproto.InitializedParams{})
			<-client.Server.InitComplete()

			client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
				TextDocument: &lsproto.TextDocumentItem{Uri: test.uri, LanguageId: "typescript", Text: contents},
			})
			message, result, ok := client.SendRequest(t, lsproto.TextDocumentDocumentHighlightInfo, &lsproto.DocumentHighlightParams{
				TextDocument: lsproto.TextDocumentIdentifier{Uri: test.uri},
				Position:     lsproto.Position{Line: 1, Character: 2},
			})
			assert.Assert(t, ok && message.AsResponse().Error == nil, "Document highlight request failed")
			assert.Assert(t, result.DocumentHighlights != nil)

			ranges := make([]lsproto.Range, 0, len(*result.DocumentHighlights))
			for _, highlight := range *result.DocumentHighlights {
				ranges = append(ranges, highlight.Range)
			}
			assert.DeepEqual(t, ranges, []lsproto.Range{
				{Start: lsproto.Position{Line: 0, Character: 9}, End: lsproto.Position{Line: 0, Character: 14}},
				{Start: lsproto.Position{Line: 1, Character: 0}, End: lsproto.Position{Line: 1, Character: 5}},
				{Start: lsproto.Position{Line: 2, Character: 0}, End: lsproto.Position{Line: 2, Character: 5}},
			})
		})
	}
}

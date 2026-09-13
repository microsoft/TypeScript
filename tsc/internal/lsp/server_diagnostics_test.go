package lsp_test

import (
	"context"
	"io"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/lsp"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/lsptestutil"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestDiagnosticsForFirstOpenedFile(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const broken = `import { greet } from "./helper";
export const message = greet("world");
const bad: string = 123;`
	fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
		"/home/project/tsconfig.json": `{"compilerOptions":{"target":"es2020","module":"esnext","moduleResolution":"bundler","strict":true,"noEmit":true},"include":["*.ts"]}`,
		"/home/project/helper.ts":     "export function greet(name: string): string { return `Hello, ${name}`; }",
		"/home/project/broken.ts":     broken,
	}, false))
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
	client, closeClient := lsptestutil.NewLSPClient(t, lsp.ServerOptions{
		Err:                io.Discard,
		Cwd:                "/home/project",
		FS:                 fs,
		DefaultLibraryPath: bundled.LibPath(),
	}, onServerRequest)
	t.Cleanup(func() { _ = closeClient() })

	initMsg, _, ok := lsptestutil.SendRequest(t, client, lsproto.InitializeInfo, &lsproto.InitializeParams{
		Capabilities: &lsproto.ClientCapabilities{
			TextDocument: &lsproto.TextDocumentClientCapabilities{
				Diagnostic: &lsproto.DiagnosticClientCapabilities{},
			},
		},
	})
	assert.Assert(t, ok && initMsg.AsResponse().Error == nil, "initialize failed")
	lsptestutil.SendNotification(t, client, lsproto.InitializedInfo, &lsproto.InitializedParams{})
	<-client.Server.InitComplete()

	uri := lsproto.DocumentUri("file:///home/project/broken.ts")
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: uri, LanguageId: "typescript", Version: 1, Text: broken},
	})
	diagnosticMsg, diagnostics, ok := lsptestutil.SendRequest(t, client, lsproto.TextDocumentDiagnosticInfo, &lsproto.DocumentDiagnosticParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
	})
	assert.Assert(t, ok && diagnosticMsg.AsResponse().Error == nil)
	assert.Assert(t, diagnostics.FullDocumentDiagnosticReport != nil)
	for _, diagnostic := range diagnostics.FullDocumentDiagnosticReport.Items {
		if diagnostic.Code != nil && diagnostic.Code.Integer != nil && *diagnostic.Code.Integer == 2322 {
			return
		}
	}
	t.Fatalf("diagnostics did not contain TS2322: %v", diagnostics.FullDocumentDiagnosticReport.Items)
}

package lsp_test

import (
	"context"
	"fmt"
	"io"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/lsp"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/lsptestutil"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

// With flaky diagnostic tracking on, a diagnostics request also emits the whole
// project, with one worker per file, and those workers used to share one checker.
// With noEmitOnError, emit first checks every file in parallel too, and sharing the
// checker during those checks reliably crashed the server.
func TestFlakyDiagnosticTrackingWithNoEmitOnError(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	// Enough files with enough to check that the parallel checks overlap.
	files := map[string]string{
		"/home/projects/tsconfig.json": `{ "compilerOptions": { "strict": true, "noEmitOnError": true, "declaration": true, "outDir": "out" } }`,
	}
	for i := range 12 {
		var b strings.Builder
		if i > 0 {
			fmt.Fprintf(&b, "import { box0 } from \"./file%d\";\nexport const imported = box0.map(x => x);\n", i-1)
		}
		for j := range 20 {
			fmt.Fprintf(&b, `
export interface Box%[1]d<T> { value: T; map<U>(f: (x: T) => U): Box%[1]d<U> }
export declare const box%[1]d: Box%[1]d<string>;
export const mapped%[1]d = box%[1]d.map(s => s.length).map(n => ({ n, even: n %% 2 === 0 }));
`, j)
		}
		files[fmt.Sprintf("/home/projects/file%d.ts", i)] = b.String()
	}

	onServerRequest := func(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
		switch req.Method {
		case lsproto.MethodClientRegisterCapability, lsproto.MethodClientUnregisterCapability, lsproto.MethodWindowWorkDoneProgressCreate:
			return &lsproto.ResponseMessage{ID: req.ID, JSONRPC: req.JSONRPC, Result: lsproto.Null{}}
		default:
			return nil
		}
	}
	client, closeClient := lsptestutil.NewLSPClient(t, lsp.ServerOptions{
		Err:                io.Discard,
		Cwd:                "/home/projects",
		FS:                 bundled.WrapFS(vfstest.FromMap(files, false)),
		DefaultLibraryPath: bundled.LibPath(),
	}, onServerRequest)
	t.Cleanup(func() { _ = closeClient() })

	initMsg, _, ok := client.SendRequest(t, lsproto.InitializeInfo, &lsproto.InitializeParams{
		Capabilities: &lsproto.ClientCapabilities{},
		InitializationOptions: &lsproto.InitializationOptionsOrNull{
			InitializationOptions: &lsproto.InitializationOptions{TrackFlakyDiagnostics: new(lsproto.DiagnosticFlakeLogLevelPanic)},
		},
	})
	assert.Assert(t, ok && initMsg.AsResponse().Error == nil, "Initialize failed")
	client.SendNotification(t, lsproto.InitializedInfo, &lsproto.InitializedParams{})
	<-client.Server.InitComplete()

	uri := lsproto.DocumentUri("file:///home/projects/file0.ts")
	client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: uri, LanguageId: lsproto.LanguageKindTypeScript, Text: files["/home/projects/file0.ts"]},
	})

	diagnosticMsg, diagnostics, ok := client.SendRequest(t, lsproto.TextDocumentDiagnosticInfo, &lsproto.DocumentDiagnosticParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
	})
	assert.Assert(t, ok && diagnosticMsg.AsResponse().Error == nil, "diagnostics request failed")
	assert.Assert(t, diagnostics.FullDocumentDiagnosticReport != nil)
	assert.Equal(t, len(diagnostics.FullDocumentDiagnosticReport.Items), 0)
}

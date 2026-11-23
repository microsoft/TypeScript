package lsp_test

import (
	"context"
	"fmt"
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

func TestFlakyDiagnosticTrackingParallelEmit(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	for _, noEmitOnError := range []bool{false, true} {
		t.Run(fmt.Sprintf("noEmitOnError=%t", noEmitOnError), func(t *testing.T) {
			t.Parallel()
			files := map[string]string{
				"/src/tsconfig.json": fmt.Sprintf(`{
					"compilerOptions": { "strict": true, "declaration": true, "noEmitOnError": %t, "outDir": "out" }
				}`, noEmitOnError),
				"/src/a.ts": `export function box<T>(value: T) { return { value }; }`,
				"/src/b.ts": `import { box } from "./a"; export const b = box("b");`,
				"/src/c.ts": `import { box } from "./a"; export const c = box(1);`,
			}
			fs := bundled.WrapFS(vfstest.FromMap(files, tspath.CaseInsensitive))
			assert.Equal(t, fs.CaseSensitivity(), tspath.CaseInsensitive)
			client, closeClient := lsptestutil.NewLSPClient(t, lsp.ServerOptions{
				Err:                io.Discard,
				Cwd:                "/src",
				FS:                 fs,
				DefaultLibraryPath: bundled.LibPath(),
			}, func(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
				switch req.Method {
				case lsproto.MethodClientRegisterCapability, lsproto.MethodClientUnregisterCapability, lsproto.MethodWindowWorkDoneProgressCreate:
					return &lsproto.ResponseMessage{ID: req.ID, JSONRPC: req.JSONRPC, Result: lsproto.Null{}}
				default:
					return nil
				}
			})
			t.Cleanup(func() { _ = closeClient() })

			msg, _, ok := client.SendRequest(t, lsproto.InitializeInfo, &lsproto.InitializeParams{
				Capabilities: &lsproto.ClientCapabilities{},
				InitializationOptions: &lsproto.InitializationOptionsOrNull{
					InitializationOptions: &lsproto.InitializationOptions{TrackFlakyDiagnostics: new(lsproto.DiagnosticFlakeLogLevelPanic)},
				},
			})
			assert.Assert(t, ok && msg.AsResponse().Error == nil, "initialize failed")
			client.SendNotification(t, lsproto.InitializedInfo, &lsproto.InitializedParams{})
			<-client.Server.InitComplete()

			uri := lsproto.DocumentUri("file:///src/a.ts")
			client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
				TextDocument: &lsproto.TextDocumentItem{Uri: uri, LanguageId: lsproto.LanguageKindTypeScript, Text: files["/src/a.ts"]},
			})
			msg, diagnostics, ok := client.SendRequest(t, lsproto.TextDocumentDiagnosticInfo, &lsproto.DocumentDiagnosticParams{
				TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
			})
			assert.Assert(t, ok && msg.AsResponse().Error == nil, "diagnostics request failed")
			assert.Assert(t, diagnostics.FullDocumentDiagnosticReport != nil)
			assert.Equal(t, len(diagnostics.FullDocumentDiagnosticReport.Items), 0)
		})
	}
}

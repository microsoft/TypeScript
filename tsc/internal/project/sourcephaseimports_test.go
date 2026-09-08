package project_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func TestSourcePhaseImportFileChanges(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	for _, source := range []string{
		`import source a from "./a.wasm"; a;`,
		`import.source("./a.wasm");`,
	} {
		t.Run(source, func(t *testing.T) {
			t.Parallel()
			const fileName = "/src/index.ts"
			const uri = lsproto.DocumentUri("file:///src/index.ts")
			const wasmFileName = "/src/a.wasm"
			const wasmURI = lsproto.DocumentUri("file:///src/a.wasm")
			const wasm = "\x00asm\x01\x00\x00\x00"
			files := map[string]any{
				"/tsconfig.json": `{"compilerOptions":{"module":"esnext","target":"esnext","types":[]},"files":["src/index.ts"]}`,
				fileName:         source,
				wasmFileName:     wasm,
			}
			session, utils := projecttestutil.Setup(files)
			defer session.Close()
			session.DidOpenFile(t.Context(), uri, 1, source, lsproto.LanguageKindTypeScript)

			check := func(missing bool) {
				t.Helper()
				ls, err := session.GetLanguageService(t.Context(), uri)
				assert.NilError(t, err)
				program := ls.GetProgram()
				assert.Assert(t, program.GetSourceFile(wasmFileName) == nil)
				errors := program.GetSemanticDiagnostics(projecttestutil.WithRequestID(t.Context()), program.GetSourceFile(fileName))
				if missing {
					assert.Equal(t, len(errors), 1)
					assert.Equal(t, errors[0].Code(), diagnostics.Cannot_find_module_0_or_its_corresponding_type_declarations.Code())
				} else {
					assert.Equal(t, len(errors), 0)
				}
			}

			check(false)
			assert.NilError(t, utils.FS().Remove(wasmFileName))
			session.DidChangeWatchedFiles(t.Context(), []*lsproto.FileEvent{{Uri: wasmURI, Type: lsproto.FileChangeTypeDeleted}})
			check(true)
			assert.NilError(t, utils.FS().WriteFile(wasmFileName, wasm))
			session.DidChangeWatchedFiles(t.Context(), []*lsproto.FileEvent{{Uri: wasmURI, Type: lsproto.FileChangeTypeCreated}})
			check(false)
		})
	}
}

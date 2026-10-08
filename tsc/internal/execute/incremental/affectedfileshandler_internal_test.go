package incremental

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func buildTestProgram(t *testing.T, fs vfs.FS) *Program {
	t.Helper()
	host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
	config, diagnostics := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, fs, nil)
	assert.Equal(t, len(diagnostics), 0)
	old := ReadBuildInfoProgram(config, NewBuildInfoReader(host), host)
	return NewProgram(compiler.NewProgram(compiler.ProgramOptions{Config: config, Host: host}), old, CreateHost(host), nil, false)
}

func buildAndEmitTestProgram(t *testing.T, fs vfs.FS) {
	t.Helper()
	program := buildTestProgram(t, fs)
	assert.Equal(t, len(program.GetSemanticDiagnostics(t.Context(), nil)), 0)
	assert.Equal(t, len(program.Emit(t.Context(), compiler.EmitOptions{}).Diagnostics), 0)
}

func TestUpdateShapeSignatureCachedResult(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}
	fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
		"/tsconfig.json": `{"compilerOptions":{"strict":true,"noEmit":true,"incremental":true,"skipLibCheck":true}}`,
		"/a.ts":          `export const a = 1;`,
		"/b.ts":          `import { a } from "./a"; export const b = a; declare global { interface Window { fromB: string; } }`,
		"/c.ts":          `export const c = window.fromB;`,
		"/d.ts":          `import { b } from "./b"; export const d = 2;`,
	}, tspath.CaseSensitive))
	buildAndEmitTestProgram(t, fs)
	// A rebuild replaces the version-based signatures of a, b and d with computed ones.
	assert.NilError(t, fs.AppendFile("/a.ts", "\n// edit\n"))
	buildAndEmitTestProgram(t, fs)

	assert.NilError(t, fs.WriteFile("/a.ts", `export const a = "changed";`))
	assert.NilError(t, fs.AppendFile("/b.ts", "\n// edit\n"))
	program := buildTestProgram(t, fs)
	h := affectedFilesHandler{ctx: t.Context(), program: program}
	b := program.program.GetSourceFile("/b.ts")
	c := program.program.GetSourceFile("/c.ts")
	d := program.program.GetSourceFile("/d.ts")

	assert.Assert(t, h.updateShapeSignature(b, false))
	assert.Assert(t, h.updateShapeSignature(b, false), "cached result must still report the changed signature")
	assert.Assert(t, !h.updateShapeSignature(d, false))
	assert.Assert(t, !h.updateShapeSignature(d, false))

	wg := core.NewWorkGroup(1)
	var result collections.SyncSet[*ast.SourceFile]
	wg.Queue(func() { h.collectFilesAffectedBy(b.PathKey(), wg, &result) })
	wg.RunAndWait()
	assert.Assert(t, h.hasAllFilesExcludingDefaultLibraryFile.Load(), "global-scope invalidation must not depend on which traversal computed the signature")
	assert.Assert(t, result.Has(c))
}

func TestCollectFilesAffectedByChangedDefaultLibrary(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}
	const libPath = "/node_modules/@typescript/lib-dom/index.d.ts"
	fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
		"/tsconfig.json": `{"compilerOptions":{"strict":true,"noEmit":true,"incremental":true,"lib":["es5","dom"],"libReplacement":true}}`,
		libPath:          `interface DOMInterface { value: string; }`,
		"/a.ts":          `export const a = 1;`,
	}, tspath.CaseSensitive))
	buildAndEmitTestProgram(t, fs)

	assert.NilError(t, fs.WriteFile(libPath, `interface DOMInterface { value: number; }`))
	program := buildTestProgram(t, fs)
	h := affectedFilesHandler{ctx: t.Context(), program: program}
	lib := program.program.GetSourceFile(libPath)
	assert.Assert(t, program.program.IsSourceFileDefaultLibrary(lib.PathKey()))

	wg := core.NewWorkGroup(1)
	var result collections.SyncSet[*ast.SourceFile]
	wg.Queue(func() { h.collectFilesAffectedBy(lib.PathKey(), wg, &result) })
	wg.RunAndWait()
	assert.Assert(t, h.hasAllFilesExcludingDefaultLibraryFile.Load())
	assert.Assert(t, result.Has(program.program.GetSourceFile("/a.ts")))
	assert.Assert(t, !result.Has(lib))
}

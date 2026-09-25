package module_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestStaticResolver(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]string{
		"/repo/node_modules/fallback/package.json": `{"name":"fallback","types":"index.d.ts"}`,
		"/repo/node_modules/fallback/index.d.ts":   "export {};",
	}, true)
	fallback := module.NewResolver(module.ResolverOptions{
		Host: &resolutionHostStub{fs: fs, cwd: "/repo"},
		CompilerOptions: &core.CompilerOptions{
			Module:           core.ModuleKindESNext,
			ModuleResolution: core.ModuleResolutionKindBundler,
		},
	})
	esm := core.ResolutionModeESM
	resolutions, err := module.NewStaticResolutions(
		[]module.StaticResolutionEntry{
			{ModuleName: "provided", Result: &module.ResolvedModule{ResolvedFileName: "/global.d.ts"}},
			{ModuleName: "provided", ContainingDirectory: "/repo/src", Result: &module.ResolvedModule{ResolvedFileName: "/directory.d.ts"}},
			{ModuleName: "provided", ResolutionMode: &esm, Result: &module.ResolvedModule{ResolvedFileName: "/esm.d.ts"}},
			{ModuleName: "provided", ContainingDirectory: "/repo/src", ResolutionMode: &esm, Result: &module.ResolvedModule{ResolvedFileName: "/directory-esm.d.ts"}},
			{ModuleName: "unresolved"},
		},
		true,
		"/repo",
		true,
	)
	assert.NilError(t, err)
	resolver := module.NewStaticResolver(fallback, resolutions)

	tests := []struct {
		name             string
		containingFile   string
		mode             core.ResolutionMode
		resolvedFileName string
	}{
		{name: "provided", containingFile: "/repo/src/index.ts", mode: core.ResolutionModeESM, resolvedFileName: "/directory-esm.d.ts"},
		{name: "provided", containingFile: "/repo/src/index.ts", mode: core.ResolutionModeCommonJS, resolvedFileName: "/directory.d.ts"},
		{name: "provided", containingFile: "/repo/other/index.ts", mode: core.ResolutionModeESM, resolvedFileName: "/esm.d.ts"},
		{name: "provided", containingFile: "/repo/other/index.ts", mode: core.ResolutionModeCommonJS, resolvedFileName: "/global.d.ts"},
		{name: "fallback", containingFile: "/repo/src/index.ts", mode: core.ResolutionModeESM, resolvedFileName: "/repo/node_modules/fallback/index.d.ts"},
		{name: "unresolved", containingFile: "/repo/src/index.ts", mode: core.ResolutionModeESM},
	}
	for _, test := range tests {
		result, _, err := resolver.ResolveModuleName(test.name, test.containingFile, test.mode, nil)
		assert.NilError(t, err)
		if test.resolvedFileName == "" {
			assert.Assert(t, result == nil)
		} else {
			assert.Equal(t, result.ResolvedFileName, test.resolvedFileName)
		}
	}
}

func TestStaticResolverPreservesImportPhaseOnFallback(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]string{
		"/repo/src/a.d.wasm.ts": "export declare const value: number;",
		"/repo/src/a.wasm":      "\x00asm\x01\x00\x00\x00",
	}, true)
	fallback := module.NewResolver(module.ResolverOptions{
		Host: &resolutionHostStub{fs: fs, cwd: "/repo"},
		CompilerOptions: &core.CompilerOptions{
			Module:           core.ModuleKindESNext,
			ModuleResolution: core.ModuleResolutionKindBundler,
		},
	})
	resolutions, err := module.NewStaticResolutions(nil, true, "/repo", true)
	assert.NilError(t, err)
	resolver := module.NewStaticResolver(fallback, resolutions)

	evaluation, _, err := resolver.ResolveModuleName("./a.wasm", "/repo/src/index.ts", core.ResolutionModeESM, nil)
	assert.NilError(t, err)
	assertResolvedFileName(t, evaluation, "/repo/src/a.d.wasm.ts")

	source, _, err := resolver.ResolveModuleNameWithPhase("./a.wasm", "/repo/src/index.ts", core.ResolutionModeESM, module.ImportPhaseSource, nil)
	assert.NilError(t, err)
	assertResolvedFileName(t, source, "/repo/src/a.wasm")

	for _, phase := range []module.ImportPhase{module.ImportPhaseSource, module.ImportPhaseEvaluation} {
		result, _, err := resolver.ResolveModuleNameFromDirectory("./a.wasm", "/repo/src", core.ResolutionModeESM, phase)
		assert.NilError(t, err)
		if phase == module.ImportPhaseSource {
			assertResolvedFileName(t, result, "/repo/src/a.wasm")
		} else {
			assertResolvedFileName(t, result, "/repo/src/a.d.wasm.ts")
		}
	}
}

func TestStaticResolverImportPhases(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]string{}, true)
	fallback := module.NewResolver(module.ResolverOptions{
		Host:            &resolutionHostStub{fs: fs, cwd: "/repo"},
		CompilerOptions: core.EmptyCompilerOptions,
	})
	esm := core.ResolutionModeESM
	source := module.ImportPhaseSource
	evaluation := module.ImportPhaseEvaluation
	entries := []module.StaticResolutionEntry{
		{ModuleName: "pkg", Result: &module.ResolvedModule{ResolvedFileName: "/global.d.ts"}},
		{ModuleName: "pkg", ImportPhase: &source, Result: &module.ResolvedModule{ResolvedFileName: "/global.wasm"}},
		{ModuleName: "pkg", ResolutionMode: &esm, Result: &module.ResolvedModule{ResolvedFileName: "/esm.d.ts"}},
		{ModuleName: "pkg", ResolutionMode: &esm, ImportPhase: &source, Result: &module.ResolvedModule{ResolvedFileName: "/esm.wasm"}},
		{ModuleName: "pkg", ContainingDirectory: "/repo/src", Result: &module.ResolvedModule{ResolvedFileName: "/directory.d.ts"}},
		{ModuleName: "pkg", ContainingDirectory: "/repo/src", ImportPhase: &source, Result: &module.ResolvedModule{ResolvedFileName: "/directory.wasm"}},
		{ModuleName: "pkg", ContainingDirectory: "/repo/src", ResolutionMode: &esm, Result: &module.ResolvedModule{ResolvedFileName: "/directory-esm.d.ts"}},
		{ModuleName: "pkg", ContainingDirectory: "/repo/src", ResolutionMode: &esm, ImportPhase: &source, Result: &module.ResolvedModule{ResolvedFileName: "/directory-esm.wasm"}},
		{ModuleName: "explicit", Result: &module.ResolvedModule{ResolvedFileName: "/default.d.ts"}},
		{ModuleName: "explicit", ImportPhase: &evaluation, Result: &module.ResolvedModule{ResolvedFileName: "/evaluation.d.ts"}},
		{ModuleName: "explicit", ImportPhase: &source},
		{ModuleName: "source", ImportPhase: &source, Result: &module.ResolvedModule{ResolvedFileName: "/source.wasm"}},
		{ModuleName: "scoped", ImportPhase: &source, Result: &module.ResolvedModule{ResolvedFileName: "/global.wasm"}},
		{ModuleName: "scoped", ContainingDirectory: "/repo/src", Result: &module.ResolvedModule{ResolvedFileName: "/directory.wasm"}},
	}
	resolutions, err := module.NewStaticResolutions(entries, false, "/repo", true)
	assert.NilError(t, err)
	resolver := module.NewStaticResolver(fallback, resolutions)
	for _, test := range []struct {
		name      string
		directory string
		mode      core.ResolutionMode
		phase     module.ImportPhase
		fileName  string
	}{
		{"pkg", "/repo/src", esm, evaluation, "/directory-esm.d.ts"},
		{"pkg", "/repo/src", esm, source, "/directory-esm.wasm"},
		{"pkg", "/repo/src", core.ResolutionModeCommonJS, evaluation, "/directory.d.ts"},
		{"pkg", "/repo/src", core.ResolutionModeCommonJS, source, "/directory.wasm"},
		{"pkg", "/repo/other", esm, evaluation, "/esm.d.ts"},
		{"pkg", "/repo/other", esm, source, "/esm.wasm"},
		{"pkg", "/repo/other", core.ResolutionModeCommonJS, evaluation, "/global.d.ts"},
		{"pkg", "/repo/other", core.ResolutionModeCommonJS, source, "/global.wasm"},
		{"explicit", "/repo/src", esm, evaluation, "/evaluation.d.ts"},
		{"explicit", "/repo/src", esm, source, ""},
		{"source", "/repo/src", esm, evaluation, ""},
		{"source", "/repo/src", esm, source, "/source.wasm"},
		{"scoped", "/repo/src", esm, source, "/directory.wasm"},
	} {
		result, _, err := resolver.ResolveModuleNameWithPhase(test.name, test.directory+"/index.ts", test.mode, test.phase, nil)
		assert.NilError(t, err)
		if test.fileName == "" {
			assert.Assert(t, result == nil)
		} else {
			assertResolvedFileName(t, result, test.fileName)
		}
		fromDirectory, _, err := resolver.ResolveModuleNameFromDirectory(test.name, test.directory, test.mode, test.phase)
		assert.NilError(t, err)
		assert.Assert(t, fromDirectory == result)
	}
	for _, phase := range []*module.ImportPhase{nil, &evaluation, &source} {
		_, err := module.NewStaticResolutions([]module.StaticResolutionEntry{
			{ModuleName: "pkg", ImportPhase: phase},
			{ModuleName: "pkg", ImportPhase: phase},
		}, false, "/repo", true)
		assert.ErrorContains(t, err, "duplicate static module resolution")
	}
}

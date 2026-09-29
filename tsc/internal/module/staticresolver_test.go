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

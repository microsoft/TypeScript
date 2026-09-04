package contentmapper_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestParseResultSupplementalFileExtensions(t *testing.T) {
	t.Parallel()
	mappings := spanmap.New(nil)
	result := contentmapper.Result{
		VirtualExtension: ".ts",
		Mappings:         mappings,
		Supplemental: []contentmapper.MappedResult{
			{VirtualExtension: ".js", Mappings: mappings},
			{VirtualExtension: ".jsx", Mappings: mappings},
			{VirtualExtension: ".ts", Mappings: mappings},
			{VirtualExtension: ".tsx", Mappings: mappings},
			{VirtualExtension: ".mts", Mappings: mappings},
			{VirtualExtension: ".cts", Mappings: mappings},
			{VirtualExtension: ".json", Mappings: mappings},
		},
	}
	files, err := contentmapper.ParseResult(
		ast.SourceFileParseOptions{FileName: "/component.astro", PathKey: "/component.astro"},
		"",
		&contentmapper.Mapper{Definition: contentmapper.Definition{Extensions: []string{".astro"}}, Manifest: contentmapper.Manifest{Name: "mapper"}},
		"transform-identity",
		result,
	)
	assert.NilError(t, err)
	assert.Equal(t, files.Canonical.ContentMapperTransformIdentity(), "transform-identity")
	canonicalSupplementals := files.Canonical.SupplementalSourceFiles()
	assert.Equal(t, len(canonicalSupplementals), len(files.Supplemental))

	expected := []struct {
		fileName   string
		scriptKind core.ScriptKind
	}{
		{"/component.astro.0.js", core.ScriptKindJS},
		{"/component.astro.1.jsx", core.ScriptKindJSX},
		{"/component.astro.2.ts", core.ScriptKindTS},
		{"/component.astro.3.tsx", core.ScriptKindTSX},
		{"/component.astro.4.mts", core.ScriptKindTS},
		{"/component.astro.5.cts", core.ScriptKindTS},
		{"/component.astro.6.json", core.ScriptKindJSON},
	}
	assert.Equal(t, len(files.Supplemental), len(expected))
	for i, expected := range expected {
		assert.Equal(t, files.Supplemental[i].FileName().AsString(), expected.fileName)
		assert.Equal(t, files.Supplemental[i].PathKey(), tspath.PathKeyFromCanonical(expected.fileName))
		assert.Equal(t, files.Supplemental[i].ScriptKind, expected.scriptKind)
		assert.Equal(t, files.Supplemental[i].ContentMapperTransformIdentity(), "transform-identity")
		assert.Assert(t, canonicalSupplementals[i] == files.Supplemental[i])
		assert.Assert(t, files.Supplemental[i].CanonicalSourceFile() == files.Canonical)
	}
}

func TestParseResultAllowsSupplementalModules(t *testing.T) {
	t.Parallel()
	mappings := spanmap.New(nil)
	files, err := contentmapper.ParseResult(
		ast.SourceFileParseOptions{FileName: "/component.astro", PathKey: "/component.astro"},
		"",
		&contentmapper.Mapper{Definition: contentmapper.Definition{Extensions: []string{".astro"}}, Manifest: contentmapper.Manifest{Name: "mapper"}},
		"",
		contentmapper.Result{
			Text:             "export {};",
			VirtualExtension: ".ts",
			Mappings:         mappings,
			Supplemental: []contentmapper.MappedResult{{
				Text:             "export const value = 1;",
				VirtualExtension: ".mts",
				Mappings:         mappings,
			}},
		},
	)
	assert.NilError(t, err)
	assert.Assert(t, ast.IsExternalModule(files.Supplemental[0]))
}

func TestParseResultDoesNotLeakCanonicalModuleForcingToSupplementals(t *testing.T) {
	t.Parallel()
	mappings := spanmap.New(nil)
	files, err := contentmapper.ParseResult(
		ast.SourceFileParseOptions{FileName: "/component.astro", PathKey: "/component.astro"},
		"",
		&contentmapper.Mapper{Manifest: contentmapper.Manifest{Name: "mapper"}},
		"",
		contentmapper.Result{
			Text:             "const canonical = 1;",
			VirtualExtension: ".mts",
			Mappings:         mappings,
			Supplemental: []contentmapper.MappedResult{{
				Text:             "const supplemental = 1;",
				VirtualExtension: ".ts",
				Mappings:         mappings,
			}},
		},
	)
	assert.NilError(t, err)
	assert.Assert(t, files.Canonical.ParseOptions().ExternalModuleIndicatorOptions.Force)
	assert.Assert(t, !files.Supplemental[0].ParseOptions().ExternalModuleIndicatorOptions.Force)
}

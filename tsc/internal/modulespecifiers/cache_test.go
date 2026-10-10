package modulespecifiers

import (
	"fmt"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type cachingModuleSpecifierGenerationHost struct {
	mockModuleSpecifierGenerationHost
	cache GenerationCache
}

func (h *cachingModuleSpecifierGenerationHost) ModuleSpecifierGenerationCache() *GenerationCache {
	return &h.cache
}

func parsePackageJson(t testing.TB, content string) *packagejson.PackageJson {
	t.Helper()
	fields, err := packagejson.Parse([]byte(content))
	if err != nil {
		t.Fatal(err)
	}
	return &packagejson.PackageJson{Fields: fields, Parseable: true}
}

func TestGenerationCacheExports(t *testing.T) {
	t.Parallel()

	packageJson := parsePackageJson(t, `{
		"name": "pkg",
		"exports": {
			".": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
			"./feature": {
				"import": { "types": "./dist/esm/feature.d.mts" },
				"require": { "types": "./dist/cjs/feature.d.cts" }
			},
			"./source": { "source": "./src/source.ts", "default": "./dist/source.js" },
			"./utils/*": { "types": "./dist/utils/*.d.ts" }
		}
	}`)
	const packageDirectory = tspath.RootedDirectoryPath("/node_modules/pkg")
	nodeNext := &core.CompilerOptions{Module: core.ModuleKindNodeNext, ModuleResolution: core.ModuleResolutionKindNodeNext}
	withSourceCondition := &core.CompilerOptions{Module: core.ModuleKindNodeNext, ModuleResolution: core.ModuleResolutionKindNodeNext, CustomConditions: []string{"source"}}

	tests := []struct {
		name    string
		target  tspath.RootedFilePath
		options *core.CompilerOptions
		mode    core.ResolutionMode
		want    string
	}{
		{"root", "/node_modules/pkg/dist/index.d.ts", nodeNext, core.ResolutionModeESM, "pkg"},
		{"import condition", "/node_modules/pkg/dist/esm/feature.d.mts", nodeNext, core.ResolutionModeESM, "pkg/feature"},
		{"import condition from require", "/node_modules/pkg/dist/esm/feature.d.mts", nodeNext, core.ResolutionModeCommonJS, ""},
		{"require condition", "/node_modules/pkg/dist/cjs/feature.d.cts", nodeNext, core.ResolutionModeCommonJS, "pkg/feature"},
		{"custom condition", "/node_modules/pkg/src/source.ts", withSourceCondition, core.ResolutionModeESM, "pkg/source"},
		{"custom condition not enabled", "/node_modules/pkg/src/source.ts", nodeNext, core.ResolutionModeESM, ""},
		{"pattern", "/node_modules/pkg/dist/utils/strings.d.ts", nodeNext, core.ResolutionModeESM, "pkg/utils/strings"},
		{"not exported", "/node_modules/pkg/dist/internal.d.ts", nodeNext, core.ResolutionModeESM, ""},
	}

	uncached := &mockModuleSpecifierGenerationHost{caseSensitivity: tspath.CaseSensitive}
	cached := &cachingModuleSpecifierGenerationHost{mockModuleSpecifierGenerationHost: *uncached}
	// Run every case twice against one cache, so that the second pass is answered from entries the
	// other cases stored and would expose a key that omits the options, mode, or target.
	for pass := range 2 {
		for _, tt := range tests {
			uncachedResult := getModuleNameFromExports(tt.options, uncached, tt.target, packageDirectory, "pkg", packageJson, tt.mode)
			if uncachedResult.AsString() != tt.want {
				t.Errorf("%s: uncached lookup = %q, want %q", tt.name, uncachedResult, tt.want)
			}
			if cachedResult := getModuleNameFromExports(tt.options, cached, tt.target, packageDirectory, "pkg", packageJson, tt.mode); cachedResult.AsString() != tt.want {
				t.Errorf("%s (pass %d): cached lookup = %q, want %q", tt.name, pass, cachedResult, tt.want)
			}
		}
	}

	// A re-read package.json is a different *PackageJson and must not be answered from the old entries.
	reread := parsePackageJson(t, `{ "name": "pkg", "exports": { "./moved": "./dist/index.d.ts" } }`)
	if got := getModuleNameFromExports(nodeNext, cached, "/node_modules/pkg/dist/index.d.ts", packageDirectory, "pkg", reread, core.ResolutionModeESM); got.AsString() != "pkg/moved" {
		t.Errorf("lookup after re-reading package.json = %q, want %q", got, "pkg/moved")
	}
}

func TestGenerationCachePathPatterns(t *testing.T) {
	t.Parallel()

	paths := collections.NewOrderedMapWithSizeHint[string, []string](4)
	paths.Set("@org/lib", []string{"./libs/lib/src/index.ts"})
	paths.Set("@org/lib/*", []string{"./libs/lib/src/*"})
	paths.Set("@app/*", []string{"./dist/*.d.ts"})
	paths.Set("@abs/*", []string{"/repo/shared/*"})
	options := &core.CompilerOptions{Module: core.ModuleKindESNext, ModuleResolution: core.ModuleResolutionKindBundler}
	allowedEndings := []ModuleSpecifierEnding{ModuleSpecifierEndingMinimal, ModuleSpecifierEndingIndex, ModuleSpecifierEndingJsExtension}

	tests := []struct {
		name              string
		baseDirectory     tspath.RootedDirectoryPath
		target            tspath.RootedFilePath
		relativeToBaseUrl string
		want              string
	}{
		{"exact entry", "/repo", "/repo/libs/lib/src/index.ts", "libs/lib/src/index.ts", "@org/lib"},
		{"wildcard entry", "/repo", "/repo/libs/lib/src/models/user.ts", "libs/lib/src/models/user.ts", "@org/lib/models/user"},
		{"pattern with extension", "/repo", "/repo/dist/haha.d.ts", "dist/haha.d.ts", "@app/haha"},
		{"not mapped", "/repo", "/repo/other/file.ts", "other/file.ts", ""},
		// An absolute pattern resolves differently against each base directory, so these two would
		// disagree if the resolved patterns were shared between base directories.
		{"absolute pattern from its own root", "/repo", "/repo/shared/util.ts", "shared/util.ts", "@abs/util"},
		{"absolute pattern from a sibling", "/repo/packages/app", "/repo/shared/util.ts", "../../shared/util.ts", "@abs/util"},
	}

	uncached := &mockModuleSpecifierGenerationHost{caseSensitivity: tspath.CaseSensitive, existingFiles: map[tspath.RootedFilePath]bool{}}
	cached := &cachingModuleSpecifierGenerationHost{mockModuleSpecifierGenerationHost: *uncached}
	for pass := range 2 {
		for _, tt := range tests {
			if got := tryGetModuleNameFromPaths(tt.relativeToBaseUrl, tt.target, paths, allowedEndings, tt.baseDirectory, uncached, options); got != tt.want {
				t.Errorf("%s: uncached lookup = %q, want %q", tt.name, got, tt.want)
			}
			if got := tryGetModuleNameFromPaths(tt.relativeToBaseUrl, tt.target, paths, allowedEndings, tt.baseDirectory, cached, options); got != tt.want {
				t.Errorf("%s (pass %d): cached lookup = %q, want %q", tt.name, pass, got, tt.want)
			}
		}
	}
}

func TestGenerationCacheExportsKeyedByPackage(t *testing.T) {
	t.Parallel()

	// One parsed package.json reached through different package directories and under different names,
	// as when a package is symlinked or installed under an alias.
	packageJson := parsePackageJson(t, `{ "exports": { "./sub": "./dist/sub.js" } }`)
	options := &core.CompilerOptions{Module: core.ModuleKindNodeNext, ModuleResolution: core.ModuleResolutionKindNodeNext}

	tests := []struct {
		name             string
		packageDirectory tspath.RootedDirectoryPath
		packageName      string
		target           tspath.RootedFilePath
		want             string
	}{
		{"own directory", "/a/node_modules/pkg", "pkg", "/a/node_modules/pkg/dist/sub.js", "pkg/sub"},
		{"other directory, same name", "/a/node_modules/alias", "pkg", "/a/node_modules/pkg/dist/sub.js", ""},
		{"other directory and name", "/a/node_modules/alias", "alias", "/a/node_modules/pkg/dist/sub.js", ""},
		{"alias directory", "/a/node_modules/alias", "alias", "/a/node_modules/alias/dist/sub.js", "alias/sub"},
		{"own directory, other name", "/a/node_modules/pkg", "renamed", "/a/node_modules/pkg/dist/sub.js", "renamed/sub"},
	}

	host := &cachingModuleSpecifierGenerationHost{caseSensitivity: tspath.CaseSensitive}
	for pass := range 2 {
		for _, tt := range tests {
			if got := getModuleNameFromExports(options, host, tt.target, tt.packageDirectory, tt.packageName, packageJson, core.ResolutionModeESM); got.AsString() != tt.want {
				t.Errorf("%s (pass %d): cached lookup = %q, want %q", tt.name, pass, got, tt.want)
			}
		}
	}
}

func TestGenerationCachePathPatternsKeyedByTable(t *testing.T) {
	t.Parallel()

	// Two tables with the same base directory, such as the "paths" of two projects in one directory.
	first := collections.NewOrderedMapWithSizeHint[string, []string](1)
	first.Set("@first/*", []string{"./src/*"})
	second := collections.NewOrderedMapWithSizeHint[string, []string](1)
	second.Set("@second/*", []string{"./src/*"})
	options := &core.CompilerOptions{Module: core.ModuleKindESNext, ModuleResolution: core.ModuleResolutionKindBundler}
	allowedEndings := []ModuleSpecifierEnding{ModuleSpecifierEndingMinimal}

	tests := []struct {
		paths *collections.OrderedMap[string, []string]
		want  string
	}{
		{first, "@first/util"},
		{second, "@second/util"},
	}

	host := &cachingModuleSpecifierGenerationHost{caseSensitivity: tspath.CaseSensitive, existingFiles: map[tspath.RootedFilePath]bool{}}
	for pass := range 2 {
		for _, tt := range tests {
			if got := tryGetModuleNameFromPaths("src/util.ts", "/repo/src/util.ts", tt.paths, allowedEndings, "/repo", host, options); got != tt.want {
				t.Errorf("pass %d: cached lookup = %q, want %q", pass, got, tt.want)
			}
		}
	}
}

func TestGenerationCacheTypesVersionsBounded(t *testing.T) {
	t.Parallel()

	packageJson := parsePackageJson(t, `{ "name": "pkg", "typesVersions": { "*": { "*": ["./types/*"] } } }`)
	options := &core.CompilerOptions{Module: core.ModuleKindNodeNext, ModuleResolution: core.ModuleResolutionKindNodeNext}
	allowedEndings := []ModuleSpecifierEnding{ModuleSpecifierEndingMinimal, ModuleSpecifierEndingIndex}

	host := &cachingModuleSpecifierGenerationHost{caseSensitivity: tspath.CaseSensitive, existingFiles: map[tspath.RootedFilePath]bool{}}
	const lookups = 50
	for range lookups {
		// A fresh copy of the version paths each time, as tryDirectoryWithPackageJson gets.
		versionPaths := packageJson.GetVersionPaths(nil)
		if got := tryGetModuleNameFromPaths("types/a.d.ts", "/node_modules/pkg/types/a.d.ts", versionPaths.GetPaths(), allowedEndings, "/node_modules/pkg", host, options); got != "a" {
			t.Fatalf("lookup through typesVersions = %q, want %q", got, "a")
		}
	}
	entries := 0
	host.cache.pathPatterns.Range(func(pathPatternsKey, []pathPattern) bool {
		entries++
		return true
	})
	if entries != 1 {
		t.Errorf("cache holds %d resolved pattern tables after %d lookups through one typesVersions table, want 1", entries, lookups)
	}
}

// exportsMapWithSubpaths returns a package.json with count conditional subpath exports, shaped like
// the exports map of a package that publishes one entry point per module.
func exportsMapWithSubpaths(count int) string {
	var b strings.Builder
	b.WriteString(`{ "name": "pkg", "exports": { ".": { "types": "./dist/dts/index.d.ts", "import": "./dist/esm/index.js", "default": "./dist/cjs/index.js" }`)
	for i := range count {
		fmt.Fprintf(&b, `, "./Module%d": { "types": "./dist/dts/Module%d.d.ts", "import": "./dist/esm/Module%d.js", "default": "./dist/cjs/Module%d.js" }`, i, i, i, i)
	}
	b.WriteString(` } }`)
	return b.String()
}

func BenchmarkTryGetModuleNameFromExports(b *testing.B) {
	const subpaths = 180
	packageJson := parsePackageJson(b, exportsMapWithSubpaths(subpaths))
	options := &core.CompilerOptions{Module: core.ModuleKindNodeNext, ModuleResolution: core.ModuleResolutionKindNodeNext}
	conditions := module.GetConditions(options, core.ResolutionModeESM)
	host := &mockModuleSpecifierGenerationHost{caseSensitivity: tspath.CaseInsensitive}
	target := tspath.RootedFilePathFromNormalized(fmt.Sprintf("/Users/Dev/project/node_modules/pkg/dist/dts/Module%d.d.ts", subpaths-1))
	packageDirectory := tspath.RootedDirectoryPath("/Users/Dev/project/node_modules/pkg")
	want := tspath.ToModuleSpecifier(fmt.Sprintf("pkg/Module%d", subpaths-1))

	b.ReportAllocs()
	for b.Loop() {
		if got := tryGetModuleNameFromExports(options, host, target, packageDirectory, "pkg", packageJson.Fields.Exports, conditions); got != want {
			b.Fatalf("got %q, want %q", got, want)
		}
	}
}

func BenchmarkTryGetModuleNameFromPaths(b *testing.B) {
	benchmarkTryGetModuleNameFromPaths(b, &mockModuleSpecifierGenerationHost{caseSensitivity: tspath.CaseInsensitive, existingFiles: map[tspath.RootedFilePath]bool{}})
}

func BenchmarkTryGetModuleNameFromPathsCached(b *testing.B) {
	benchmarkTryGetModuleNameFromPaths(b, &cachingModuleSpecifierGenerationHost{caseSensitivity: tspath.CaseInsensitive, existingFiles: map[tspath.RootedFilePath]bool{}})
}

// benchmarkTryGetModuleNameFromPaths looks up a file through a "paths" table shaped like the one in an Nx
// workspace, with an exact and a wildcard entry per library, where the file's library comes last.
func benchmarkTryGetModuleNameFromPaths(b *testing.B, host ModuleSpecifierGenerationHost) {
	const libraries = 200
	paths := collections.NewOrderedMapWithSizeHint[string, []string](2 * libraries)
	for i := range libraries {
		paths.Set(fmt.Sprintf("@org/lib%d", i), []string{fmt.Sprintf("./libs/lib%d/src/index.ts", i)})
		paths.Set(fmt.Sprintf("@org/lib%d/*", i), []string{fmt.Sprintf("./libs/lib%d/src/*", i)})
	}
	options := &core.CompilerOptions{Module: core.ModuleKindESNext, ModuleResolution: core.ModuleResolutionKindBundler}
	baseDirectory := tspath.RootedDirectoryPath("/Users/Dev/workspace")
	target := tspath.RootedFilePathFromNormalized(fmt.Sprintf("/Users/Dev/workspace/libs/lib%d/src/models/user.ts", libraries-1))
	relativeToBaseUrl := fmt.Sprintf("libs/lib%d/src/models/user.ts", libraries-1)
	allowedEndings := []ModuleSpecifierEnding{ModuleSpecifierEndingMinimal, ModuleSpecifierEndingIndex, ModuleSpecifierEndingJsExtension}
	want := fmt.Sprintf("@org/lib%d/models/user", libraries-1)

	b.ReportAllocs()
	for b.Loop() {
		if got := tryGetModuleNameFromPaths(relativeToBaseUrl, target, paths, allowedEndings, baseDirectory, host, options); got != want {
			b.Fatalf("got %q, want %q", got, want)
		}
	}
}

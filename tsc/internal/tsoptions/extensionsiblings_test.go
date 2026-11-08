package tsoptions

import (
	"math/rand/v2"
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfsmatch"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestExtensionSiblingKey(t *testing.T) {
	t.Parallel()

	files := []string{
		"/p/a.ts", "/p/A.TS", "/p/Foo.d.ts", "/p/Foo.D.TS", "/p/x.d.mts", "/p/x.d.cts",
		"/p/x.d.json.ts", "/p/Comp.vue", "/p/Comp.d.vue.ts", "/p/noext", "/p/dir.v1/a.js",
		"/p/İstanbul.tsx", "c:/P/a.mjs", "//server/share/A.cjs", "file:///c:/P/a.ts",
		"^/untitled/ts-nul-authority/Untitled-1.ts", "^/~ts-uri~/custom/authority/A.ts",
	}
	exts := slices.Concat(core.Flatten(tspath.AllSupportedExtensionsWithJson), []string{".vue", ".d.vue.ts"})
	for _, caseSensitivity := range []tspath.CaseSensitivity{tspath.CaseSensitive, tspath.CaseInsensitive} {
		keyMapper := func(f tspath.RootedFilePath) tspath.PathKey { return caseSensitivity.PathKey(f.AsPath()) }
		for _, name := range files {
			file := tspath.RootedFilePathFromNormalized(name)
			siblings := newExtensionSiblings(file, keyMapper(file), keyMapper)
			for _, ext := range exts {
				assert.Equal(t, siblings.siblingKey(ext), keyMapper(file.ChangeExtension(ext)), "%v %s -> %s", caseSensitivity, name, ext)
			}
		}
	}

	insensitive := func(f tspath.RootedFilePath) tspath.PathKey { return tspath.CaseInsensitive.PathKey(f.AsPath()) }
	for name, derived := range map[string]bool{
		"/p/A.ts":                          true,
		"/p/A.TS":                          false, // canonical key's extension differs from the file's
		"/p/noext":                         false,
		"^/~ts-uri~/custom/authority/a.ts": false,
	} {
		file := tspath.RootedFilePathFromNormalized(name)
		siblings := newExtensionSiblings(file, insensitive(file), insensitive)
		assert.Equal(t, siblings.keyMapper == nil, derived, name)
	}
}

// TestGetFileNamesExtensionPriority compares wildcard expansion against a
// reference that computes every sibling with keyMapper(file.ChangeExtension(ext)).
func TestGetFileNamesExtensionPriority(t *testing.T) {
	t.Parallel()

	basePath := tspath.RootedDirectoryPath("/p")
	pattern := func(s string) tspath.PathPattern { return tspath.ToPathPattern("/p/" + s) }

	t.Run("examples", func(t *testing.T) {
		t.Parallel()
		cases := []struct {
			files    []string
			include  []string
			literals []string
			allowJs  bool
			insens   bool
			expected []string
		}{
			{files: []string{"a.ts", "a.d.ts"}, include: []string{"**/*"}, expected: []string{"/p/a.ts"}},
			{files: []string{"a.ts", "a.tsx"}, include: []string{"**/*"}, expected: []string{"/p/a.ts"}},
			{files: []string{"a.ts", "a.js"}, include: []string{"**/*"}, allowJs: true, expected: []string{"/p/a.ts"}},
			{files: []string{"a.js", "a.ts"}, include: []string{"**/*.js", "**/*.ts"}, allowJs: true, expected: []string{"/p/a.ts"}},
			{files: []string{"a.d.ts", "a.js"}, include: []string{"**/*"}, allowJs: true, expected: []string{"/p/a.d.ts", "/p/a.js"}},
			{files: []string{"a.mts", "a.d.mts", "a.cts", "a.d.cts"}, include: []string{"**/*"}, expected: []string{"/p/a.cts", "/p/a.d.cts", "/p/a.mts"}},
			{files: []string{"A.ts", "a.d.ts"}, include: []string{"**/*"}, insens: true, expected: []string{"/p/A.ts"}},
			{files: []string{"A.ts", "a.d.ts"}, include: []string{"**/*"}, expected: []string{"/p/A.ts", "/p/a.d.ts"}},
			{files: []string{"a.d.ts", "a.ts"}, include: []string{"**/*"}, literals: []string{"a.d.ts"}, expected: []string{"/p/a.d.ts", "/p/a.ts"}},
			{files: []string{"a.ts", "a.d.ts"}, include: []string{"**/*"}, literals: []string{"a.ts"}, expected: []string{"/p/a.ts"}},
		}
		for _, c := range cases {
			got, want := runGetFileNames(c.files, c.include, c.literals, c.allowJs, c.insens, nil, pattern, basePath)
			slices.Sort(got)
			slices.Sort(want)
			assert.DeepEqual(t, got, c.expected)
			assert.DeepEqual(t, want, c.expected)
		}
	})

	t.Run("differential", func(t *testing.T) {
		t.Parallel()
		stems := []string{"a", "A", "sub/a", "b.d", "İ"}
		exts := []string{".ts", ".tsx", ".d.ts", ".js", ".jsx", ".mts", ".d.mts", ".cts", ".d.cts", ".mjs", ".cjs", ".vue", ".d.vue.ts", ".TS", ".D.TS"}
		includes := [][]string{{"**/*"}, {"**/*.js", "**/*.ts"}, {"**/*.d.ts", "**/*.ts", "**/*.tsx"}, {"**/*.vue", "**/*"}, {"**/*.mjs", "**/*.mts", "**/*.d.mts"}}
		rng := rand.New(rand.NewPCG(1, 2))
		for i := range 3000 {
			var files []string
			for _, stem := range stems {
				for _, ext := range exts {
					if rng.IntN(4) == 0 {
						files = append(files, stem+ext)
					}
				}
			}
			var literals []string
			if len(files) > 0 && rng.IntN(3) == 0 {
				literals = []string{files[rng.IntN(len(files))]}
			}
			var extra []string
			if i%2 == 0 {
				extra = []string{".vue"}
			}
			got, want := runGetFileNames(files, includes[i%len(includes)], literals, i%3 != 0, i%4 < 2, extra, pattern, basePath)
			assert.DeepEqual(t, got, want)
		}
	})
}

func runGetFileNames(
	files, include, literals []string,
	allowJs, insensitive bool,
	extra []string,
	pattern func(string) tspath.PathPattern,
	basePath tspath.RootedDirectoryPath,
) (got []string, want []string) {
	caseSensitivity := tspath.CaseSensitive
	if insensitive {
		caseSensitivity = tspath.CaseInsensitive
	}
	contents := map[string]string{}
	seen := map[tspath.PathKey]bool{}
	for _, f := range files {
		key := caseSensitivity.PathKey(tspath.RootedPathFromNormalized("/p/" + f))
		if !seen[key] {
			seen[key] = true
			contents["/p/"+f] = ""
		}
	}
	host := vfstest.FromMap(contents, caseSensitivity)
	specs := configFileSpecs{}
	for _, l := range literals {
		specs.validatedFilesSpec = append(specs.validatedFilesSpec, tspath.ToFileSpec(l))
		specs.validatedFileNames = append(specs.validatedFileNames, basePath.ResolveFile(l))
	}
	for _, i := range include {
		specs.validatedIncludeSpecs = append(specs.validatedIncludeSpecs, pattern(i))
	}
	options := &core.CompilerOptions{AllowJs: core.BoolToTristate(allowJs)}
	result, _ := getFileNamesFromConfigSpecs(specs, basePath, options, host, extra)
	for _, f := range result {
		got = append(got, f.AsString())
	}
	for _, f := range referenceGetFileNames(specs, basePath, options, host, extra) {
		want = append(want, f.AsString())
	}
	return got, want
}

// referenceGetFileNames is getFileNamesFromConfigSpecs without JSON handling,
// computing sibling keys by changing the extension and remapping.
func referenceGetFileNames(specs configFileSpecs, basePath tspath.RootedDirectoryPath, options *core.CompilerOptions, host vfs.FS, extra []string) []tspath.RootedFilePath {
	keyMapper := func(f tspath.RootedFilePath) tspath.PathKey { return host.CaseSensitivity().PathKey(f.AsPath()) }
	var literalFileMap, wildcardFileMap collections.OrderedMap[tspath.PathKey, tspath.RootedFilePath]
	supported := GetSupportedExtensions(options, extra)
	for _, f := range specs.validatedFileNames {
		literalFileMap.Set(keyMapper(f), f)
	}
	hasFile := func(f tspath.RootedFilePath) bool {
		k := keyMapper(f)
		return literalFileMap.Has(k) || wildcardFileMap.Has(k)
	}
	matchingGroups := func(file tspath.RootedFilePath) []string {
		var group []string
		for _, g := range supported {
			if file.ExtensionIsOneOf(g) {
				group = append(group, g...)
			}
		}
		return group
	}
	for _, file := range vfsmatch.ReadDirectory(host, basePath, core.Flatten(supported), specs.validatedExcludeSpecs, specs.validatedIncludeSpecs, vfsmatch.UnlimitedDepth) {
		group := matchingGroups(file)
		higher := false
		for _, ext := range group {
			if file.ExtensionIs(ext) && (ext != tspath.ExtensionTs || !file.ExtensionIs(tspath.ExtensionDts)) {
				break
			}
			if hasFile(file.ChangeExtension(ext)) {
				if ext == tspath.ExtensionDts && (file.ExtensionIs(tspath.ExtensionJs) || file.ExtensionIs(tspath.ExtensionJsx)) {
					continue
				}
				higher = true
				break
			}
		}
		if higher {
			continue
		}
		for _, ext := range slices.Backward(group) {
			if file.ExtensionIs(ext) {
				break
			}
			wildcardFileMap.Delete(keyMapper(file.ChangeExtension(ext)))
		}
		key := keyMapper(file)
		if !literalFileMap.Has(key) && !wildcardFileMap.Has(key) {
			wildcardFileMap.Set(key, file)
		}
	}
	return slices.Concat(slices.Collect(literalFileMap.Values()), slices.Collect(wildcardFileMap.Values()))
}

package modulespecifiers

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/symlinks"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// Mock host for testing
type mockModuleSpecifierGenerationHost struct {
	currentDir                string
	contentMapperExtensions   []string
	useCaseSensitiveFileNames bool
	symlinkCache              *symlinks.KnownSymlinks
}

func (h *mockModuleSpecifierGenerationHost) GetCurrentDirectory() string {
	return h.currentDir
}

func (h *mockModuleSpecifierGenerationHost) UseCaseSensitiveFileNames() bool {
	return h.useCaseSensitiveFileNames
}

func (h *mockModuleSpecifierGenerationHost) GetSymlinkCache() *symlinks.KnownSymlinks {
	return h.symlinkCache
}

func (h *mockModuleSpecifierGenerationHost) ResolveModuleName(moduleName string, containingFile string, resolutionMode core.ResolutionMode) *module.ResolvedModule {
	return nil
}

func (h *mockModuleSpecifierGenerationHost) GetGlobalTypingsCacheLocation() string {
	return ""
}

func (h *mockModuleSpecifierGenerationHost) CommonSourceDirectory() string {
	return h.currentDir
}

func (h *mockModuleSpecifierGenerationHost) ContentMapperExtensions() []string {
	return h.contentMapperExtensions
}

func (h *mockModuleSpecifierGenerationHost) GetProjectReferenceFromSource(path tspath.Path) *tsoptions.SourceOutputAndProjectReference {
	return nil
}

func (h *mockModuleSpecifierGenerationHost) GetRedirectTargets(path tspath.Path) []string {
	return nil
}

func (h *mockModuleSpecifierGenerationHost) GetSourceOfProjectReferenceIfOutputIncluded(file ast.HasFileName) string {
	return file.FileName()
}

func (h *mockModuleSpecifierGenerationHost) FileExists(path string) bool {
	return true // Mock implementation
}

func (h *mockModuleSpecifierGenerationHost) GetNearestAncestorDirectoryWithPackageJson(dirname string) string {
	return ""
}

func (h *mockModuleSpecifierGenerationHost) GetPackageJsonInfo(pkgJsonPath string) *packagejson.InfoCacheEntry {
	return nil
}

func (h *mockModuleSpecifierGenerationHost) GetDefaultResolutionModeForFile(file ast.HasFileName) core.ResolutionMode {
	return core.ResolutionModeNone
}

func (h *mockModuleSpecifierGenerationHost) GetResolvedModuleFromModuleSpecifier(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) *module.ResolvedModule {
	return nil
}

func (h *mockModuleSpecifierGenerationHost) GetModeForUsageLocation(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) core.ResolutionMode {
	return core.ResolutionModeNone
}

func TestGetEachFileNameOfModule(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name           string
		importingFile  string
		importedFile   string
		preferSymlinks bool
		expectedCount  int
		expectedPaths  []string
	}{
		{
			name:           "basic file path",
			importingFile:  "/project/src/main.ts",
			importedFile:   "/project/lib/utils.ts",
			preferSymlinks: false,
			expectedCount:  1,
			expectedPaths:  []string{"/project/lib/utils.ts"},
		},
		{
			name:           "symlink preference false",
			importingFile:  "/project/src/main.ts",
			importedFile:   "/project/lib/utils.ts",
			preferSymlinks: false,
			expectedCount:  1,
		},
		{
			name:           "symlink preference true",
			importingFile:  "/project/src/main.ts",
			importedFile:   "/project/lib/utils.ts",
			preferSymlinks: true,
			expectedCount:  1,
		},
		{
			name:           "ignored path with no alternatives",
			importingFile:  "/project/src/main.ts",
			importedFile:   "/project/node_modules/.pnpm/file.ts",
			preferSymlinks: false,
			expectedCount:  1, // Should return 1 because there's no better option (all paths are ignored)
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			host := &mockModuleSpecifierGenerationHost{
				currentDir:                "/project",
				useCaseSensitiveFileNames: true,
				symlinkCache:              symlinks.NewKnownSymlink("/project", true),
			}

			result := GetEachFileNameOfModule(tt.importingFile, tt.importedFile, host, tt.preferSymlinks)

			if len(result) != tt.expectedCount {
				t.Errorf("Expected %d paths, got %d", tt.expectedCount, len(result))
			}

			if tt.expectedPaths != nil {
				for i, expectedPath := range tt.expectedPaths {
					if i >= len(result) {
						t.Errorf("Expected path %d: %s, but result has only %d paths", i, expectedPath, len(result))
						continue
					}
					if result[i].FileName != expectedPath {
						t.Errorf("Expected path %d to be %s, got %s", i, expectedPath, result[i].FileName)
					}
				}
			}

			for i, path := range result {
				if path.FileName == "" {
					t.Errorf("Path %d has empty FileName", i)
				}
			}
		})
	}
}

func TestGetEachFileNameOfModuleWithSymlinks(t *testing.T) {
	t.Parallel()
	host := &mockModuleSpecifierGenerationHost{
		currentDir:                "/project",
		useCaseSensitiveFileNames: true,
		symlinkCache:              symlinks.NewKnownSymlink("/project", true),
	}

	symlinkPath := tspath.ToPath("/project/symlink", "/project", true).EnsureTrailingDirectorySeparator()
	realDirectory := &symlinks.KnownDirectoryLink{
		Real:     "/real/path/",
		RealPath: tspath.ToPath("/real/path", "/project", true).EnsureTrailingDirectorySeparator(),
	}
	host.symlinkCache.SetDirectory("/project/symlink", symlinkPath, realDirectory)

	result := GetEachFileNameOfModule("/project/src/main.ts", "/real/path/file.ts", host, true)

	// Should find the symlink path
	found := false
	for _, path := range result {
		if path.FileName == "/project/symlink/file.ts" {
			found = true
			break
		}
	}

	if !found {
		t.Error("Expected to find symlink path /project/symlink/file.ts")
	}
}

func TestContainsNodeModules(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name     string
		path     string
		expected bool
	}{
		{
			name:     "contains node_modules",
			path:     "/project/node_modules/lodash/index.js",
			expected: true,
		},
		{
			name:     "does not contain node_modules",
			path:     "/project/src/utils.ts",
			expected: false,
		},
		{
			name:     "node_modules in middle",
			path:     "/project/packages/node_modules/pkg/file.js",
			expected: true,
		},
		{
			name:     "empty path",
			path:     "",
			expected: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			result := ContainsNodeModules(tt.path)
			if result != tt.expected {
				t.Errorf("ContainsNodeModules(%q) = %v, expected %v", tt.path, result, tt.expected)
			}
		})
	}
}

func TestContainsIgnoredPath(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name     string
		path     string
		expected bool
	}{
		{
			name:     "ignored path",
			path:     "/project/node_modules/.pnpm/file.ts",
			expected: true,
		},
		{
			name:     "not ignored path",
			path:     "/project/src/file.ts",
			expected: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			result := containsIgnoredPath(tt.path)
			if result != tt.expected {
				t.Errorf("containsIgnoredPath(%q) = %v, expected %v", tt.path, result, tt.expected)
			}
		})
	}
}

func TestTryGetRealFileNameForNonJSDeclarationFileName(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name     string
		fileName string
		expected string
	}{
		{
			name:     "json declaration file",
			fileName: "/project/foo.d.json.ts",
			expected: "/project/foo.json",
		},
		{
			name:     "multi-dot source extension declaration file",
			fileName: "/project/foo.module.d.css.ts",
			expected: "/project/foo.module.css",
		},
		{
			name:     "plain dts file ignored",
			fileName: "/project/foo.d.ts",
			expected: "",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			if got := TryGetRealFileNameForNonJSDeclarationFileName(tt.fileName); got != tt.expected {
				t.Errorf("TryGetRealFileNameForNonJSDeclarationFileName(%q) = %q, expected %q", tt.fileName, got, tt.expected)
			}
		})
	}
}

func TestTryGetModuleNameFromExportsOrImports(t *testing.T) {
	t.Parallel()
	t.Run("with exports pattern", func(t *testing.T) {
		t.Parallel()

		tests := []struct {
			name           string
			targetFilePath string
			expected       string
		}{
			{
				name:           "match",
				targetFilePath: "/pkg/src/things/thing1/index.ts",
				expected:       "./src/things/thing1",
			},
			{
				name:           "mismatch with matching leading and trailing strings",
				targetFilePath: "/pkg/src/things/index.ts",
				expected:       "",
			},
		}

		for _, tt := range tests {
			t.Run(tt.name, func(t *testing.T) {
				t.Parallel()
				result := tryGetModuleNameFromExportsOrImports(
					&core.CompilerOptions{},
					&mockModuleSpecifierGenerationHost{},
					tt.targetFilePath,
					"/pkg",
					"./src/things/*",
					packagejson.ExportsOrImports{
						JSONValue: packagejson.JSONValue{
							Type:  packagejson.JSONValueTypeString,
							Value: "./src/things/*/index.js",
						},
					},
					[]string{},
					MatchingModePattern,
					false,
					false,
				)
				if result != tt.expected {
					t.Errorf("tryGetModuleNameFromExportsOrImports(targetFilePath = %q) = %v, expected %v", tt.targetFilePath, result, tt.expected)
				}
			})
		}
	})
	t.Run("with conditional fallback blocked (issue 64171)", func(t *testing.T) {
		t.Parallel()

		strExports := func(s string) packagejson.ExportsOrImports {
			return packagejson.ExportsOrImports{
				JSONValue: packagejson.JSONValue{
					Type:  packagejson.JSONValueTypeString,
					Value: s,
				},
			}
		}
		condExports := func(entries ...collections.MapEntry[string, packagejson.ExportsOrImports]) packagejson.ExportsOrImports {
			return packagejson.ExportsOrImports{
				JSONValue: packagejson.JSONValue{
					Type:  packagejson.JSONValueTypeObject,
					Value: collections.NewOrderedMapFromList(entries),
				},
			}
		}
		// "#*": { "node": "./dist/*/index.js", "default": "./dist/*.js" }
		conditional := condExports(
			collections.MapEntry[string, packagejson.ExportsOrImports]{Key: "node", Value: strExports("./dist/*/index.js")},
			collections.MapEntry[string, packagejson.ExportsOrImports]{Key: "default", Value: strExports("./dist/*.js")},
		)
		conditions := []string{"import", "types", "node"}

		tests := []struct {
			name           string
			targetFilePath string
			expected       string
		}{
			{
				name:           "node condition matches, valid specifier",
				targetFilePath: "/pkg/dist/utils/summarize/index.js",
				expected:       "#utils/summarize",
			},
			{
				name:           "node condition shadows default, invalid specifier blocked",
				targetFilePath: "/pkg/dist/utils/summarize/summarize.js",
				expected:       "",
			},
		}
		for _, tt := range tests {
			t.Run(tt.name, func(t *testing.T) {
				t.Parallel()
				result := tryGetModuleNameFromExportsOrImports(
					&core.CompilerOptions{},
					&mockModuleSpecifierGenerationHost{currentDir: "/pkg", useCaseSensitiveFileNames: true},
					tt.targetFilePath,
					"/pkg",
					"#*",
					conditional,
					conditions,
					MatchingModePattern,
					true,
					false,
				)
				if result != tt.expected {
					t.Errorf("tryGetModuleNameFromExportsOrImports(targetFilePath = %q) = %q, expected %q", tt.targetFilePath, result, tt.expected)
				}
			})
		}
	})
	t.Run("types-only condition does not shadow runtime (issue 64171 follow-up)", func(t *testing.T) {
		t.Parallel()
		strExports := func(s string) packagejson.ExportsOrImports {
			return packagejson.ExportsOrImports{
				JSONValue: packagejson.JSONValue{
					Type:  packagejson.JSONValueTypeString,
					Value: s,
				},
			}
		}
		conditional := packagejson.ExportsOrImports{
			JSONValue: packagejson.JSONValue{
				Type: packagejson.JSONValueTypeObject,
				Value: collections.NewOrderedMapFromList([]collections.MapEntry[string, packagejson.ExportsOrImports]{
					{Key: "types", Value: strExports("./types/*.d.ts")},
					{Key: "default", Value: strExports("./dist/*.js")},
				}),
			},
		}
		result := tryGetModuleNameFromExportsOrImports(
			&core.CompilerOptions{},
			&mockModuleSpecifierGenerationHost{currentDir: "/pkg", useCaseSensitiveFileNames: true},
			"/pkg/dist/foo.js",
			"/pkg",
			"#*",
			conditional,
			[]string{"import", "types", "node"},
			MatchingModePattern,
			true,
			false,
		)
		if result != "#foo" {
			t.Errorf("expected #foo for runtime file when types misses, got %q", result)
		}
	})
	t.Run("conditional edge cases (issue 64171)", func(t *testing.T) {
		t.Parallel()
		strExports := func(s string) packagejson.ExportsOrImports {
			return packagejson.ExportsOrImports{
				JSONValue: packagejson.JSONValue{
					Type:  packagejson.JSONValueTypeString,
					Value: s,
				},
			}
		}
		condExports := func(entries ...collections.MapEntry[string, packagejson.ExportsOrImports]) packagejson.ExportsOrImports {
			return packagejson.ExportsOrImports{
				JSONValue: packagejson.JSONValue{
					Type:  packagejson.JSONValueTypeObject,
					Value: collections.NewOrderedMapFromList(entries),
				},
			}
		}
		arrExports := func(elems ...packagejson.ExportsOrImports) packagejson.ExportsOrImports {
			return packagejson.ExportsOrImports{
				JSONValue: packagejson.JSONValue{
					Type:  packagejson.JSONValueTypeArray,
					Value: elems,
				},
			}
		}
		host := &mockModuleSpecifierGenerationHost{currentDir: "/pkg", useCaseSensitiveFileNames: true}
		conditions := []string{"import", "types", "node"}
		cjsConditions := []string{"require", "types", "node"}

		// Arrays are not file-existence fallbacks in Node: first valid string wins,
		// even if the file is missing. Only undefined/invalid entries fall through.
		arrayCond := condExports(
			collections.MapEntry[string, packagejson.ExportsOrImports]{Key: "node", Value: arrExports(strExports("./dist/a.js"), strExports("./dist/b.js"))},
			collections.MapEntry[string, packagejson.ExportsOrImports]{Key: "default", Value: strExports("./dist/c.js")},
		)
		if got := tryGetModuleNameFromExportsOrImports(&core.CompilerOptions{}, host, "/pkg/dist/a.js", "/pkg", "#a", arrayCond, conditions, MatchingModeExact, true, false); got != "#a" {
			t.Errorf("array first-element match should be valid, got %q", got)
		}
		if got := tryGetModuleNameFromExportsOrImports(&core.CompilerOptions{}, host, "/pkg/dist/b.js", "/pkg", "#a", arrayCond, conditions, MatchingModeExact, true, false); got != "" {
			t.Errorf("array second-element match should be blocked (first valid string wins at runtime), got %q", got)
		}
		if got := tryGetModuleNameFromExportsOrImports(&core.CompilerOptions{}, host, "/pkg/dist/c.js", "/pkg", "#a", arrayCond, conditions, MatchingModeExact, true, false); got != "" {
			t.Errorf("array miss under node should block default, got %q", got)
		}

		// Array with undefined first entry falls through: [{ import: ... }] skipped when import inactive.
		arrayUndefinedFirst := condExports(
			collections.MapEntry[string, packagejson.ExportsOrImports]{Key: "node", Value: arrExports(
				condExports(collections.MapEntry[string, packagejson.ExportsOrImports]{Key: "import", Value: strExports("./dist/a.js")}),
				strExports("./dist/b.js"),
			)},
			collections.MapEntry[string, packagejson.ExportsOrImports]{Key: "default", Value: strExports("./dist/c.js")},
		)
		if got := tryGetModuleNameFromExportsOrImports(&core.CompilerOptions{}, host, "/pkg/dist/b.js", "/pkg", "#a", arrayUndefinedFirst, cjsConditions, MatchingModeExact, true, false); got != "#a" {
			t.Errorf("array undefined first entry should fallback to second element, got %q", got)
		}

		// Nested conditional with no active runtime key should not block outer default.
		// Outer node -> inner { import: ... } with CJS conditions (require, no import): inner skipped, outer default valid.
		nestedNoMatch := condExports(
			collections.MapEntry[string, packagejson.ExportsOrImports]{Key: "node", Value: condExports(
				collections.MapEntry[string, packagejson.ExportsOrImports]{Key: "import", Value: strExports("./dist/a.js")},
			)},
			collections.MapEntry[string, packagejson.ExportsOrImports]{Key: "default", Value: strExports("./dist/b.js")},
		)
		if got := tryGetModuleNameFromExportsOrImports(&core.CompilerOptions{}, host, "/pkg/dist/b.js", "/pkg", "#a", nestedNoMatch, cjsConditions, MatchingModeExact, true, false); got != "#a" {
			t.Errorf("nested no-active-key should fallback to outer default, got %q", got)
		}

		// Deeper nesting: { node: { import: { browser: ./a.js } }, default: ./b.js }
		// with active node/import but inactive browser -> undefined, fallback to default valid.
		deepNested := condExports(
			collections.MapEntry[string, packagejson.ExportsOrImports]{Key: "node", Value: condExports(
				collections.MapEntry[string, packagejson.ExportsOrImports]{Key: "import", Value: condExports(
					collections.MapEntry[string, packagejson.ExportsOrImports]{Key: "browser", Value: strExports("./dist/a.js")},
				)},
			)},
			collections.MapEntry[string, packagejson.ExportsOrImports]{Key: "default", Value: strExports("./dist/b.js")},
		)
		if got := tryGetModuleNameFromExportsOrImports(&core.CompilerOptions{}, host, "/pkg/dist/b.js", "/pkg", "#a", deepNested, conditions, MatchingModeExact, true, false); got != "#a" {
			t.Errorf("deep nested undefined should fallback to outer default, got %q", got)
		}

		// Default-first is terminal: later node unreachable.
		defaultFirst := condExports(
			collections.MapEntry[string, packagejson.ExportsOrImports]{Key: "default", Value: strExports("./dist/a.js")},
			collections.MapEntry[string, packagejson.ExportsOrImports]{Key: "node", Value: strExports("./dist/b.js")},
		)
		if got := tryGetModuleNameFromExportsOrImports(&core.CompilerOptions{}, host, "/pkg/dist/a.js", "/pkg", "#a", defaultFirst, conditions, MatchingModeExact, true, false); got != "#a" {
			t.Errorf("default-first match should be valid, got %q", got)
		}
		if got := tryGetModuleNameFromExportsOrImports(&core.CompilerOptions{}, host, "/pkg/dist/b.js", "/pkg", "#a", defaultFirst, conditions, MatchingModeExact, true, false); got != "" {
			t.Errorf("default-first miss should block later node, got %q", got)
		}
	})
}

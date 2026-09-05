package modulespecifiers

import (
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/symlinks"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func TestGetNodeModulePathParts(t *testing.T) {
	t.Parallel()
	tests := []struct {
		path                          tspath.RootedFilePath
		topLevelNodeModulesSearchRoot tspath.RootedDirectoryPath
		topLevelNodeModulesDirectory  tspath.RootedDirectoryPath
		packageRootDirectory          tspath.RootedDirectoryPath
		packageName                   string
		packageRelativePath           tspath.RelativePath
		hasNestedNodeModules          bool
		isDirectNodeModulesFile       bool
	}{
		{
			path:                          "/workspace/node_modules/pkg/lib/index.d.ts",
			topLevelNodeModulesSearchRoot: "/workspace",
			topLevelNodeModulesDirectory:  "/workspace/node_modules",
			packageRootDirectory:          "/workspace/node_modules/pkg",
			packageName:                   "pkg",
			packageRelativePath:           "lib/index.d.ts",
		},
		{
			path:                          "/node_modules/@scope/pkg/index.d.ts",
			topLevelNodeModulesSearchRoot: "/",
			topLevelNodeModulesDirectory:  "/node_modules",
			packageRootDirectory:          "/node_modules/@scope/pkg",
			packageName:                   "@scope/pkg",
			packageRelativePath:           "index.d.ts",
		},
		{
			path:                          "c:/node_modules/pkg/index.d.ts",
			topLevelNodeModulesSearchRoot: "c:/",
			topLevelNodeModulesDirectory:  "c:/node_modules",
			packageRootDirectory:          "c:/node_modules/pkg",
			packageName:                   "pkg",
			packageRelativePath:           "index.d.ts",
		},
		{
			path:                          "/workspace/node_modules/pkg/node_modules/@scope/dep/index.d.ts",
			topLevelNodeModulesSearchRoot: "/workspace",
			topLevelNodeModulesDirectory:  "/workspace/node_modules",
			packageRootDirectory:          "/workspace/node_modules/pkg/node_modules/@scope/dep",
			packageName:                   "@scope/dep",
			packageRelativePath:           "index.d.ts",
			hasNestedNodeModules:          true,
		},
	}

	for _, tt := range tests {
		parts := GetNodeModulePathParts(tt.path)
		if parts == nil {
			t.Fatalf("GetNodeModulePathParts(%q) returned nil", tt.path)
		}
		if parts.TopLevelNodeModulesSearchRoot != tt.topLevelNodeModulesSearchRoot ||
			parts.TopLevelNodeModulesDirectory != tt.topLevelNodeModulesDirectory ||
			parts.PackageRootDirectory != tt.packageRootDirectory ||
			parts.PackageName != tt.packageName ||
			parts.PackageRelativePath != tt.packageRelativePath ||
			parts.HasNestedNodeModules != tt.hasNestedNodeModules ||
			parts.IsDirectNodeModulesFile != tt.isDirectNodeModulesFile {
			t.Errorf("GetNodeModulePathParts(%q) = %+v", tt.path, parts)
		}
	}

	for _, path := range []tspath.RootedFilePath{
		"/workspace/src/index.ts",
	} {
		if parts := GetNodeModulePathParts(path); parts != nil {
			t.Errorf("GetNodeModulePathParts(%q) = %+v, want nil", path, parts)
		}
	}

	direct := GetNodeModulePathParts("/workspace/node_modules/pkg")
	if direct == nil || !direct.IsDirectNodeModulesFile || direct.PackageName != "pkg" {
		t.Errorf("GetNodeModulePathParts for direct node_modules file = %+v", direct)
	}
	directScoped := GetNodeModulePathParts("/workspace/node_modules/@scope")
	if directScoped == nil || !directScoped.IsDirectNodeModulesFile || directScoped.PackageName != "@scope" {
		t.Errorf("GetNodeModulePathParts for direct scoped node_modules file = %+v", directScoped)
	}
}

// Mock host for testing
type mockModuleSpecifierGenerationHost struct {
	currentDir              tspath.RootedDirectoryPath
	contentMapperExtensions []string
	caseSensitivity         tspath.CaseSensitivity
	symlinkCache            *symlinks.KnownSymlinks
	existingFiles           map[tspath.RootedFilePath]bool
	fileExistsCalls         []tspath.RootedFilePath
}

func (h *mockModuleSpecifierGenerationHost) BaseDirectory() tspath.RootedDirectoryPath {
	return h.currentDir
}

func (h *mockModuleSpecifierGenerationHost) CaseSensitivity() tspath.CaseSensitivity {
	return h.caseSensitivity
}

func (h *mockModuleSpecifierGenerationHost) GetSymlinkCache() *symlinks.KnownSymlinks {
	return h.symlinkCache
}

func (h *mockModuleSpecifierGenerationHost) ResolveModuleName(moduleName string, containingFile tspath.RootedFilePath, resolutionMode core.ResolutionMode) *module.ResolvedModule {
	return nil
}

func (h *mockModuleSpecifierGenerationHost) GetGlobalTypingsCacheLocation() tspath.RootedDirectoryPath {
	return ""
}

func (h *mockModuleSpecifierGenerationHost) CommonSourceDirectory() tspath.RootedDirectoryPath {
	return h.currentDir
}

func (h *mockModuleSpecifierGenerationHost) ContentMapperExtensions() []string {
	return h.contentMapperExtensions
}

func (h *mockModuleSpecifierGenerationHost) GetProjectReferenceFromSource(path tspath.PathKey) *tsoptions.SourceOutputAndProjectReference {
	return nil
}

func (h *mockModuleSpecifierGenerationHost) GetRedirectTargets(path tspath.PathKey) []tspath.RootedFilePath {
	return nil
}

func (h *mockModuleSpecifierGenerationHost) GetSourceOfProjectReferenceIfOutputIncluded(file ast.HasFileName) tspath.RootedFilePath {
	return file.FileName()
}

func (h *mockModuleSpecifierGenerationHost) FileExists(path tspath.RootedFilePath) bool {
	h.fileExistsCalls = append(h.fileExistsCalls, path)
	if h.existingFiles != nil {
		return h.existingFiles[path]
	}
	return true // Mock implementation
}

func (h *mockModuleSpecifierGenerationHost) GetNearestAncestorDirectoryWithPackageJson(dirname tspath.RootedDirectoryPath) tspath.RootedDirectoryPath {
	return ""
}

func (h *mockModuleSpecifierGenerationHost) GetPackageJsonInfo(pkgJsonPath tspath.RootedFilePath) *packagejson.InfoCacheEntry {
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
				currentDir:      "/project",
				caseSensitivity: tspath.CaseSensitive,
				symlinkCache:    symlinks.NewKnownSymlinks(tspath.CaseSensitive),
			}

			result := GetEachFileNameOfModule(
				tspath.ToRootedFilePath(tt.importingFile, host.BaseDirectory()),
				tspath.ToRootedFilePath(tt.importedFile, host.BaseDirectory()),
				host,
				tt.preferSymlinks,
			)

			if len(result) != tt.expectedCount {
				t.Errorf("Expected %d paths, got %d", tt.expectedCount, len(result))
			}

			if tt.expectedPaths != nil {
				for i, expectedPath := range tt.expectedPaths {
					if i >= len(result) {
						t.Errorf("Expected path %d: %s, but result has only %d paths", i, expectedPath, len(result))
						continue
					}
					if result[i].FileName.AsString() != expectedPath {
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
		currentDir:      "/project",
		caseSensitivity: tspath.CaseSensitive,
		symlinkCache:    symlinks.NewKnownSymlinks(tspath.CaseSensitive),
	}

	symlinkPath := tspath.CaseSensitive.PathKey(tspath.RootedPathFromNormalized("/project/symlink"))
	realDirectory := &symlinks.KnownDirectoryLink{
		Real:     tspath.RootedDirectoryPathFromNormalized("/real/path"),
		RealPath: tspath.CaseSensitive.PathKey(tspath.RootedPathFromNormalized("/real/path")),
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

func TestModuleSpecifierContainsNodeModules(t *testing.T) {
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
			result := moduleSpecifierContainsNodeModules(tspath.ToModuleSpecifier(tt.path))
			if result != tt.expected {
				t.Errorf("moduleSpecifierContainsNodeModules(%q) = %v, expected %v", tt.path, result, tt.expected)
			}
		})
	}
}

func TestIsPackageMainFilePreservesDirectoryIntent(t *testing.T) {
	t.Parallel()
	packageRoot := tspath.RootedDirectoryPathFromNormalized("/project/node_modules/pkg")

	if isPackageMainFile(tspath.RootedFilePathFromNormalized("/project/node_modules/pkg/types.d.ts"), packageRoot, "./types/", "", tspath.CaseSensitive) {
		t.Fatal("slash-terminated package entrypoint must not match the sibling declaration file")
	}
	if !isPackageMainFile(tspath.RootedFilePathFromNormalized("/project/node_modules/pkg/types/index.d.ts"), packageRoot, "./types/", "", tspath.CaseSensitive) {
		t.Fatal("slash-terminated package entrypoint should match its index declaration")
	}
	if !isPackageMainFile(tspath.RootedFilePathFromNormalized("/project/node_modules/pkg/types.d.ts"), packageRoot, "./types", "", tspath.CaseSensitive) {
		t.Fatal("extensionless package entrypoint should match the declaration file")
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
			result := containsIgnoredPath(tspath.RootedFilePathFromNormalized(tt.path))
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

func TestProcessEndingChecksRootedFilePath(t *testing.T) {
	t.Parallel()
	host := &mockModuleSpecifierGenerationHost{
		currentDir:      "/wrong",
		caseSensitivity: tspath.CaseSensitive,
		existingFiles: map[tspath.RootedFilePath]bool{
			"/project/src/lib.ts": true,
		},
	}

	result := processEnding(
		"./lib/index.ts",
		"/project/src/lib/index.ts",
		[]ModuleSpecifierEnding{ModuleSpecifierEndingMinimal},
		&core.CompilerOptions{},
		host,
	)
	if result != "./lib/index" {
		t.Fatalf("processEnding() = %q, expected %q", result, "./lib/index")
	}
	if !slices.Contains(host.fileExistsCalls, tspath.RootedFilePathFromNormalized("/project/src/lib.ts")) {
		t.Fatalf("FileExists calls = %v, expected a lookup for /project/src/lib.ts", host.fileExistsCalls)
	}
}

func TestIsPathRelativeToParent(t *testing.T) {
	t.Parallel()
	tests := []struct {
		path     tspath.RelativePath
		expected bool
	}{
		{path: "..", expected: true},
		{path: "../sibling.ts", expected: true},
		{path: "..foo.ts", expected: false},
		{path: "child/..foo.ts", expected: false},
	}

	for _, test := range tests {
		if actual := isPathRelativeToParent(test.path); actual != test.expected {
			t.Errorf("isPathRelativeToParent(%q) = %v, expected %v", test.path, actual, test.expected)
		}
	}
}

func TestTryGetModuleNameFromExportsOrImports(t *testing.T) {
	t.Parallel()
	t.Run("trailing separator target", func(t *testing.T) {
		t.Parallel()

		exports := packagejson.ExportsOrImports{
			JSONValue: packagejson.JSONValue{
				Type:  packagejson.JSONValueTypeString,
				Value: "./dist/internal/",
			},
		}
		host := &mockModuleSpecifierGenerationHost{caseSensitivity: tspath.CaseSensitive}
		if result := tryGetModuleNameFromExportsOrImports(
			&core.CompilerOptions{},
			host,
			"/pkg/dist/internal/file.ts",
			"/pkg",
			"#internal/",
			exports,
			nil,
			MatchingModeDirectory,
			true,
			false,
		); result == "" {
			t.Fatal("directory target with a trailing separator should match")
		}
		if result := tryGetModuleNameFromExportsOrImports(
			&core.CompilerOptions{},
			host,
			"/pkg/dist/internal/file.ts",
			"/pkg",
			"#internal",
			exports,
			nil,
			MatchingModeExact,
			true,
			false,
		); result != "" {
			t.Fatalf("exact target with a trailing separator matched as %q", result)
		}
	})

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
					tspath.RootedFilePathFromNormalized(tt.targetFilePath),
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
}

package modulespecifiers

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/packagejson"
	"github.com/microsoft/typescript-go/internal/symlinks"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// Mock host for testing
type mockModuleSpecifierGenerationHost struct {
	currentDir                string
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

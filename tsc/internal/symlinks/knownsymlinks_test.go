package symlinks

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func TestNewKnownSymlink(t *testing.T) {
	t.Parallel()
	cache := NewKnownSymlinks(tspath.CaseSensitive)
	if cache == nil {
		t.Fatal("Expected non-nil cache")
	}
	if cache.caseSensitivity != tspath.CaseSensitive {
		t.Error("expected CaseSensitivity to be CaseSensitive")
	}
}

func TestSetDirectory(t *testing.T) {
	t.Parallel()
	cache := NewKnownSymlinks(tspath.CaseSensitive)
	symlinkPath := tspath.CaseSensitive.PathKey(tspath.RootedPathFromNormalized("/test/symlink"))
	realDirectory := &KnownDirectoryLink{
		Real:     tspath.RootedDirectoryPathFromNormalized("/real/path"),
		RealPath: tspath.CaseSensitive.PathKey(tspath.RootedPathFromNormalized("/real/path")),
	}

	cache.SetDirectory("/test/symlink", symlinkPath, realDirectory)

	// Check that directory was stored
	stored, ok := cache.Directories().Load(symlinkPath)
	if !ok {
		t.Fatal("Expected directory to be stored")
	}
	if stored.Real != realDirectory.Real {
		t.Errorf("Expected Real to be '%s', got '%s'", realDirectory.Real, stored.Real)
	}
	if stored.RealPath != realDirectory.RealPath {
		t.Errorf("Expected RealPath to be '%s', got '%s'", realDirectory.RealPath, stored.RealPath)
	}
	if stored.Symlink != tspath.RootedDirectoryPathFromNormalized("/test/symlink") {
		t.Errorf("Expected Symlink to preserve '/test/symlink', got '%s'", stored.Symlink)
	}

	// Check that realpath mapping was created
	set, ok := cache.DirectoriesByRealpath().Load(realDirectory.RealPath)
	if !ok || set.Size() == 0 {
		t.Fatal("Expected realpath mapping to be created")
	}
	if !set.Has("/test/symlink") {
		t.Error("Expected symlink '/test/symlink' to be in set")
	}
}

func TestKnownDirectoryLinkPreservesChildSpelling(t *testing.T) {
	t.Parallel()

	cache := NewKnownSymlinks(tspath.CaseInsensitive)
	symlink := tspath.RootedDirectoryPathFromNormalized("/Project/Node_Modules/pkg")
	symlinkPath := tspath.CaseInsensitive.PathKey(symlink.AsPath())
	cache.SetDirectory(symlink, symlinkPath, &KnownDirectoryLink{
		Real:     tspath.RootedDirectoryPathFromNormalized("/Real/Package"),
		RealPath: tspath.PathKeyFromCanonical("/real/package"),
	})

	link, ok := cache.Directories().Load(symlinkPath)
	if !ok {
		t.Fatal("Expected directory link")
	}
	resolved, ok := link.ResolveFilePath(
		tspath.RootedFilePathFromNormalized("/PROJECT/node_modules/pkg/Src/File.ts"),
		tspath.CaseInsensitive,
	)
	if !ok {
		t.Fatal("Expected child path to resolve through directory link")
	}
	if resolved != tspath.RootedFilePathFromNormalized("/Real/Package/Src/File.ts") {
		t.Errorf("Expected child spelling to be preserved, got '%s'", resolved)
	}
}

func TestSetFile(t *testing.T) {
	t.Parallel()
	cache := NewKnownSymlinks(tspath.CaseSensitive)
	symlink := tspath.RootedFilePathFromNormalized("/test/symlink/file.ts")
	symlinkPath := tspath.CaseSensitive.PathKey(tspath.RootedPath(symlink))
	realpath := tspath.RootedFilePathFromNormalized("/real/path/file.ts")

	cache.SetFile(symlink, symlinkPath, realpath)

	stored, ok := cache.Files().Load(symlinkPath)
	if !ok {
		t.Fatal("Expected file to be stored")
	}
	if stored != realpath {
		t.Errorf("Expected realpath to be '%s', got '%s'", realpath, stored)
	}
}

func TestProcessResolution(t *testing.T) {
	t.Parallel()
	cache := NewKnownSymlinks(tspath.CaseSensitive)

	// Test with empty paths
	cache.ProcessResolution("", "")
	cache.ProcessResolution(tspath.RootedFilePathFromNormalized("/original"), "")
	cache.ProcessResolution("", tspath.RootedFilePathFromNormalized("/resolved"))

	// Test with valid paths
	originalPath := tspath.RootedFilePathFromNormalized("/test/original/file.ts")
	resolvedPath := tspath.RootedFilePathFromNormalized("/test/resolved/file.ts")
	cache.ProcessResolution(originalPath, resolvedPath)

	// Check that file was stored
	symlinkPath := tspath.CaseSensitive.PathKey(tspath.RootedPath(originalPath))
	stored, ok := cache.Files().Load(symlinkPath)
	if !ok {
		t.Fatal("Expected file to be stored")
	}
	if stored != resolvedPath {
		t.Errorf("Expected resolved path to be '%s', got '%s'", resolvedPath, stored)
	}
}

func TestGuessDirectorySymlink(t *testing.T) {
	t.Parallel()
	cache := NewKnownSymlinks(tspath.CaseSensitive)

	tests := []struct {
		name     string
		a        string
		b        string
		cwd      string
		expected [2]string // [commonResolved, commonOriginal]
	}{
		{
			name:     "identical paths",
			a:        "/test/path/file.ts",
			b:        "/test/path/file.ts",
			cwd:      "/test/dir",
			expected: [2]string{"/", "/"},
		},
		{
			name:     "different files same directory",
			a:        "/test/path/file1.ts",
			b:        "/test/path/file2.ts",
			cwd:      "/test/dir",
			expected: [2]string{"", ""},
		},
		{
			name:     "different directories",
			a:        "/test/path1/file.ts",
			b:        "/test/path2/file.ts",
			cwd:      "/test/dir",
			expected: [2]string{"/test/path1", "/test/path2"},
		},
		{
			name:     "node_modules paths",
			a:        "/test/node_modules/pkg/file.ts",
			b:        "/test/node_modules/pkg/file.ts",
			cwd:      "/test/dir",
			expected: [2]string{"/test/node_modules/pkg", "/test/node_modules/pkg"},
		},
		{
			name:     "scoped package paths",
			a:        "/test/node_modules/@scope/pkg/file.ts",
			b:        "/test/node_modules/@scope/pkg/file.ts",
			cwd:      "/test/dir",
			expected: [2]string{"/test/node_modules/@scope/pkg", "/test/node_modules/@scope/pkg"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			currentDirectory := tspath.RootedDirectoryPathFromNormalized(tt.cwd)
			commonResolved, commonOriginal := cache.guessDirectorySymlinkFromFilePaths(
				tspath.ToRootedFilePath(tt.a, currentDirectory),
				tspath.ToRootedFilePath(tt.b, currentDirectory),
			)
			if commonResolved.AsString() != tt.expected[0] {
				t.Errorf("Expected commonResolved to be '%s', got '%s'", tt.expected[0], commonResolved)
			}
			if commonOriginal.AsString() != tt.expected[1] {
				t.Errorf("Expected commonOriginal to be '%s', got '%s'", tt.expected[1], commonOriginal)
			}
		})
	}
}

func TestIsNodeModulesOrScopedPackageDirectory(t *testing.T) {
	t.Parallel()
	cache := NewKnownSymlinks(tspath.CaseSensitive)

	tests := []struct {
		name     string
		dir      string
		expected bool
	}{
		{"node_modules", "node_modules", true},
		{"scoped package", "@scope", true},
		{"regular directory", "src", false},
		{"empty string", "", false},
		{"case insensitive node_modules", "NODE_MODULES", false}, // The function is case sensitive
		{"case insensitive scoped", "@SCOPE", true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			result := cache.isNodeModulesOrScopedPackageDirectory(tt.dir)
			if result != tt.expected {
				t.Errorf("Expected %v, got %v for directory '%s'", tt.expected, result, tt.dir)
			}
		})
	}
}

func TestSetSymlinksFromResolutions(t *testing.T) {
	t.Parallel()
	cache := NewKnownSymlinks(tspath.CaseSensitive)

	// Mock resolution data
	resolvedModules := []struct {
		originalPath string
		resolvedPath string
		moduleName   string
		mode         core.ResolutionMode
		filePath     tspath.PathKey
	}{
		{
			originalPath: "/test/original/file1.ts",
			resolvedPath: "/test/resolved/file1.ts",
			moduleName:   "module1",
			mode:         core.ResolutionModeNone,
			filePath:     tspath.CaseSensitive.PathKey(tspath.RootedPathFromNormalized("/test/source.ts")),
		},
		{
			originalPath: "/test/original/file2.ts",
			resolvedPath: "/test/resolved/file2.ts",
			moduleName:   "module2",
			mode:         core.ResolutionModeNone,
			filePath:     tspath.CaseSensitive.PathKey(tspath.RootedPathFromNormalized("/test/source.ts")),
		},
	}

	// Mock callbacks
	forEachResolvedModule := func(callback func(resolution *module.ResolvedModule, moduleName string, mode core.ResolutionMode, filePath tspath.PathKey), file *ast.SourceFile) {
		for _, res := range resolvedModules {
			resolution := &module.ResolvedModule{
				OriginalPath:     tspath.RootedFilePathFromAbsolute(res.originalPath),
				ResolvedFileName: tspath.RootedFilePathFromAbsolute(res.resolvedPath),
			}
			callback(resolution, res.moduleName, res.mode, res.filePath)
		}
	}

	forEachResolvedTypeReferenceDirective := func(callback func(resolution *module.ResolvedTypeReferenceDirective, moduleName string, mode core.ResolutionMode, filePath tspath.PathKey), file *ast.SourceFile) {
		// No type reference directives for this test
	}

	cache.SetSymlinksFromResolutions(forEachResolvedModule, forEachResolvedTypeReferenceDirective)

	// Check that files were stored
	for _, res := range resolvedModules {
		symlinkPath := tspath.CaseSensitive.PathKey(tspath.RootedPathFromNormalized(res.originalPath))
		stored, ok := cache.Files().Load(symlinkPath)
		if !ok {
			t.Errorf("Expected file '%s' to be stored", res.originalPath)
			continue
		}
		if stored.AsString() != res.resolvedPath {
			t.Errorf("Expected resolved path to be '%s', got '%s'", res.resolvedPath, stored)
		}
	}
}

func TestKnownSymlinksThreadSafety(t *testing.T) {
	t.Parallel()
	cache := NewKnownSymlinks(tspath.CaseSensitive)

	// Test concurrent access
	done := make(chan bool, 10)

	for i := range 10 {
		go func(id int) {
			defer func() { done <- true }()

			symlinkPath := tspath.CaseSensitive.PathKey(tspath.RootedPathFromNormalized("/test/symlink" + string(rune(id))))
			realDirectory := &KnownDirectoryLink{
				Real:     tspath.RootedDirectoryPathFromAbsolute("/real/path" + string(rune(id))),
				RealPath: tspath.CaseSensitive.PathKey(tspath.RootedPathFromNormalized("/real/path" + string(rune(id)))),
			}

			cache.SetDirectory(tspath.RootedDirectoryPathFromNormalized("/test/symlink"+string(rune(id))), symlinkPath, realDirectory)

			// Read back
			stored, ok := cache.Directories().Load(symlinkPath)
			if !ok {
				t.Errorf("Goroutine %d: Expected directory to be stored", id)
				return
			}
			if stored.Real != realDirectory.Real {
				t.Errorf("Goroutine %d: Expected Real to be '%s', got '%s'", id, realDirectory.Real, stored.Real)
			}
		}(i)
	}

	// Wait for all goroutines to complete
	for range 10 {
		<-done
	}

	// Verify all directories were stored
	if cache.Directories().Size() != 10 {
		t.Errorf("Expected 10 directories to be stored, got %d", cache.Directories().Size())
	}
}

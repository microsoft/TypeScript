package autoimport

import (
	"reflect"
	"testing"

	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestWordIndices(t *testing.T) {
	t.Parallel()
	tests := []struct {
		input         string
		expectedWords []string
	}{
		// Basic camelCase
		{
			input:         "camelCase",
			expectedWords: []string{"camelCase", "Case"},
		},
		// snake_case
		{
			input:         "snake_case",
			expectedWords: []string{"snake_case", "case"},
		},
		// ParseURL - uppercase sequence followed by lowercase
		{
			input:         "ParseURL",
			expectedWords: []string{"ParseURL", "URL"},
		},
		// XMLHttpRequest - multiple uppercase sequences
		{
			input:         "XMLHttpRequest",
			expectedWords: []string{"XMLHttpRequest", "HttpRequest", "Request"},
		},
		// Single word lowercase
		{
			input:         "hello",
			expectedWords: []string{"hello"},
		},
		// Single word uppercase
		{
			input:         "HELLO",
			expectedWords: []string{"HELLO"},
		},
		// Mixed with numbers
		{
			input:         "parseHTML5Parser",
			expectedWords: []string{"parseHTML5Parser", "HTML5Parser", "Parser"},
		},
		// Underscore variations
		{
			input:         "__proto__",
			expectedWords: []string{"__proto__", "proto__"},
		},
		{
			input:         "_private_member",
			expectedWords: []string{"_private_member", "member"},
		},
		// Single character
		{
			input:         "a",
			expectedWords: []string{"a"},
		},
		{
			input:         "A",
			expectedWords: []string{"A"},
		},
		// Consecutive underscores
		{
			input:         "test__double__underscore",
			expectedWords: []string{"test__double__underscore", "double__underscore", "underscore"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			t.Parallel()
			indices := wordIndices(tt.input)

			// Convert indices to actual word slices for comparison
			var actualWords []string
			for _, idx := range indices {
				actualWords = append(actualWords, tt.input[idx:])
			}

			if !reflect.DeepEqual(actualWords, tt.expectedWords) {
				t.Errorf("wordIndices(%q) produced words %v, want %v", tt.input, actualWords, tt.expectedWords)
			}
		})
	}
}

// TestGetPackageRealpathFuncs_FollowsNodeModulesSymlinks tests that toRealpath correctly
// follows symlinks for files outside the package directory (e.g. node_modules entries).
// Without this, the module resolver uses unresolved symlink paths as cache keys, causing
// the same file to be loaded multiple times and triggering massive memory usage when
// barrel files re-export from many symlinked packages (issue #2780).
func TestGetPackageRealpathFuncs_FollowsNodeModulesSymlinks(t *testing.T) {
	t.Parallel()

	// Simulate a layout where the package directory is itself a symlink (e.g. Bazel's
	// convenience symlinks or pnpm's virtual store):
	//   /symlink-bin/pkg/              -> symlink to /real/bin/pkg/
	//   /real/bin/pkg/node_modules/dep -> symlink to /real/dep/
	//
	// When toRealpath is used as the module resolver's Realpath, it must follow
	// the node_modules symlink so that /real/bin/pkg/node_modules/dep/index.d.ts
	// resolves to /real/dep/index.d.ts — otherwise the same dep file gets different
	// cache keys depending on which path it was reached through.
	fs := vfstest.FromMap(map[string]any{
		"/symlink-bin/pkg":                vfstest.Symlink("/real/bin/pkg"),
		"/real/bin/pkg/index.d.ts":        "export declare const a: number;",
		"/real/bin/pkg/node_modules/dep":  vfstest.Symlink("/real/dep"),
		"/real/dep/index.d.ts":            "export declare const b: number;",
		"/real/dep/src/utils/helper.d.ts": "export declare const c: number;",
	}, true)

	toRealpath, _ := getPackageRealpathFuncs(fs, "/symlink-bin/pkg")

	// Files inside the package should be converted via string replacement (fast path).
	assert.Equal(t,
		toRealpath("/symlink-bin/pkg/index.d.ts"),
		"/real/bin/pkg/index.d.ts",
		"package files should be converted via prefix replacement",
	)

	// Files outside the package (e.g. node_modules symlinks) should be resolved via
	// fs.Realpath so the cache key is the canonical realpath, not the symlink path.
	assert.Equal(t,
		toRealpath("/real/bin/pkg/node_modules/dep/index.d.ts"),
		"/real/dep/index.d.ts",
		"node_modules symlinks must be followed so the same file gets a consistent cache key",
	)

	// Files in subdirectories of an already-resolved external package should
	// use the cached prefix mapping without additional realpath calls.
	assert.Equal(t,
		toRealpath("/real/bin/pkg/node_modules/dep/src/utils/helper.d.ts"),
		"/real/dep/src/utils/helper.d.ts",
		"subdirectories of a resolved external package should use cached prefix mapping",
	)
}

// TestGetPackageRealpathFuncs_DuplicateCacheKeys demonstrates how the broken toRealpath
// causes the same physical file to get different cache keys when reached through different
// symlink paths. In pnpm/Bazel monorepos, multiple packages may have node_modules symlinks
// that point to the same physical dependency. Because toRealpath doesn't follow symlinks
// for files outside the package directory, each path is treated as distinct, leading to
// duplicate file loads and memory bloat (issue #2780).
func TestGetPackageRealpathFuncs_DuplicateCacheKeys(t *testing.T) {
	t.Parallel()

	// Simulate two packages (app-a, app-b) that each have a node_modules symlink to
	// the same shared dependency. This is a typical pnpm/Bazel layout:
	//   /workspace/packages/app-a/              -> symlink to /store/app-a/
	//   /workspace/packages/app-b/              -> symlink to /store/app-b/
	//   /store/app-a/node_modules/shared-lib    -> symlink to /store/shared-lib/
	//   /store/app-b/node_modules/shared-lib    -> symlink to /store/shared-lib/
	fs := vfstest.FromMap(map[string]any{
		"/workspace/packages/app-a":            vfstest.Symlink("/store/app-a"),
		"/workspace/packages/app-b":            vfstest.Symlink("/store/app-b"),
		"/store/app-a/index.d.ts":              "export declare const a: number;",
		"/store/app-b/index.d.ts":              "export declare const b: number;",
		"/store/app-a/node_modules/shared-lib": vfstest.Symlink("/store/shared-lib"),
		"/store/app-b/node_modules/shared-lib": vfstest.Symlink("/store/shared-lib"),
		"/store/shared-lib/index.d.ts":         "export declare const shared: string;",
	}, true)

	toRealpathA, _ := getPackageRealpathFuncs(fs, "/workspace/packages/app-a")
	toRealpathB, _ := getPackageRealpathFuncs(fs, "/workspace/packages/app-b")

	sharedFileViaA := "/store/app-a/node_modules/shared-lib/index.d.ts"
	sharedFileViaB := "/store/app-b/node_modules/shared-lib/index.d.ts"

	resolvedA := toRealpathA(sharedFileViaA)
	resolvedB := toRealpathB(sharedFileViaB)

	// Both should resolve to the same canonical realpath so the module resolver
	// uses a single cache key for the shared dependency, avoiding duplicate loads.
	expectedRealpath := "/store/shared-lib/index.d.ts"
	assert.Equal(t, resolvedA, expectedRealpath,
		"app-a's toRealpath should follow the node_modules symlink to the realpath")
	assert.Equal(t, resolvedB, expectedRealpath,
		"app-b's toRealpath should follow the node_modules symlink to the realpath")
}

// TestGetPackageRealpathFuncs_NonSymlinkedPackageWithSymlinkedDeps tests that even when the
// package directory itself is NOT a symlink, toRealpath still follows symlinks for files
// outside the package (e.g. re-exports reaching into symlinked node_modules dependencies).
func TestGetPackageRealpathFuncs_NonSymlinkedPackageWithSymlinkedDeps(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]any{
		"/real/my-pkg/index.d.ts":       "export declare const a: number;",
		"/real/my-pkg/node_modules/dep": vfstest.Symlink("/real/dep"),
		"/real/dep/index.d.ts":          "export declare const b: number;",
	}, true)

	toRealpath, _ := getPackageRealpathFuncs(fs, "/real/my-pkg")

	// Files inside the (non-symlinked) package should be returned unchanged.
	assert.Equal(t,
		toRealpath("/real/my-pkg/index.d.ts"),
		"/real/my-pkg/index.d.ts",
	)

	// Files outside the package reached via symlinked node_modules should still be resolved.
	assert.Equal(t,
		toRealpath("/real/my-pkg/node_modules/dep/index.d.ts"),
		"/real/dep/index.d.ts",
		"symlinked deps must be resolved even when the package dir itself is not a symlink",
	)
}

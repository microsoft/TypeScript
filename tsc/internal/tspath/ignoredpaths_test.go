package tspath

import (
	"testing"
)

func TestContainsIgnoredPath(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name     string
		path     string
		expected bool
	}{
		{
			name:     "node_modules dot path",
			path:     "/project/node_modules/.pnpm/file.ts",
			expected: true,
		},
		{
			name:     "git directory",
			path:     "/project/.git/hooks/pre-commit",
			expected: true,
		},
		{
			name:     "emacs lock file",
			path:     "/project/src/file.ts.#",
			expected: true,
		},
		{
			name:     "regular file path",
			path:     "/project/src/file.ts",
			expected: false,
		},
		{
			name:     "node_modules without dot",
			path:     "/project/node_modules/lodash/index.js",
			expected: false,
		},
		{
			name:     "empty path",
			path:     "",
			expected: false,
		},
		{
			name:     "path with multiple ignored patterns",
			path:     "/project/node_modules/.pnpm/.git/.#file.ts",
			expected: true,
		},
		{
			name:     "case sensitive test",
			path:     "/project/NODE_MODULES/.PNPM/file.ts",
			expected: false, // Should be case sensitive
		},
		{
			name:     "path with ignored pattern in middle",
			path:     "/project/src/node_modules/.pnpm/dist/file.js",
			expected: true,
		},
		{
			name:     "path with ignored pattern at end",
			path:     "/project/src/file.ts.#",
			expected: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			result := ContainsIgnoredPath(tt.path)
			if result != tt.expected {
				t.Errorf("ContainsIgnoredPath(%q) = %v, expected %v", tt.path, result, tt.expected)
			}
		})
	}
}

func TestIgnoredPathsPatterns(t *testing.T) {
	t.Parallel()
	// Test that all expected patterns are present
	expectedPatterns := []string{"/node_modules/.", "/.git", ".#"}

	for _, pattern := range expectedPatterns {
		testPath := "/test" + pattern + "/file.ts"
		if !ContainsIgnoredPath(testPath) {
			t.Errorf("Expected pattern '%s' to be detected in path '%s'", pattern, testPath)
		}
	}
}

func TestIgnoredPathsEdgeCases(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name     string
		path     string
		expected bool
	}{
		{
			name:     "pattern at start",
			path:     "/node_modules./file.ts",
			expected: false, // Pattern is "/node_modules/." not "/node_modules."
		},
		{
			name:     "pattern at end",
			path:     "/project/file.ts.#",
			expected: true,
		},
		{
			name:     "multiple occurrences",
			path:     "/project/.git/node_modules./.git/file.ts",
			expected: true,
		},
		{
			name:     "no slashes",
			path:     "node_modules.file.ts",
			expected: false,
		},
		{
			name:     "single slash",
			path:     "/file.ts",
			expected: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			result := ContainsIgnoredPath(tt.path)
			if result != tt.expected {
				t.Errorf("ContainsIgnoredPath(%q) = %v, expected %v", tt.path, result, tt.expected)
			}
		})
	}
}

package tspath_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestUntitledPathHandling(t *testing.T) {
	t.Parallel()
	// Test that untitled paths are treated as rooted
	untitledPath := "^/untitled/ts-nul-authority/Untitled-2"

	// GetEncodedRootLength should return 2 for "^/"
	rootLength := tspath.GetEncodedRootLength(untitledPath)
	assert.Equal(t, rootLength, 2, "GetEncodedRootLength should return 2 for untitled paths")

	// IsRootedDiskPath should return true
	isRooted := tspath.IsRootedDiskPath(untitledPath)
	assert.Assert(t, isRooted, "IsRootedDiskPath should return true for untitled paths")

	// ToPath should not resolve untitled paths against current directory
	currentDir := "/home/user/project"
	path := tspath.ToPath(untitledPath, currentDir, true)
	// The path should be the original untitled path
	assert.Equal(t, string(path), "^/untitled/ts-nul-authority/Untitled-2", "ToPath should not resolve untitled paths against current directory")

	// Test GetNormalizedAbsolutePath doesn't resolve untitled paths
	normalized := tspath.GetNormalizedAbsolutePath(untitledPath, currentDir)
	assert.Equal(t, normalized, "^/untitled/ts-nul-authority/Untitled-2", "GetNormalizedAbsolutePath should not resolve untitled paths")
}

func TestUntitledPathEdgeCases(t *testing.T) {
	t.Parallel()
	// Test edge cases
	testCases := []struct {
		path     string
		expected int
		isRooted bool
	}{
		{"^/", 2, true}, // Minimal untitled path
		{"^/untitled/ts-nul-authority/test", 2, true}, // Normal untitled path
		{"^", 0, false},   // Just ^ is not rooted
		{"^x", 0, false},  // ^x is not untitled
		{"^^/", 0, false}, // ^^/ is not untitled
		{"x^/", 0, false}, // x^/ is not untitled (doesn't start with ^)
		{"^/untitled/ts-nul-authority/path/with/deeper/structure", 2, true}, // Deeper path
	}

	for _, tc := range testCases {
		t.Run(tc.path, func(t *testing.T) {
			t.Parallel()
			rootLength := tspath.GetEncodedRootLength(tc.path)
			assert.Equal(t, rootLength, tc.expected, "GetEncodedRootLength for path %s", tc.path)

			isRooted := tspath.IsRootedDiskPath(tc.path)
			assert.Equal(t, isRooted, tc.isRooted, "IsRootedDiskPath for path %s", tc.path)
		})
	}
}

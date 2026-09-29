package tspath

import (
	"testing"

	"gotest.tools/v3/assert"
)

// CombinePaths' fast paths must be pure shortcuts of combinePathsSlow, which is
// the unmodified pre-fast-path implementation. This test compares the two
// directly over all combinations of representative path pieces.

var combinePathsPieces = []string{
	"", "/", "a", "a/b", "/abs", "/abs/child", "c:/drive", "c:relative",
	"..", "../up", ".", "./same", "file:///url", "with\\backslash", "\\\\server\\share",
	"trailing/", "/trailing/", "//",
}

func TestCombinePathsMatchesSlowPath(t *testing.T) {
	t.Parallel()

	// All (first), (first, p1), and (first, p1, p2) combinations.
	for _, first := range combinePathsPieces {
		got := CombinePaths(first)
		want := combinePathsSlow(first, nil)
		assert.Equal(t, got, want, "CombinePaths(%q)", first)
		for _, p1 := range combinePathsPieces {
			got := CombinePaths(first, p1)
			want := combinePathsSlow(first, []string{p1})
			assert.Equal(t, got, want, "CombinePaths(%q, %q)", first, p1)
			for _, p2 := range combinePathsPieces {
				got := CombinePaths(first, p1, p2)
				want := combinePathsSlow(first, []string{p1, p2})
				assert.Equal(t, got, want, "CombinePaths(%q, %q, %q)", first, p1, p2)
			}
		}
	}
}

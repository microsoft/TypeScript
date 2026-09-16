package stringutil

import "testing"

func TestCompareStringsCaseInsensitive(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name     string
		a, b     string
		expected Comparison
	}{
		// Case-insensitive comparison folds to uppercase (see the doc comment on
		// CompareStringsCaseInsensitiveEslintCompatible), so '_' (0x5F) and the other
		// characters in 0x5B-0x60 sort AFTER letters, which fold into 0x41-0x5A. This is
		// the exact ordering the comment calls out for "__String" and "Foo".
		{name: "underscore sorts after letter", a: "__String", b: "Foo", expected: ComparisonGreaterThan},
		{name: "letter sorts before underscore", a: "Foo", b: "__String", expected: ComparisonLessThan},
		{name: "leading underscore after letter", a: "_foo", b: "Zoo", expected: ComparisonGreaterThan},
		{name: "letter before leading underscore", a: "Zoo", b: "_foo", expected: ComparisonLessThan},
		// Ordering of pure letters is independent of fold direction.
		{name: "letters less than", a: "abc", b: "ABD", expected: ComparisonLessThan},
		{name: "letters greater than", a: "ABD", b: "abc", expected: ComparisonGreaterThan},
		{name: "equal ignoring case", a: "same", b: "SAME", expected: ComparisonEqual},
		{name: "identical", a: "Foo", b: "Foo", expected: ComparisonEqual},
		{name: "prefix is less", a: "foo", b: "foobar", expected: ComparisonLessThan},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			if got := CompareStringsCaseInsensitive(tt.a, tt.b); got != tt.expected {
				t.Fatalf("CompareStringsCaseInsensitive(%q, %q) = %d, expected %d", tt.a, tt.b, got, tt.expected)
			}
		})
	}
}

// The default case-insensitive comparer folds to uppercase while the eslint-compatible
// variant folds to lowercase, so the two disagree on the relative order of "__String" and
// "Foo". Locking that contrast guards against the two implementations converging by mistake.
func TestCompareStringsCaseInsensitiveDiffersFromEslintCompatible(t *testing.T) {
	t.Parallel()
	if got := CompareStringsCaseInsensitive("__String", "Foo"); got != ComparisonGreaterThan {
		t.Fatalf("CompareStringsCaseInsensitive(%q, %q) = %d, expected %d", "__String", "Foo", got, ComparisonGreaterThan)
	}
	if got := CompareStringsCaseInsensitiveEslintCompatible("__String", "Foo"); got != ComparisonLessThan {
		t.Fatalf("CompareStringsCaseInsensitiveEslintCompatible(%q, %q) = %d, expected %d", "__String", "Foo", got, ComparisonLessThan)
	}
}

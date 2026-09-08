package fswatch

import "testing"

func TestPathComparerExactKeys(t *testing.T) {
	t.Parallel()
	c := PathComparer{}
	for _, path := range []string{"/A/File.ts", "/straße/İ.ts", "/cafe\u0301.ts", "/bad\xff.ts"} {
		if got := c.Key(path); got != path {
			t.Fatalf("Key(%q) = %q", path, got)
		}
	}
	if _, ok := c.Rebase("/A/file.ts", "/a", "/target"); ok {
		t.Fatal("zero comparer must use exact matching")
	}
	if got, ok := c.Rebase("/a/file.ts", "/a", "/target"); !ok || got != "/target/file.ts" {
		t.Fatalf("Rebase = %q, %v", got, ok)
	}
}

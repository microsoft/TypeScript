package ls

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

// TestTryRemoveDirectoryPrefixCaseFoldingShrinksPrefix reproduces a panic that used to occur
// when tryRemoveDirectoryPrefix confirmed a case-insensitive directory match via
// canonicalization, then sliced the raw (non-canonicalized) path using the raw byte length
// of prefix. Each Kelvin sign '\u212A' below case-folds to the single-byte 'k', so the raw
// prefix is longer in bytes (15) than path (12), even though path's canonical form is
// case-insensitively prefixed by prefix's canonical form. Slicing path[len(prefix):] used to
// panic with "slice bounds out of range [15:12]"; tryRemoveDirectoryPrefix must instead trim by
// rune count via CaseSensitivity.TrimPrefix.
func TestTryRemoveDirectoryPrefixCaseFoldingShrinksPrefix(t *testing.T) {
	t.Parallel()

	prefix := "/a/\u212A\u212A\u212A\u212A"
	path := "/a/kkkk/x.ts"
	actual := tryRemoveDirectoryPrefix(path, prefix, tspath.CaseInsensitive)
	if actual == nil {
		t.Fatal("expected a non-nil result")
	}
	assert.Equal(t, *actual, "x.ts")
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickinfoVerbosityNoErrorTruncation1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noErrorTruncation: true
type /*1*/T = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  'still good', 'now truncating'
];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"1": {0, 1}})
}

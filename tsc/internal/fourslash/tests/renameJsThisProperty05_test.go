package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestRenameJsThisProperty05(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: a.js
class C {
  constructor(y) {
    this.x = y;
  }
}
[|C.prototype.[|{| "contextRangeIndex": 0 |}z|] = 1;|]
var t = new C(12);
[|t.[|{| "contextRangeIndex": 2 |}z|] = 11;|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineRenameAtRangesWithText(t, nil /*preferences*/, "z")
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameJsThisProperty06(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: a.js
var C = class {
  constructor(y) {
    this.x = y;
  }
}
[|C.prototype.[|{| "contextRangeIndex": 0 |}z|] = 1;|]
var t = new C(12);
[|t.[|{| "contextRangeIndex": 2 |}z|] = 11;|]`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineRenameAtRangesWithText(t, nil /*preferences*/, "z")
}

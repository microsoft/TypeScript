package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameJsThisProperty03(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: a.js
class C {
  constructor(y) {
    [|this.[|{| "contextRangeIndex": 0 |}x|] = y;|]
  }
}
var t = new C(12);
[|t.[|{| "contextRangeIndex": 2 |}x|] = 11;|]`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineRenameAtRangesWithText(t, nil /*preferences*/, "x")
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameCrossJsTs01(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: a.js
[|exports.[|{| "contextRangeIndex": 0 |}area|] = function (r) { return r * r; }|]
// @Filename: b.ts
[|import { [|{| "contextRangeIndex": 2 |}area|] } from './a';|]
var t = [|area|](10);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[1], f.Ranges()[3], f.Ranges()[4])
}

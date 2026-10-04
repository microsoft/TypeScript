package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestRenameLocationsForFunctionExpression02(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function f() {

}
var x = [|function [|{| "contextRangeIndex": 0 |}f|](g: any, h: any) {

    let helper = function f(): any { f(); }

    let foo = () => [|f|]([|f|], g);
}|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineRenameAtRangesWithText(t, nil /*preferences*/, "f")
}

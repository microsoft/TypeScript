package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenamePropertyAccessExpressionHeritageClause(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class B {}
function foo() {
    return {[|[|{| "contextRangeIndex": 0 |}B|]: B|]};
}
class C extends (foo()).[|B|] {}
class C1 extends foo().[|B|] {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineRenameAtRangesWithText(t, nil /*preferences*/, "B")
}

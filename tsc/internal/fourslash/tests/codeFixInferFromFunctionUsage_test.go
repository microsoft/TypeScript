package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixInferFromFunctionUsage(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @stableTypeOrdering: true
// @noImplicitAny: true
function wrap( [| arr |] ) {
     arr.other(function (a: number, b: number) { return a < b ? -1 : 1 });
 }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyRangeAfterCodeFix(t, `arr: { other: (arg0: (a: number, b: number) => -1 | 1) => void; }`, false, 0, 0)
}

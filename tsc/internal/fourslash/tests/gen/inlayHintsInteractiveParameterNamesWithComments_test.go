package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestInlayHintsInteractiveParameterNamesWithComments(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const fn = (x: any) => { }
fn(/* nobody knows exactly what this param is */ 42);
function foo (aParameter: number, bParameter: number, cParameter: number) { }
foo(
    /** aParameter */
    1,
    // bParameter
    2,
    /* cParameter */
    3
)
foo(
    /** multiple comments */
    /** aParameter */
    1,
    /** bParameter */
    /** multiple comments */
    2,
    // cParameter
    /** multiple comments */
    3
)
foo(
    /** wrong name */
    1,
    2,
    /** multiple */
    /** wrong */
    /** name */
    3
)`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{InlayHints: lsutil.InlayHintsPreferences{IncludeInlayParameterNameHints: lsutil.IncludeInlayParameterNameHintsLiterals}})
}

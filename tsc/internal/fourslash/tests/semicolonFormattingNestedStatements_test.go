package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestSemicolonFormattingNestedStatements(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `if (true)
if (true)/*parentOutsideBlock*/
if (true) {
if (true)/*directParent*/
var x = 0/*innermost*/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "innermost")
	f.Insert(t, ";")
	f.VerifyCurrentLineContent(t, `        var x = 0;`)
	f.GoToMarker(t, "directParent")
	f.VerifyCurrentLineContent(t, `    if (true)`)
	f.GoToMarker(t, "parentOutsideBlock")
	f.VerifyCurrentLineContent(t, `if (true)`)
}

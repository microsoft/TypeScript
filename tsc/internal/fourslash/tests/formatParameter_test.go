package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormatParameter(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo(
    first:
    number,/*first*/
    second: (
    string/*second*/
    ),
    third:
    (
    boolean/*third*/
    )
) {
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "first")
	f.VerifyCurrentLineContent(t, `        number,`)
	f.GoToMarker(t, "second")
	f.VerifyCurrentLineContent(t, `        string`)
	f.GoToMarker(t, "third")
	f.VerifyCurrentLineContent(t, `            boolean`)
}

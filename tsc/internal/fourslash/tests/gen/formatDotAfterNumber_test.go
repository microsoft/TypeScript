package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatDotAfterNumber(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `1+ 2 .toString() +3/*1*/
1+ 2. .toString() +3/*2*/
1+ 2.0 .toString() +3/*3*/
1+ (2) .toString() +3/*4*/
1+ 2_000 .toString() +3/*5*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `1 + 2 .toString() + 3`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `1 + 2..toString() + 3`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `1 + 2.0.toString() + 3`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `1 + (2).toString() + 3`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `1 + 2_000 .toString() + 3`)
}

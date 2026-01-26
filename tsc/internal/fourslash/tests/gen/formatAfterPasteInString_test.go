package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatAfterPasteInString(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*2*/const x = f('aa/*1*/a').x()`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.Paste(t, "bb")
	f.FormatDocument(t, "")
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `const x = f('aabba').x()`)
}

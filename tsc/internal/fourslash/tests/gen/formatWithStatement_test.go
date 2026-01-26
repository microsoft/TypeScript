package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatWithStatement(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `with /*1*/(foo.bar)

   {/*2*/

     }/*3*/

with (bar.blah)/*4*/
{/*5*/
}/*6*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	opts227 := f.GetOptions()
	opts227.FormatCodeSettings.PlaceOpenBraceOnNewLineForControlBlocks = core.TSFalse
	f.Configure(t, opts227)
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `with (foo.bar) {`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `with (bar.blah) {`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `}`)
	opts565 := f.GetOptions()
	opts565.FormatCodeSettings.PlaceOpenBraceOnNewLineForControlBlocks = core.TSTrue
	f.Configure(t, opts565)
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `with (foo.bar)`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `{`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `with (bar.blah)`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `{`)
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingNonNullAssertionOperator(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/ 'bar' ! ;
/*2*/ ( 'bar' ) ! ;
/*3*/ 'bar' [ 1 ] ! ;
/*4*/ var  bar  =  'bar' . foo ! ;
/*5*/ var  foo  =  bar ! ;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `'bar'!;`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `('bar')!;`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `'bar'[1]!;`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `var bar = 'bar'.foo!;`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `var foo = bar!;`)
}

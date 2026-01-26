package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingSpaceBeforeCloseParen(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/({});
/*2*/(  {});
/*3*/({foo:42});
/*4*/(  {foo:42}  );
/*5*/var bar = (function (a) { });`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	opts235 := f.GetOptions()
	opts235.FormatCodeSettings.InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis = core.TSTrue
	f.Configure(t, opts235)
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `( {} );`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `( {} );`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `( { foo: 42 } );`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `( { foo: 42 } );`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `var bar = ( function( a ) { } );`)
	opts674 := f.GetOptions()
	opts674.FormatCodeSettings.InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis = core.TSFalse
	f.Configure(t, opts674)
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `({});`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `({});`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `({ foo: 42 });`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `({ foo: 42 });`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `var bar = (function(a) { });`)
}

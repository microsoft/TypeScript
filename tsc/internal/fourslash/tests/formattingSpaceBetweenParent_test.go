package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormattingSpaceBetweenParent(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/foo(() => 1);
/*2*/foo(1);
/*3*/if((true)){}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	opts180 := f.GetOptions()
	opts180.FormatCodeSettings.InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis = core.TSTrue
	f.Configure(t, opts180)
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `foo( () => 1 );`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `foo( 1 );`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `if ( ( true ) ) { }`)
}

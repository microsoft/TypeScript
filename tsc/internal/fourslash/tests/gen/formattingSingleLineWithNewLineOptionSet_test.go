package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingSingleLineWithNewLineOptionSet(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/module Default{}
/*2*/function foo(){}
/*3*/if (true){}
/*4*/function boo() {
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	opts208 := f.GetOptions()
	opts208.FormatCodeSettings.PlaceOpenBraceOnNewLineForFunctions = core.TSTrue
	f.Configure(t, opts208)
	opts276 := f.GetOptions()
	opts276.FormatCodeSettings.PlaceOpenBraceOnNewLineForControlBlocks = core.TSTrue
	f.Configure(t, opts276)
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `module Default { }`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `function foo() { }`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `if (true) { }`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `function boo()`)
}

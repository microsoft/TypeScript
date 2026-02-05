package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingSkippedTokens(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/foo(): Bar { }
/*2*/function Foo      () #   { }
/*3*/4+:5
 namespace M {
function a(
/*4*/    : T) { }
}
/*5*/var x       =`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `foo(): Bar { }`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `function Foo() #   { }`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `4 +: 5`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `    : T) { }`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `var x =`)
}

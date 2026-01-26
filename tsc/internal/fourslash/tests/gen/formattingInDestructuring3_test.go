package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingInDestructuring3(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/const {
/*2*/    a,
/*3*/    b,
/*4*/} = {a: 1, b: 2};
/*5*/const {a: c} = {a: 1, b: 2};`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `const {`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    a,`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `    b,`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `} = { a: 1, b: 2 };`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `const { a: c } = { a: 1, b: 2 };`)
}

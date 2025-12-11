package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingOnNestedDoWhileByEnter(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*2*/do{
/*3*/do/*1*/{
/*4*/do{
/*5*/}while(a!==b)
/*6*/}while(a!==b)
/*7*/}while(a!==b)`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.Insert(t, "\n")
	f.VerifyCurrentLineContentIs(t, "    {")
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContentIs(t, "do{")
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContentIs(t, "    do")
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContentIs(t, "do{")
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContentIs(t, "}while(a!==b)")
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContentIs(t, "}while(a!==b)")
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContentIs(t, "}while(a!==b)")
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingOnDocumentReadyFunction(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/$    (   document   )   .  ready  (   function   (   )   {
/*2*/    alert    (           'i am ready'  )   ;
/*3*/           }                 );`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `$(document).ready(function() {`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    alert('i am ready');`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `});`)
}

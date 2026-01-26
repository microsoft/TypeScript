package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingOnChainedCallbacksAndPropertyAccesses(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var x = 1;
x
/*1*/.toFixed
x
/*2*/.toFixed()
x
/*3*/.toFixed()
/*4*/.length
/*5*/.toString();
x
/*6*/.toFixed
/*7*/.toString()
/*8*/.length;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `    .toFixed`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    .toFixed()`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `    .toFixed()`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `    .length`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `    .toString();`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `    .toFixed`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `    .toString()`)
	f.GoToMarker(t, "8")
	f.VerifyCurrentLineContent(t, `    .length;`)
}

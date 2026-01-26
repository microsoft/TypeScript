package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingArrayLiteral(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/x= [];
y = [
/*2*/           1,
/*3*/  2
/*4*/ ];

z = [[
/*5*/  1,
/*6*/             2
/*7*/      ]  ];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `x = [];`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    1,`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `    2`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `];`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `    1,`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `    2`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `]];`)
}

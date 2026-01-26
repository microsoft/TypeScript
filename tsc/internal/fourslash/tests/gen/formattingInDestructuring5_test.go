package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingInDestructuring5(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `let a, b;
/*1*/if (false)[a, b] = [1, 2];
/*2*/if (true)        [a, b] = [1, 2];
/*3*/var a = [1, 2, 3].map(num => num) [0];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `if (false) [a, b] = [1, 2];`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `if (true) [a, b] = [1, 2];`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `var a = [1, 2, 3].map(num => num)[0];`)
}

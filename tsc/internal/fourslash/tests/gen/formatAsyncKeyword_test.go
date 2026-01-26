package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatAsyncKeyword(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/let x = async         () => 1;
/*2*/let y = async() => 1;
/*3*/let z = async    function   () { return 1; };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `let x = async () => 1;`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `let y = async () => 1;`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `let z = async function() { return 1; };`)
}

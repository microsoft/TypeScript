package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingOnEnterInStrings(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var x = /*1*/"unclosed string literal\/*2*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "2")
	f.InsertLine(t, "")
	f.InsertLine(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContentIs(t, "var x = \"unclosed string literal\\")
}

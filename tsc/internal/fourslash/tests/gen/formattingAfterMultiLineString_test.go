package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingAfterMultiLineString(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class foo {
    stop() {
        var s = "hello\/*1*/
"/*2*/
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "2")
	f.InsertLine(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContentIs(t, "        var s = \"hello\\")
}

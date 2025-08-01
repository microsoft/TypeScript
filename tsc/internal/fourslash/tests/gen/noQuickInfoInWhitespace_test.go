package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNoQuickInfoInWhitespace(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C {
/*1*/    private _mspointerupHandler(args) {
        if (args.button === 3) {
            return null; 
/*2*/        } else if (args.button === 4) {
/*3*/            return null;
        }
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifyNotQuickInfoExists(t)
	f.GoToMarker(t, "2")
	f.VerifyNotQuickInfoExists(t)
	f.GoToMarker(t, "3")
	f.VerifyNotQuickInfoExists(t)
}

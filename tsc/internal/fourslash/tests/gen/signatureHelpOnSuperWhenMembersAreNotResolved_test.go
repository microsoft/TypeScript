package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpOnSuperWhenMembersAreNotResolved(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class A { }
class B extends A { constructor(public x: string) { } }
class C extends B {
    constructor() {
        /*1*/
     }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.Insert(t, "super(")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "B(x: string): B"})
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpForSuperCalls1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class A { }
class B extends A { }
class C extends B {
    constructor() {
        super(/*1*/ // sig help here?
    }
}
class A2 { }
class B2 extends A2 {
    constructor(x:number) {}
 }
class C2 extends B2 {
    constructor() {
        super(/*2*/ // sig help here?
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "B(): B"})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "B2(x: number): B2"})
}

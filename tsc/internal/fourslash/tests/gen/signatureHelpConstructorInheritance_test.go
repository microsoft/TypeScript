package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpConstructorInheritance(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class base {
    constructor(s: string);
    constructor(n: number);
    constructor(a: any) { }
}
class B1 extends base { }
class B2 extends B1 { }
class B3 extends B2 {
    constructor() {
        super(/*indirectSuperCall*/3);
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "indirectSuperCall")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "B2(n: number): B2", ParameterCount: 1, ParameterName: "n", ParameterSpan: "n: number", OverloadsCount: 2})
}

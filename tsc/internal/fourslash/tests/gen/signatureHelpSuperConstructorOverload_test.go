package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpSuperConstructorOverload(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class SuperOverloadBase {
    constructor();
    constructor(test: string);
    constructor(test?: string) {
    }
}
class SuperOverLoad1 extends SuperOverloadBase {
    constructor() {
        super(/*superOverload1*/);
    }
}
class SuperOverLoad2 extends SuperOverloadBase {
    constructor() {
        super(""/*superOverload2*/);
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "superOverload1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "SuperOverloadBase(): SuperOverloadBase", ParameterCount: 0, OverloadsCount: 2})
	f.GoToMarker(t, "superOverload2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "SuperOverloadBase(test: string): SuperOverloadBase", ParameterCount: 1, ParameterName: "test", ParameterSpan: "test: string", OverloadsCount: 2})
}

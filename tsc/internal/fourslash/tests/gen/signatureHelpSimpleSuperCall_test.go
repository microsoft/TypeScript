package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpSimpleSuperCall(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class SuperCallBase {
    constructor(b: boolean) {
    }
}
class SuperCall extends SuperCallBase {
    constructor() {
        super(/*superCall*/);
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "superCall")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "SuperCallBase(b: boolean): SuperCallBase", ParameterName: "b", ParameterSpan: "b: boolean"})
}

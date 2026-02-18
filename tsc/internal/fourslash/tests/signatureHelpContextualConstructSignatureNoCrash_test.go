package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Tests that signature help does not panic when the contextual type has only construct signatures
// (no call signatures).
func TestSignatureHelpContextualConstructSignatureNoCrash(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
type Obj = {
    foo: new () => object
}

let obj: Obj = {
    foo(/*constructOnly*/) {}
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	// When contextual type only has construct signatures (no call signatures),
	// no signature help should be provided (and no panic should occur).
	f.GoToMarker(t, "constructOnly")
	f.VerifyNoSignatureHelp(t)
}

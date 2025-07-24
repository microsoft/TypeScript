package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionThis(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function f(/*fnDecl*/this: number) {
    return [|/*fnUse*/this|];
}
class /*cls*/C {
    constructor() { return [|/*clsUse*/this|]; }
    get self(/*getterDecl*/this: number) { return [|/*getterUse*/this|]; }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "fnUse", "clsUse", "getterUse")
}

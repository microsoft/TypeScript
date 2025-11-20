package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationInterface_08(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Base {
    hello (): void;
}

interface A extends Base {}
interface B extends C, A {}
interface C extends B, A {}

class X implements B {
    [|hello|]() {}
}

function someFunction(d : A) {
    d.he/*function_call*/llo();
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToImplementation(t, "function_call")
}

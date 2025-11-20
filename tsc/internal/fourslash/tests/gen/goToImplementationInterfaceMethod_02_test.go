package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationInterfaceMethod_02(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo {
    he/*declaration*/llo(): void
}

abstract class AbstractBar implements Foo {
    abstract hello(): void;
}

class Bar extends AbstractBar {
    [|hello|]() {}
}

function whatever(a: AbstractBar) {
    a.he/*function_call*/llo();
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToImplementation(t, "function_call", "declaration")
}

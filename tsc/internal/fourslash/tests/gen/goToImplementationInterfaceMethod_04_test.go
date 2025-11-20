package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationInterfaceMethod_04(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo {
    hello (): void;
}

class Bar extends SuperBar {
    [|hello|]() {}
}

class SuperBar implements Foo {
    [|hello|]() {}
}

class OtherBar implements Foo {
    hello() {} // should not show up
}

function (x: SuperBar) {
    x.he/*function_call*/llo()
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToImplementation(t, "function_call")
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationInterfaceMethod_09(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo {
    hello (): void;
}

class SubBar extends Bar {
    hello() {}
}

class Bar extends SuperBar {
    hello() {}

    whatever() {
        super.he/*function_call*/llo();
        super["hel/*element_access*/lo"]();
    }
}

class SuperBar extends MegaBar {
    [|hello|]() {}
}

class MegaBar implements Foo {
    hello() {}
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToImplementation(t, "function_call", "element_access")
}

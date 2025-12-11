package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationInterfaceMethod_06(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface SuperFoo {
    hello (): void;
}

interface Foo extends SuperFoo {
    someOtherFunction(): void;
}

class Bar implements Foo {
     [|hello|]() {}
     someOtherFunction() {}
}

function createFoo(): Foo {
    return {
        [|hello|]() {},
        someOtherFunction() {}
    };
}

var y: Foo = {
    [|hello|]() {},
    someOtherFunction() {}
};

class FooLike implements SuperFoo {
     hello() {}
     someOtherFunction() {}
}

class NotRelatedToFoo {
     hello() {}                // This case is equivalent to the last case, but is not returned because it does not share a common ancestor with Foo
     someOtherFunction() {}
}

class NotFoo implements SuperFoo {
     hello() {}                // We only want implementations of Foo, even though the function is declared in SuperFoo
}

function (x: Foo) {
    x.he/*function_call*/llo()
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToImplementation(t, "function_call")
}

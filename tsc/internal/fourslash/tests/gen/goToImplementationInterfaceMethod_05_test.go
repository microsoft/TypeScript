package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationInterfaceMethod_05(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo {
    hello (): void;
}

class SuperBar implements Foo {
    [|hello|]() {}
}

class Bar extends SuperBar {
    hello2() {}
}

class OtherBar extends SuperBar {
    hello() {}
    hello2() {}
    hello3() {}
}

class NotRelatedToBar {
    hello() {}         // Equivalent to last case, but shares no common ancestors with Bar and so is not returned
    hello2() {}
    hello3() {}
}

class NotBar extends SuperBar {
    hello() {}         // Should not be returned because it is not structurally equivalent to Bar
}

function whatever(x: Bar) {
    x.he/*function_call*/llo()
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToImplementation(t, "function_call")
}

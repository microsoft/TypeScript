package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationInterfaceProperty_00(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo {
    hello: number
}

var bar: Foo = { [|hello|]: 5 };


function whatever(x: Foo = { [|hello|]: 5 * 9 }) {
    x.he/*reference*/llo
}

class Bar {
    x: Foo = { [|hello|]: 6 }

    constructor(public f: Foo = { [|hello|]: 7 } ) {}
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToImplementation(t, "reference")
}

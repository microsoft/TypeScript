package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationInterfaceMethod_00(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo {
    he/*declaration*/llo: () => void
}

var bar: Foo = { [|hello|]: helloImpl };
var baz: Foo = { "[|hello|]": helloImpl };

function helloImpl () {}

function whatever(x: Foo = { [|hello|]() {/**1*/} }) {
    x.he/*function_call*/llo()
}

class Bar {
    x: Foo = { [|hello|]() {/*2*/} }

    constructor(public f: Foo = { [|hello|]() {/**3*/} } ) {}
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToImplementation(t, "function_call", "declaration")
}

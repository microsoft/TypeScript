package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationNamespace_04(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module Foo {
    export interface Bar {
        hello(): void;
    }

    class [|BarImpl|] implements Bar {
        hello() {}
    }
}

class [|Baz|] implements Foo.Bar {
    hello() {}
}

var someVar1 : Foo.Bar = [|{ hello: () => {/**1*/} }|];

var someVar2 = <Foo.Bar> [|{ hello: () => {/**2*/} }|];

function whatever(x: Foo.Ba/*reference*/r) {

}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToImplementation(t, "reference")
}

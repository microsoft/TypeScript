package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationInterface_00(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Fo/*interface_definition*/o {
    hello: () => void
}

interface Baz extends Foo {}

var bar: Foo = [|{|"parts": ["(","object literal",")"], "kind": "interface"|}{ hello: helloImpl /**0*/ }|];
var baz: Foo[] = [|[{ hello: helloImpl /**4*/ }]|];

function helloImpl () {}

function whatever(x: Foo = [|{|"parts": ["(","object literal",")"], "kind": "interface"|}{ hello() {/**1*/} }|] ) {
}

class Bar {
    x: Foo = [|{ hello() {/*2*/} }|]

    constructor(public f: Foo = [|{ hello() {/**3*/} }|] ) {}
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToImplementation(t, "interface_definition")
}

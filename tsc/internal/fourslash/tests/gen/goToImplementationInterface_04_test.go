package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationInterface_04(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Fo/*interface_definition*/o {
    (a: number): void
}

var bar: Foo = [|(a) => {/**0*/}|];

function whatever(x: Foo = [|(a) => {/**1*/}|] ) {
}

class Bar {
    x: Foo = [|(a) => {/**2*/}|]

    constructor(public f: Foo = [|function(a) {}|] ) {}
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToImplementation(t, "interface_definition")
}

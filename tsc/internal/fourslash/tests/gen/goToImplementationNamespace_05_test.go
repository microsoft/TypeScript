package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationNamespace_05(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace /*implementation0*/Foo./*implementation2*/Baz {
    export function hello() {}
}

module /*implementation1*/Bar./*implementation3*/Baz {
    export function sure() {}
}

let x = Fo/*reference0*/o;
let y = Ba/*reference1*/r;
let x1 = Foo.B/*reference2*/az;
let y1 = Bar.B/*reference3*/az;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToImplementation(t, "reference0", "reference1", "reference2", "reference3")
}

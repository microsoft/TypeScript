package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinition_super(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class A {
    /*ctr*/constructor() {}
    x() {}
}
class /*B*/B extends A {}
class C extends B {
    constructor() {
        [|/*super*/super|]();
    }
    method() {
        [|/*superExpression*/super|].x();
    }
}
class D {
    constructor() {
        /*superBroken*/super();
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "super", "superExpression", "superBroken")
}

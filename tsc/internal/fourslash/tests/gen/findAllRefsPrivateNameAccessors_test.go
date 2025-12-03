package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsPrivateNameAccessors(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C {
    /*1*/get /*2*/#foo(){ return 1; }
    /*3*/set /*4*/#foo(value: number){  }
    constructor() {
        this./*5*/#foo();
    }
}
class D extends C {
    constructor() {
        super()
        this.#foo = 20;
    }
}
class E {
    /*6*/get /*7*/#foo(){ return 1; }
    /*8*/set /*9*/#foo(value: number){  }
    constructor() {
        this./*10*/#foo();
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3", "4", "5", "6", "7", "8", "9", "10")
}

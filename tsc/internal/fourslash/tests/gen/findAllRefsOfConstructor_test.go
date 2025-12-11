package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsOfConstructor(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class A {
    /*aCtr*/constructor(s: string) {}
}
class B extends A { }
class C extends B {
    /*cCtr*/constructor() {
        super("");
    }
}
class D extends B { }
class E implements A { }
const a = new A("a");
const b = new B("b");
const c = new C();
const d = new D("d");
const e = new E();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineFindAllReferences(t, "aCtr", "cCtr")
}

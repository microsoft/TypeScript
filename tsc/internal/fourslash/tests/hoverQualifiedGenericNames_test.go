package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestHoverQualifiedGenericNames(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
function f<T>(x: T) {
    class C {
        value = x
    }
    return new C()
}

class A<T> {
    foo() {}
}
class B extends A<string> {}

let t1/*1*/ = f("hello")
const t2/*2*/ = new B()
t2./*3*/foo()
`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyQuickInfoAt(t, "1", "let t1: f<string>.C", "")
	f.VerifyQuickInfoAt(t, "2", "const t2: B", "")
	f.VerifyQuickInfoAt(t, "3", "(method) A<string>.foo(): void", "")
}

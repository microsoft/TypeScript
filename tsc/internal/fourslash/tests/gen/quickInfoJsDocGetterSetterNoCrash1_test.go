package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJsDocGetterSetterNoCrash1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class A implements A {
  get x(): string { return "" }
}
const e = new A()
e.x/*1*/

class B implements B {
  set x(v: string) {}
}
const f = new B()
f.x/*2*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(property) A.x: string", "")
	f.VerifyQuickInfoAt(t, "2", "(property) B.x: string", "")
}

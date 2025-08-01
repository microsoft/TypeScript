package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoTypedGenericPrototypeMember(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C<T> {
   foo(x: T) { }
}
var /*1*/x = new C<any>(); // Quick Info for x is C<any>
var /*2*/y = C.prototype; // Quick Info for y is C<{}>`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var x: C<any>", "")
	f.VerifyQuickInfoAt(t, "2", "var y: C<any>", "")
}

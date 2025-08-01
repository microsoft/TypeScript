package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForDerivedGenericTypeWithConstructor(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class A<T> {
    foo() { }
}
class B<T> extends A<T> {
    bar() { }
    constructor() { super() }
}
class B2<T> extends A<T> {
    bar() { }
}
var /*1*/b: B<number>;
var /*2*/b2: B<number>;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var b: B<number>", "")
	f.VerifyQuickInfoAt(t, "2", "var b2: B<number>", "")
}

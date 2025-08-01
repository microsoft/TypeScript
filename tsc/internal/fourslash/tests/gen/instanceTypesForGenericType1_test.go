package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestInstanceTypesForGenericType1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class G<T> {               // Introduce type parameter T
    self: G<T>;            // Use T as type argument to form instance type
    f() {
        this./*1*/self = /*2*/this;  // self and this are both of type G<T>
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(property) G<T>.self: G<T>", "")
	f.VerifyQuickInfoAt(t, "2", "this: this", "")
}

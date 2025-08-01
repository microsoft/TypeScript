package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestReturnTypeOfGenericFunction1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface WrappedArray<T> {
    map<U>(iterator: (value: T) => U, context?: any): U[];
}
var x: WrappedArray<string>;
var /**/y = x.map(s => s.length);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "", "var y: number[]", "")
}

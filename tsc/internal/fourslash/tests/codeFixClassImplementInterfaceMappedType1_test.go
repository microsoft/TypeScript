package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterfaceMappedType1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I<X> {
    x: { readonly [K in keyof X]: X[K] };
}
class C<Y> implements I<Y> {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'I<Y>'",
		NewFileContent: `interface I<X> {
    x: { readonly [K in keyof X]: X[K] };
}
class C<Y> implements I<Y> {
    x: { readonly [K in keyof Y]: Y[K]; };
}`,
		Index: 0,
	})
}

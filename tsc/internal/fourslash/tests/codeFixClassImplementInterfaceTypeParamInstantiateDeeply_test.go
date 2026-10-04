package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterfaceTypeParamInstantiateDeeply(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I<T> {
    x: { y: T, z: T[] };
}
class C implements I<number> {[| |]}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'I<number>'",
		NewFileContent: `interface I<T> {
    x: { y: T, z: T[] };
}
class C implements I<number> {
    x: { y: number; z: number[]; };
}`,
		Index: 0,
	})
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterfaceConstructorName1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    constructor: number;
}
class C implements I {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'I'",
		NewFileContent: `interface I {
    constructor: number;
}
class C implements I {
    ["constructor"]: number;
}`,
		Index: 0,
	})
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterfaceQualifiedName(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace N {
    export interface I { y: I; }
}
class C1 implements N.I {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'N.I'",
		NewFileContent: `namespace N {
    export interface I { y: I; }
}
class C1 implements N.I {
    y: N.I;
}`,
		Index: 0,
	})
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterfaceMultipleMembersAndPunctuation(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I1 {
    x: number,
    y: number
    z: number;
    f(): number,
    g(): any
    h();
}

class C1 implements I1 {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'I1'",
		NewFileContent: `interface I1 {
    x: number,
    y: number
    z: number;
    f(): number,
    g(): any
    h();
}

class C1 implements I1 {
    x: number;
    y: number;
    z: number;
    f(): number {
        throw new Error("Method not implemented.");
    }
    g() {
        throw new Error("Method not implemented.");
    }
    h() {
        throw new Error("Method not implemented.");
    }
}`,
		Index: 0,
	})
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterfaceComputedPropertyLiterals(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    ["foo"](o: any): boolean;
    ["x"]: boolean;
    [1](): string;
    [2]: boolean;
}

class C implements I {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'I'",
		NewFileContent: `interface I {
    ["foo"](o: any): boolean;
    ["x"]: boolean;
    [1](): string;
    [2]: boolean;
}

class C implements I {
    ["foo"](o: any): boolean {
        throw new Error("Method not implemented.");
    }
    ["x"]: boolean;
    [1](): string {
        throw new Error("Method not implemented.");
    }
    [2]: boolean;
}`,
		Index: 0,
	})
}

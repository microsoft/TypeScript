package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterfaceMultipleSignaturesRest2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    method(a: number, ...b: string[]): boolean;
    method(a: string, b: number): Function;
    method(a: string): Function;
}

class C implements I {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'I'",
		NewFileContent: `interface I {
    method(a: number, ...b: string[]): boolean;
    method(a: string, b: number): Function;
    method(a: string): Function;
}

class C implements I {
    method(a: number, ...b: string[]): boolean;
    method(a: string, b: number): Function;
    method(a: string): Function;
    method(a: unknown, b?: unknown, ...rest?: unknown[]): boolean | Function {
        throw new Error("Method not implemented.");
    }
}`,
		Index: 0,
	})
}

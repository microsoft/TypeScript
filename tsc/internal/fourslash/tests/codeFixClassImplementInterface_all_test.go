package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterface_all(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I { i(): void; }
interface J { j(): void; }
class C implements I, J {}
class D implements J {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
		FixID: "fixClassIncorrectlyImplementsInterface",
		NewFileContent: `interface I { i(): void; }
interface J { j(): void; }
class C implements I, J {
    i(): void {
        throw new Error("Method not implemented.");
    }
    j(): void {
        throw new Error("Method not implemented.");
    }
}
class D implements J {
    j(): void {
        throw new Error("Method not implemented.");
    }
}`,
	})
}

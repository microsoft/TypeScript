package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingPrivateMethod(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Bar {
    bar() {
         this.[|_baz|](123)
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Add missing member '_baz'",
		NewFileContent: `class Bar {
    bar() {
         this._baz(123)
    }
    private _baz(arg0: number): void {
        throw new Error("Method not implemented.");
    }
}`,
		Index: 0,
	})
}

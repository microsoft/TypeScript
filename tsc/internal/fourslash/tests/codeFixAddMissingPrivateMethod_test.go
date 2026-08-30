package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingPrivateMethod(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Foo implements Bar {
    [|/*1*/|]
}
interface Bar {
    private _baz(): void;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'Bar'",
		NewFileContent: `class Foo implements Bar {
    private _baz(): void {
        throw new Error("Method not implemented.");
    }
}
interface Bar {
    private _baz(): void;
}`,
		Index: 0,
	})
}

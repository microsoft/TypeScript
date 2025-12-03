package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestInlayHintsInteractiveFunctionParameterTypes3(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface IFoo {
    bar(x?: boolean): void;
}

const a: IFoo = {
    bar: function (x?): void {
        throw new Error("Function not implemented.");
    }
}
class Foo {
    #value = 0;
    get foo(): number { return this.#value; }
    set foo(value) { this.#value = value; }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{InlayHints: lsutil.InlayHintsPreferences{IncludeInlayFunctionParameterTypeHints: true}})
}

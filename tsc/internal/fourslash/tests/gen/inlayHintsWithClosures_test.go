package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestInlayHintsWithClosures(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo1(a: number) {
    return (b: number) => {
        return a + b
    }
}
foo1(1)(2);
function foo2(a: (b: number) => number) {
    return a(1) + 2
}
foo2((c: number) => c + 1);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{IncludeInlayParameterNameHints: lsutil.IncludeInlayParameterNameHintsAll})
}

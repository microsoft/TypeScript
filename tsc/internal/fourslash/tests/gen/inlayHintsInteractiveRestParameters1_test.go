package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestInlayHintsInteractiveRestParameters1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo1(a: number, ...b: number[]) {}
foo1(1, 1, 1, 1);
type Args2 = [a: number, b: number]
declare function foo2(c: number, ...args: Args2);
foo2(1, 2, 3)
type Args3 = [number, number]
declare function foo3(c: number, ...args: Args3);
foo3(1, 2, 3)`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{InlayHints: lsutil.InlayHintsPreferences{IncludeInlayParameterNameHints: lsutil.IncludeInlayParameterNameHintsLiterals}})
}

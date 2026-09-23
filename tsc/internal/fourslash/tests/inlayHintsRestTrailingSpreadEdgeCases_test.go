package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestInlayHintsOptionalTrailingTupleAfterSpread(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function optional<T extends unknown[]>(...args: [...head: T, first?: number, second?: string]): void;
function forward<T extends unknown[]>(x: T) {
    optional<T>(...x, 1);
    optional<T>(...x, 1, "two");
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{InlayHints: lsutil.InlayHintsPreferences{IncludeInlayParameterNameHints: lsutil.IncludeInlayParameterNameHintsAll}})
}

func TestInlayHintsSingleRestWithSpreadAndSuffix(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function f(...args: [...head: string[], tail: string]): void;
declare const xs: string[];
f(...xs, "middle", "end");`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{InlayHints: lsutil.InlayHintsPreferences{IncludeInlayParameterNameHints: lsutil.IncludeInlayParameterNameHintsAll}})
}

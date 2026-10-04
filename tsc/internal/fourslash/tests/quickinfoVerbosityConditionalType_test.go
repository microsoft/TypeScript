package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickinfoVerbosityConditionalType(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Apple {
    color: string;
    weight: number;
}
type StrInt = string | bigint;
type T1<T extends Apple | Apple[]> = T extends { color: string } ? "one apple" : StrInt;
function f<T extends Apple | Apple[]>(x: T1<T>): void {
    x/*x*/;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"x": {0, 1, 2}})
}

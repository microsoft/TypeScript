package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickinfoVerbosityFunction(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Apple {
    color: string;
    size: number;
}
interface Orchard {
    takeOneApple(a: Apple): void;
    getApple(): Apple;
    getApple(size: number): Apple[];
}
const o/*o*/: Orchard = {} as any;
declare function isApple/*f*/(x: unknown): x is Apple;
type SomeType = {
    prop1: string;
}
function someFun(a: SomeType): SomeType {
    return a;
}
someFun/*s*/.what = 'what';`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"o": {0, 1, 2}, "f": {0, 1}, "s": {0, 1}})
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickinfoVerbosityIndexType(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface T1 {
	banana: string;
	grape: number;
	apple: boolean;
}
const x1/*x1*/: keyof T1 = 'banana';
const x2/*x2*/: keyof T1 & ("grape" | "apple") = 'grape';
function fn1<T extends T1>(obj: T, key: keyof T, k2: keyof T1) {
	if (key === k2/*k2*/) {
		return obj[key/*key*/];
	}
	return key;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"x1": {0, 1}, "x2": {0}, "k2": {0, 1}, "key": {0}})
}

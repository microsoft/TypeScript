package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickinfoVerbosityMappedType(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type Apple = boolean | number;
type Orange = string | boolean;
type F<T> = {
	[K in keyof T as T[K] extends Apple ? never : K]: T[K];
}
type Bar = {
	banana: string;
	apple: boolean;
}
const x/*x*/: F/*F*/<Bar> = { banana: 'hello' };
const y/*y*/: { [K in keyof Bar]?: Bar[K] } = { banana: 'hello' };
type G<T> = {
	[K in keyof T]: T[K] & Apple
};
const z: G/*G*/<Bar> = { banana: 'hello', apple: true };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"x": {0, 1}, "y": {0}, "F": {0, 1}, "G": {0, 1}})
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestUnderscoreTypings02(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
// @module: CommonJS
interface Dictionary<T> {
    [x: string]: T;
}
export interface ChainedObject<T> {
    functions: ChainedArray<string>;
    omit(): ChainedObject<T>;
    clone(): ChainedObject<T>;
}
interface ChainedDictionary<T> extends ChainedObject<Dictionary<>> {
    foldl(): ChainedObject<T>;
    clone(): ChainedDictionary<T>;
}
export interface ChainedArray<T> extends ChainedObject<Array<T>> {
    groupBy(): ChainedDictionary<any[]>;
    groupBy(propertyName): ChainedDictionary<any[]>;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToPosition(t, 0)
	f.VerifyNumberOfErrorsInCurrentFile(t, 2)
}

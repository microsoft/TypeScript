package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoIndexSignatureProperty(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Regression test for https://github.com/microsoft/TypeScript/issues/64582.
	const content = `
// @strict: true
declare const x: { [k: string]: number };
x./*anonymous*/a;
interface Dictionary<T> {
    [k: string]: T;
}

declare const dictionary: Dictionary<number>;
dictionary./*generic*/a;
interface Multiple {
    [k: string | symbol]: number;
}
declare const multiple: Multiple;
multiple./*multiple*/a;
interface Pattern {
    [k: ` + "`data_${string}`" + `]: number;
}
declare const pattern: Pattern;
pattern./*pattern*/data_example;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "anonymous", "(index) x[string]: number", "")
	f.VerifyQuickInfoAt(t, "generic", "(index) Dictionary[string]: number", "")
	f.VerifyQuickInfoAt(t, "multiple", "(index) Multiple[string | symbol]: number", "")
	f.VerifyQuickInfoAt(t, "pattern", "(index) Pattern[`data_${string}`]: number", "")
}

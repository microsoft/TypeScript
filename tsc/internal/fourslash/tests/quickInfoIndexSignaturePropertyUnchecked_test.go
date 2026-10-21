package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoIndexSignaturePropertyUnchecked(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @strict: true
// @noUncheckedIndexedAccess: true
interface Dictionary {
    /** The stored value. */
    [k: string]: number;
}
declare const dictionary: Dictionary;
dictionary./*read*/a;
dictionary./*write*/a = 1;
if (dictionary.a !== undefined) {
    dictionary./*narrowed*/a;
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "read", "(index) Dictionary[string]: number | undefined", "The stored value.")
	f.VerifyQuickInfoAt(t, "write", "(index) Dictionary[string]: number", "The stored value.")
	f.VerifyQuickInfoAt(t, "narrowed", "(index) Dictionary[string]: number", "The stored value.")
}

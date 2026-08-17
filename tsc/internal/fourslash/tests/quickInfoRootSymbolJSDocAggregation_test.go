package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoRootSymbolJSDocAggregation(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `
declare const distinct: {
    /** first */
    a: number;
} & {
    /** second */
    a: number;
};

declare const duplicate: {
    /** same */
    a: number;
} & {
    /** same */
    a: number;
} & {
    /** third */
    a: number;
};

declare const mixed: {
    /** first */
    a: number;
} & {
    /** second */
    a: number;
} & {
    /** first */
    a: number;
};

distinct./*distinct*/a
duplicate./*duplicate*/a
mixed./*mixed*/a
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyQuickInfoAt(t, "distinct", "(property) a: number", "first\nsecond")
	f.VerifyQuickInfoAt(t, "duplicate", "(property) a: number", "same\nthird")
	f.VerifyQuickInfoAt(t, "mixed", "(property) a: number", "first\nsecond")
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestSuperTaggedTemplateTypeArgumentsNoCrash(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /main.ts
class SomeBase<A, B, C> {
    a!: A; b!: B; c!: C;
}
class SomeDerived</*1*/T> extends SomeBase<number, string, T> {
    constructor() {
        /*2*/super<number, string, /*3*/T> ` + "`hello world`" + `;
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, "1", "2", "3")
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3")
}

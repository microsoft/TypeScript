package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestAutoImportErrorMixedExportKinds(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a.ts
export function foo(): number {
	return 10
}

const bar = 20;
export { bar as foo };

// @Filename: b.ts
foo/**/
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	// Verify we don't crash from the mixed exports
	f.BaselineAutoImportsCompletions(t, []string{""})
}

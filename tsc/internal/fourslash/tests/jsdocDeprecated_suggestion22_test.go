package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestJsdocDeprecated_suggestion22(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: /a.ts
const foo: {
    /**
	 * @deprecated
	 */
	(a: string, b: string): string;
	(a: string, b: number): string;
} = (a: string, b: string | number) => a + b;

[|foo|](1, 1);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifySuggestionDiagnostics(t, nil)
}

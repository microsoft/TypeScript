package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsconfigComputedPropertyError(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: tsconfig.json
{
    ["oops!" + 42]: "true",
    "compilerOptions": { "lib": ["es5"] },
    "files": [
        "nonexistentfile.ts"
    ],
    "compileOnSave": true
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.VerifyNonSuggestionDiagnostics(t, nil)
}

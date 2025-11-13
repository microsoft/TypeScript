package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsconfigComputedPropertyError(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: tsconfig.json
{
    ["oops!" + 42]: "true",
    "files": [
        "nonexistentfile.ts"
    ],
    "compileOnSave": true
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyNonSuggestionDiagnostics(t, nil)
}

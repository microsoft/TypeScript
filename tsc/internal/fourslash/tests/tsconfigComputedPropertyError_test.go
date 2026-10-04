package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestTsconfigComputedPropertyError(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: tsconfig.json
{
    [|["oops!" + 42]|]: "true",
    "compilerOptions": { "lib": ["es5"] },
    "files": [
        "nonexistentfile.ts"
    ],
    "compileOnSave": true
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.VerifyNonSuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Message: lsproto.StringOrMarkupContent{String: new("String literal with double quotes expected.")},
			Code:    &lsproto.IntegerOrString{Integer: new(int32(1327))},
		},
	})
}

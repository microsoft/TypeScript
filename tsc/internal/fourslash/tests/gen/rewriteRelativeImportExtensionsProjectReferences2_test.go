package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRewriteRelativeImportExtensionsProjectReferences2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: src/tsconfig-base.json
{
    "compilerOptions": {
        "lib": ["es5"],
        "module": "nodenext",
        "composite": true,
        "rootDir": ".",
        "outDir": "../dist",
        "rewriteRelativeImportExtensions": true,
    }
}
// @Filename: src/compiler/tsconfig.json
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": { "lib": ["es5"] }
}
// @Filename: src/compiler/parser.ts
export {};
// @Filename: src/services/tsconfig.json
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": { "lib": ["es5"] },
    "references": [
        { "path": "../compiler" }
    ]
}
// @Filename: src/services/services.ts
import {} from "../compiler/parser.ts";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToFile(t, "/src/services/services.ts")
	f.VerifyBaselineNonSuggestionDiagnostics(t)
}

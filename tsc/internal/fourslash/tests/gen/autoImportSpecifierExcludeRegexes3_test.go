package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportSpecifierExcludeRegexes3(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: preserve
// @Filename: /node_modules/pkg/package.json
{
    "name": "pkg",
    "version": "1.0.0",
    "exports": {
        ".": "./index.js",
        "./utils": "./utils.js"
    }
}
// @Filename: /node_modules/pkg/utils.d.ts
export function add(a: number, b: number) {}
// @Filename: /node_modules/pkg/index.d.ts
export * from "./utils";
// @Filename: /src/index.ts
add/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"pkg", "pkg/utils"}, nil /*preferences*/)
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"pkg/utils"}, &lsutil.UserPreferences{AutoImportSpecifierExcludeRegexes: []string{"^pkg$"}})
}

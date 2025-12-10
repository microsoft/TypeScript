package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportSpecifierExcludeRegexes2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "module": "preserve",
        "paths": {
            "@app/*": ["./src/*"]
        }
    }
}
// @Filename: /src/utils.ts
export function add(a: number, b: number) {}
// @Filename: /src/index.ts
add/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"./utils"}, nil /*preferences*/)
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"@app/utils"}, &lsutil.UserPreferences{AutoImportSpecifierExcludeRegexes: []string{"^\\./"}})
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"@app/utils"}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "non-relative"})
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"./utils"}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "non-relative", AutoImportSpecifierExcludeRegexes: []string{"^@app/"}})
	f.VerifyImportFixModuleSpecifiers(t, "", []string{}, &lsutil.UserPreferences{AutoImportSpecifierExcludeRegexes: []string{"utils"}})
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// A null target for the active condition blocks the specifier outright at runtime, so the
// "default" target after it can't rescue the "#" specifier.
func TestAutoImportPackageJsonImportsShadowedCondition4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: nodenext
// @Filename: /package.json
{
  "type": "module",
  "imports": {
    "#*": {
      "node": null,
      "default": "./src/*.ts"
    }
  }
}
// @Filename: /src/utils/summarize.ts
export function summarize(name: string): any;
// @Filename: /src/index.ts
summarize/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"./utils/summarize.js"}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "non-relative"})
}

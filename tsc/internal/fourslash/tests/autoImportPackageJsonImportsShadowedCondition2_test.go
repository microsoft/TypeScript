package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// Same mapping as ShadowedCondition1, but the target is the file the active "node" condition
// actually selects, so the "#" specifier is valid and must still be offered.
func TestAutoImportPackageJsonImportsShadowedCondition2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: nodenext
// @Filename: /package.json
{
  "type": "module",
  "imports": {
    "#*": {
      "node": "./src/*/index.ts",
      "default": "./src/*.ts"
    }
  }
}
// @Filename: /src/utils/summarize/index.ts
export function summarize(name: string): any;
// @Filename: /src/index.ts
summarize/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"#utils/summarize"}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "non-relative"})
}

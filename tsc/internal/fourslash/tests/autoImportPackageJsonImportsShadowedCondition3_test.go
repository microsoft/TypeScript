package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// A custom condition shadows "default" in exactly the same way the built-in "node" condition does.
func TestAutoImportPackageJsonImportsShadowedCondition3(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @moduleResolution: bundler
// @customConditions: custom
// @Filename: /package.json
{
  "imports": {
    "#*": {
      "custom": "./src/*/index.ts",
      "default": "./src/*.ts"
    }
  }
}
// @Filename: /src/utils/summarize/index.ts
export {};
// @Filename: /src/utils/summarize/summarize.ts
export function summarize(name: string): any;
// @Filename: /src/index.ts
summarize/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"./utils/summarize/summarize"}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "non-relative"})
}

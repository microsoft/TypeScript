package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// The "node" condition is active and is listed first, so at runtime "#utils/summarize/summarize"
// resolves to ./src/utils/summarize/summarize/index.ts, which doesn't exist. The "default" target
// that would have matched is never consulted, so the specifier must not be offered.
func TestAutoImportPackageJsonImportsShadowedCondition1(t *testing.T) {
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
export {};
// @Filename: /src/utils/summarize/summarize.ts
export function summarize(name: string): any;
// @Filename: /src/index.ts
summarize/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"./utils/summarize/summarize.js"}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "non-relative"})
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestAutoImportPackageJsonImportsInvalidSpecifier(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext"
  }
}
// @Filename: /package.json
{
  "imports": {
    "#*": {
      "node": "./dist/*/index.js",
      "default": "./dist/*.js"
    }
  }
}
// @Filename: /dist/utils/summarize/index.ts
export function summarize(): void;
// @Filename: /dist/utils/summarize/summarize.ts
export function summarize(): void;
// @Filename: /src/index.ts
summarize/*a*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	// #utils/summarize resolves via the active "node" condition.
	// #utils/summarize/summarize would only resolve via "default" fallback after
	// "node" misses, which Node never tries at runtime (ERR_MODULE_NOT_FOUND),
	// so its # specifier must not be suggested; only a relative fallback remains
	// for that file. See https://github.com/microsoft/TypeScript/issues/64171.
	f.VerifyImportFixModuleSpecifiers(t, "a", []string{"#utils/summarize", "../dist/utils/summarize/summarize"}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "non-relative"})
}

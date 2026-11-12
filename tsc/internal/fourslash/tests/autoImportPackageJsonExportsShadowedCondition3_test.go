package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// Same package shape as ShadowedCondition2, imported from an ES module. The "import" target yields no
// declaration file, so resolution falls through to "types"; the "import" condition listed earlier must
// not be treated as shadowing it.
func TestAutoImportPackageJsonExportsShadowedCondition3(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /node_modules/pkg/package.json
{
  "name": "pkg",
  "version": "1.0.0",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  }
}
// @Filename: /node_modules/pkg/dist/index.d.ts
export declare const dep: number;
// @Filename: /package.json
{
  "type": "module",
  "dependencies": {
    "pkg": "*"
  }
}
// @Filename: /index.ts
dep/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"pkg"}, nil /*preferences*/)
}

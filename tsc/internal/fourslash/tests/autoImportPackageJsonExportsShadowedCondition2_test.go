package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// "types" is not a runtime condition, so the runtime conditions listed before it must not shadow
// it: the declaration file it names is exactly what TypeScript resolves "pkg" to.
func TestAutoImportPackageJsonExportsShadowedCondition2(t *testing.T) {
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

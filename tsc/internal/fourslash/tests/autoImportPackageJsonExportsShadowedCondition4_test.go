package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// The "node" target is a nested conditions object with only a "require" branch, so a Node ESM resolver
// matches "node", finds nothing under it, and falls through to "default". The earlier "node" condition
// must therefore only shadow "default" for resolvers that also have "require".
func TestAutoImportPackageJsonExportsShadowedCondition4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /node_modules/pkg/package.json
{
  "name": "pkg",
  "version": "1.0.0",
  "exports": {
    ".": {
      "node": {
        "require": "./dist/cjs.js"
      },
      "default": "./dist/esm.js"
    }
  }
}
// @Filename: /node_modules/pkg/dist/cjs.d.ts
export declare const fromCjs: number;
// @Filename: /node_modules/pkg/dist/esm.d.ts
export declare const fromEsm: number;
// @Filename: /package.json
{
  "dependencies": {
    "pkg": "*"
  }
}
// @Filename: /esm.mts
fromEsm/*esm*/;
// @Filename: /cjs.cts
fromEsm/*cjsDefault*/;
// @Filename: /cjs2.cts
fromCjs/*cjsRequire*/;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "esm", []string{"pkg"}, nil /*preferences*/)
	f.VerifyImportFixModuleSpecifiers(t, "cjsDefault", []string{}, nil /*preferences*/)
	f.VerifyImportFixModuleSpecifiers(t, "cjsRequire", []string{"pkg"}, nil /*preferences*/)
}

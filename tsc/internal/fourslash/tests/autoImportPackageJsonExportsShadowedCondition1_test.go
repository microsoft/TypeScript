package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// "pkg" resolves through the active "node" condition to dist/node.d.ts, so a symbol that only
// exists in the shadowed "default" target (dist/index.d.ts) can't be imported from "pkg".
func TestAutoImportPackageJsonExportsShadowedCondition1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /node_modules/pkg/package.json
{
  "name": "pkg",
  "version": "1.0.0",
  "exports": {
    ".": {
      "node": "./dist/node.js",
      "default": "./dist/index.js"
    }
  }
}
// @Filename: /node_modules/pkg/dist/node.d.ts
export declare const fromNode: number;
// @Filename: /node_modules/pkg/dist/index.d.ts
export declare const fromDefault: number;
// @Filename: /package.json
{
  "dependencies": {
    "pkg": "*"
  }
}
// @Filename: /a.ts
fromNode/*1*/;
// @Filename: /b.ts
fromDefault/*2*/;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "1", []string{"pkg"}, nil /*preferences*/)
	f.VerifyImportFixModuleSpecifiers(t, "2", []string{}, nil /*preferences*/)
}

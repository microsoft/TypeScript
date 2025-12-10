package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportPackageJsonExportsSpecifierEndsInTs(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /node_modules/pkg/package.json
{
    "name": "pkg",
    "version": "1.0.0",
    "exports": {
      "./something.ts": "./a.js"
    }
 }
// @Filename: /node_modules/pkg/a.d.ts
export function foo(): void;
// @Filename: /package.json
{
    "dependencies": {
       "pkg": "*"
    }
 }
// @Filename: /index.ts
foo/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"pkg/something.ts"}, nil /*preferences*/)
}

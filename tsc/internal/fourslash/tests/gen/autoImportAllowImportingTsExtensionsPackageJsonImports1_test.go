package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportAllowImportingTsExtensionsPackageJsonImports1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
// @module: node18
// @allowImportingTsExtensions: true
// @Filename: /node_modules/pkg/package.json
{
  "name": "pkg",
  "type": "module",
  "exports": {
    "./*": {
      "types": "./types/*",
      "default": "./dist/*"
    }
  }
}
// @Filename: /node_modules/pkg/types/external.d.ts
export declare function external(name: string): any;
// @Filename: /package.json
{
  "name": "self",
  "type": "module",
  "imports": {
    "#*": "./src/*"
  },
  "dependencies": {
    "pkg": "*"
  }
}
// @Filename: /src/add.ts
export function add(a: number, b: number) {}
// @Filename: /src/index.ts
add/*imports*/;
external/*exports*/;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "imports", []string{"#add.ts"}, nil /*preferences*/)
	f.VerifyImportFixModuleSpecifiers(t, "exports", []string{"pkg/external.js"}, nil /*preferences*/)
}

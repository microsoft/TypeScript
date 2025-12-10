package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportAllowImportingTsExtensionsPackageJsonImports2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "rootDir": "src",
    "outDir": "dist",
    "declarationDir": "types",
    "declaration": true
  }
}
// @Filename: /package.json
{
  "name": "self",
  "type": "module",
  "imports": {
    "#*": {
      "types": "./types/*",
      "default": "./dist/*"
    }
  }
}
// @Filename: /src/add.ts
export function add(a: number, b: number) {}
// @Filename: /src/index.ts
add/*imports*/;
external/*exports*/;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "imports", []string{"#add.js"}, nil /*preferences*/)
}

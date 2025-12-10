package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportPackageJsonImports_capsInPath1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /Dev/package.json
{
  "imports": {
    "#thing": "./src/something.js"
  }
}
// @Filename: /Dev/src/something.ts
export function something(name: string): any;
// @Filename: /Dev/a.ts
something/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"#thing"}, nil /*preferences*/)
}

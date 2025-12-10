package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportsCustomConditions(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @moduleResolution: bundler
// @customConditions: custom
// @Filename: /node_modules/dep/package.json
{
  "name": "dep",
  "version": "1.0.0",
  "exports": {
    ".": {
      "custom": "./dist/index.js"
    }
  }
}
// @Filename: /node_modules/dep/dist/index.d.ts
export const dep: number;
// @Filename: /index.ts
dep/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"dep"}, nil /*preferences*/)
}

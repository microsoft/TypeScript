package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportBundlerBlockRelativeNodeModulesPaths(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @moduleResolution: bundler
// @Filename: /node_modules/dep/package.json
{
  "name": "dep",
  "version": "1.0.0",
  "exports": "./dist/index.js"
}
// @Filename: /node_modules/dep/dist/utils.d.ts
export const util: () => void;
// @Filename: /node_modules/dep/dist/index.d.ts
export * from "./utils";
// @Filename: /index.ts
util/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"dep"}, nil /*preferences*/)
}

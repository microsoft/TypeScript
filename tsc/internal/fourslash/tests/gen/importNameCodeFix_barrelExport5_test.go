package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_barrelExport5(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /package.json
{ "type": "module" }
// @Filename: /foo/a.ts
export const A = 0;
// @Filename: /foo/b.ts
export {};
A/*sibling*/
// @Filename: /foo/index.ts
export * from "./a.js";
export * from "./b.js";
// @Filename: /index.ts
export * from "./foo/index.js";
export * from "./src/index.js";
// @Filename: /src/a.ts
export {};
A/*parent*/
// @Filename: /src/index.ts
export * from "./a.js";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "sibling", []string{"./a.js", "./index.js", "../index.js"}, nil /*preferences*/)
	f.VerifyImportFixModuleSpecifiers(t, "parent", []string{"../foo/a.js", "../foo/index.js", "../index.js"}, nil /*preferences*/)
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_barrelExport3(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @Filename: /foo/a.ts
export const A = 0;
// @Filename: /foo/b.ts
export {};
A/*sibling*/
// @Filename: /foo/index.ts
export * from "./a";
export * from "./b";
// @Filename: /index.ts
export * from "./foo";
export * from "./src";
// @Filename: /src/a.ts
export {};
A/*parent*/
// @Filename: /src/index.ts
export * from "./a";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "sibling", []string{"./a", "./index", "../index"}, &lsutil.UserPreferences{ImportModuleSpecifierEnding: "index"})
	f.VerifyImportFixModuleSpecifiers(t, "parent", []string{"../foo/a", "../foo/index", "../index"}, &lsutil.UserPreferences{ImportModuleSpecifierEnding: "index"})
}

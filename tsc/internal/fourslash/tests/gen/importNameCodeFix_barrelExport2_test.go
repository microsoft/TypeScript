package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_barrelExport2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @baseUrl: /
// @Filename: /proj/foo/a.ts
export const A = 0;
// @Filename: /proj/foo/b.ts
export {};
A/*sibling*/
// @Filename: /proj/foo/index.ts
export * from "./a";
export * from "./b";
// @Filename: /proj/index.ts
export * from "./foo";
export * from "./src";
// @Filename: /proj/src/a.ts
export {};
A/*parent*/
// @Filename: /proj/src/utils.ts
export function util() { return "util"; }
export { A } from "../foo/a";
// @Filename: /proj/src/index.ts
export * from "./a";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "sibling", []string{"proj/foo/a", "proj/src/utils", "proj", "proj/foo"}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "non-relative"})
	f.VerifyImportFixModuleSpecifiers(t, "parent", []string{"proj/foo", "proj/foo/a", "proj/src/utils", "proj"}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "non-relative"})
}

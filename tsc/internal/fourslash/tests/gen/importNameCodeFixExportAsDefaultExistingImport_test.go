package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixExportAsDefaultExistingImport(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import [|{ v1, v2, v3 }|] from "./module";
v4/*0*/();
// @Filename: module.ts
const v4 = 5;
export { v4 as default };
export const v1 = 5;
export const v2 = 5;
export const v3 = 5;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixAtPosition(t, []string{
		`v4, { v1, v2, v3 }`,
	}, nil /*preferences*/)
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestNavigationBarItemsItemsModuleVariables(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: navigationItemsModuleVariables_0.ts
 /*file1*/
namespace Module1 {
    export var x = 0;
}
// @Filename: navigationItemsModuleVariables_1.ts
 /*file2*/
namespace Module1.SubModule {
    export var y = 0;
}
// @Filename: navigationItemsModuleVariables_2.ts
 /*file3*/
namespace Module1 {
    export var z = 0;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "file1")
	f.VerifyBaselineDocumentSymbol(t)
	f.GoToMarker(t, "file2")
	f.VerifyBaselineDocumentSymbol(t)
}

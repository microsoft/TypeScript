package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsReExportLocal(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noLib: true
// @Filename: /a.ts
[|var /*ax0*/[|{| "isDefinition": true, "contextRangeIndex": 0 |}x|];|]
[|export { /*ax1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}x|] };|]
[|export { /*ax2*/[|{| "contextRangeIndex": 4 |}x|] as /*ay*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}y|] };|]
// @Filename: /b.ts
[|import { /*bx0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 7 |}x|], /*by0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 7 |}y|] } from "./a";|]
/*bx1*/[|x|]; /*by1*/[|y|];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineFindAllReferences(t, "ax0", "ax1", "ax2", "bx0", "bx1", "ay", "by0", "by1")
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[1], f.Ranges()[5])
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[3])
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[8], f.Ranges()[10])
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[6])
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[9], f.Ranges()[11])
}

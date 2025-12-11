package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTransitiveExportImports(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a.ts
[|class /*1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}A|] {
}|]
[|export = [|{| "contextRangeIndex": 2 |}A|];|]
// @Filename: b.ts
[|export import /*2*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}b|] = require('./a');|]
// @Filename: c.ts
[|import /*3*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}b|] = require('./b');|]
var a = new /*4*/[|b|]./**/[|b|]();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifyQuickInfoExists(t)
	f.VerifyNoErrors(t)
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3", "4")
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[1], f.Ranges()[3])
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[5], f.Ranges()[9])
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[7], f.Ranges()[8])
}

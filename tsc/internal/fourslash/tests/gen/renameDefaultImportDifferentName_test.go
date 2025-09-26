package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameDefaultImportDifferentName(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: B.ts
[|export default class /*1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}C|] {
    test() {
    }
}|]
// @Filename: A.ts
[|import /*2*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}B|] from "./B";|]
let b = new [|B|]();
b.test();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineFindAllReferences(t, "1", "2")
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[1])
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[3], f.Ranges()[4])
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, "1")
}

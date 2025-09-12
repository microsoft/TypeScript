package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameObjectSpreadAssignment(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface A1 { a: number };
interface A2 { a?: number };
[|let [|{| "contextRangeIndex": 0 |}a1|]: A1;|]
[|let [|{| "contextRangeIndex": 2 |}a2|]: A2;|]
let a12 = { ...[|a1|], ...[|a2|] };`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[1], f.Ranges()[4], f.Ranges()[3], f.Ranges()[5])
}

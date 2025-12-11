package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameDestructuringAssignmentInForOf(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    [|[|{| "contextRangeIndex": 0 |}property1|]: number;|]
    property2: string;
}
var elems: I[];

var [|[|{| "contextRangeIndex": 2 |}property1|]: number|], p2: number;
for ([|{ [|{| "contextRangeIndex": 4 |}property1|] } of elems|]) {
    [|property1|]++;
}
for ([|{ [|{| "contextRangeIndex": 7 |}property1|]: p2 } of elems|]) {
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[1], f.Ranges()[8], f.Ranges()[3], f.Ranges()[5], f.Ranges()[6])
}

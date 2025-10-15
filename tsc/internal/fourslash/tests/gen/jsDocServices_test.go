package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsDocServices(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface /*I*/I {}

/**
 * @param /*use*/[|foo|] I pity the foo
 */
function f([|[|/*def*/{| "contextRangeIndex": 1 |}foo|]: I|]) {
    return /*use2*/[|foo|];
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "use")
	f.VerifyQuickInfoIs(t, "(parameter) foo: I", "I pity the foo")
	f.VerifyBaselineFindAllReferences(t, "use", "def", "use2")
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[0], f.Ranges()[2], f.Ranges()[3])
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, f.Ranges()[0], f.Ranges()[2], f.Ranges()[3])
	f.VerifyBaselineGoToTypeDefinition(t, "use")
	f.VerifyBaselineGoToDefinition(t, "use")
}

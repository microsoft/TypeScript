package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsdocTypedefTagServices(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: a.js
/**
 * Doc comment
 * [|@typedef /*def*/[|{| "contextRangeIndex": 0 |}Product|]
 * @property {string} title
 |]*/
/**
 * @type {[|/*use*/Product|]}
 */
const product = null;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "use", "type Product = {\n    title: string;\n}", "Doc comment")
	f.VerifyBaselineFindAllReferences(t, "use", "def")
	f.VerifyBaselineRename(t, nil /*preferences*/, ToAny(f.Ranges()[1:])...)
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Ranges()[1:])...)
	f.VerifyBaselineGoToDefinition(t, "use")
}

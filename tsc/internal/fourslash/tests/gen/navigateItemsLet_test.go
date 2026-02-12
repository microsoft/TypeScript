package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNavigateItemsLet(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noLib: true
let [|c = 10|];
function foo() {
    let [|d = 10|];
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWorkspaceSymbol(t, []*fourslash.VerifyWorkspaceSymbolCase{
		{
			Pattern:     "c",
			Preferences: nil,
			Exact: new([]*lsproto.SymbolInformation{
				{
					Name:     "c",
					Kind:     lsproto.SymbolKindVariable,
					Location: f.Ranges()[0].LSLocation(),
				},
			}),
		}, {
			Pattern:     "d",
			Preferences: nil,
			Exact: new([]*lsproto.SymbolInformation{
				{
					Name:          "d",
					Kind:          lsproto.SymbolKindVariable,
					Location:      f.Ranges()[1].LSLocation(),
					ContainerName: new("foo"),
				},
			}),
		},
	})
}

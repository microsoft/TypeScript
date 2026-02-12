package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNavigationItemsInConstructorsExactMatch(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noLib: true
class Test {
    [|private search1: number;|]
    constructor([|public search2: boolean|], [|readonly search3: string|], search4: string) {
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWorkspaceSymbol(t, []*fourslash.VerifyWorkspaceSymbolCase{
		{
			Pattern:     "search",
			Preferences: nil,
			Exact: new([]*lsproto.SymbolInformation{
				{
					Name:          "search1",
					Kind:          lsproto.SymbolKindProperty,
					Location:      f.Ranges()[0].LSLocation(),
					ContainerName: new("Test"),
				},
				{
					Name:          "search2",
					Kind:          lsproto.SymbolKindProperty,
					Location:      f.Ranges()[1].LSLocation(),
					ContainerName: new("Test"),
				},
				{
					Name:          "search3",
					Kind:          lsproto.SymbolKindProperty,
					Location:      f.Ranges()[2].LSLocation(),
					ContainerName: new("Test"),
				},
			}),
		},
	})
}

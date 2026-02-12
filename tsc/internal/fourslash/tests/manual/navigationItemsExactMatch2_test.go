package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNavigationItemsExactMatch2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module Shapes {
    [|class Point {
        [|private _origin = 0.0;|]
        [|private distanceFromA = 0.0;|]

        [|get distance1(distanceParam): number {
            var [|distanceLocal|];
            return 0;
        }|]
    }|]
}

var [|point = new Shapes.Point()|];
[|function distance2(distanceParam1): void {
    var [|distanceLocal1|];
}|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWorkspaceSymbol(t, []*fourslash.VerifyWorkspaceSymbolCase{
		{
			Pattern:     "point",
			Preferences: nil,
			Exact: new([]*lsproto.SymbolInformation{
				{
					Name:          "Point",
					Kind:          lsproto.SymbolKindClass,
					Location:      f.Ranges()[0].LSLocation(),
					ContainerName: new("Shapes"),
				},
				{
					Name:     "point",
					Kind:     lsproto.SymbolKindVariable,
					Location: f.Ranges()[5].LSLocation(),
				},
			}),
		}, {
			Pattern:     "distance",
			Preferences: nil,
			Exact: new([]*lsproto.SymbolInformation{
				{
					Name:          "distance1",
					Kind:          lsproto.SymbolKindProperty,
					Location:      f.Ranges()[3].LSLocation(),
					ContainerName: new("Point"),
				},
				{
					Name:     "distance2",
					Kind:     lsproto.SymbolKindFunction,
					Location: f.Ranges()[6].LSLocation(),
				},
				{
					Name:          "distanceFromA",
					Kind:          lsproto.SymbolKindProperty,
					Location:      f.Ranges()[2].LSLocation(),
					ContainerName: new("Point"),
				},
				{
					Name:          "distanceLocal",
					Kind:          lsproto.SymbolKindVariable,
					Location:      f.Ranges()[4].LSLocation(),
					ContainerName: new("distance1"),
				},
				{
					Name:          "distanceLocal1",
					Kind:          lsproto.SymbolKindVariable,
					Location:      f.Ranges()[7].LSLocation(),
					ContainerName: new("distance2"),
				},
			}),
		}, {
			Pattern:     "origin",
			Preferences: nil,
			Exact: new([]*lsproto.SymbolInformation{
				{
					Name:          "_origin",
					Kind:          lsproto.SymbolKindProperty,
					Location:      f.Ranges()[1].LSLocation(),
					ContainerName: new("Point"),
				},
			}),
		}, {
			Pattern:     "square",
			Preferences: nil,
			Exact:       new([]*lsproto.SymbolInformation{}),
		},
	})
}

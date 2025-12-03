package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
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
			Exact: PtrTo([]*lsproto.SymbolInformation{
				{
					Name:          "Point",
					Kind:          lsproto.SymbolKindClass,
					Location:      f.Ranges()[0].LSLocation(),
					ContainerName: PtrTo("Shapes"),
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
			Exact: PtrTo([]*lsproto.SymbolInformation{
				{
					Name:          "distance1",
					Kind:          lsproto.SymbolKindProperty,
					Location:      f.Ranges()[3].LSLocation(),
					ContainerName: PtrTo("Point"),
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
					ContainerName: PtrTo("Point"),
				},
				{
					Name:          "distanceLocal",
					Kind:          lsproto.SymbolKindVariable,
					Location:      f.Ranges()[4].LSLocation(),
					ContainerName: PtrTo("distance1"),
				},
				{
					Name:          "distanceLocal1",
					Kind:          lsproto.SymbolKindVariable,
					Location:      f.Ranges()[7].LSLocation(),
					ContainerName: PtrTo("distance2"),
				},
			}),
		}, {
			Pattern:     "origin",
			Preferences: nil,
			Exact: PtrTo([]*lsproto.SymbolInformation{
				{
					Name:          "_origin",
					Kind:          lsproto.SymbolKindProperty,
					Location:      f.Ranges()[1].LSLocation(),
					ContainerName: PtrTo("Point"),
				},
			}),
		}, {
			Pattern:     "square",
			Preferences: nil,
			Exact:       PtrTo([]*lsproto.SymbolInformation{}),
		},
	})
}

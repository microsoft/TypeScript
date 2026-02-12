package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNavigationItemsPrefixMatch2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
namespace Shapes {
    export class Point {
        [|private originality = 0.0;|]
        [|private distanceFromOrig = 0.0;|]
        [|get distanceFarFarAway(distanceFarFarAwayParam: number): number {
            var [|distanceFarFarAwayLocal|];
            return 0;
        }|]
    }
}
var pointsSquareBox = new Shapes.Point();
function PointsFunc(): void {
 var pointFuncLocal;
}
[|interface OriginI {
    123;
    [|origin1;|]
    [|public _distance(distanceParam): void;|]
}|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWorkspaceSymbol(t, []*fourslash.VerifyWorkspaceSymbolCase{
		{
			Pattern:     "origin",
			Preferences: nil,
			Exact: new([]*lsproto.SymbolInformation{
				{
					Name:          "origin1",
					Kind:          lsproto.SymbolKindProperty,
					Location:      f.Ranges()[5].LSLocation(),
					ContainerName: new("OriginI"),
				},
				{
					Name:          "originality",
					Kind:          lsproto.SymbolKindProperty,
					Location:      f.Ranges()[0].LSLocation(),
					ContainerName: new("Point"),
				},
				{
					Name:     "OriginI",
					Kind:     lsproto.SymbolKindInterface,
					Location: f.Ranges()[4].LSLocation(),
				},
			}),
		}, {
			Pattern:     "distance",
			Preferences: nil,
			Exact: new([]*lsproto.SymbolInformation{
				{
					Name:          "distanceFarFarAway",
					Kind:          lsproto.SymbolKindProperty,
					Location:      f.Ranges()[2].LSLocation(),
					ContainerName: new("Point"),
				},
				{
					Name:          "distanceFarFarAwayLocal",
					Kind:          lsproto.SymbolKindVariable,
					Location:      f.Ranges()[3].LSLocation(),
					ContainerName: new("distanceFarFarAway"),
				},
				{
					Name:          "distanceFromOrig",
					Kind:          lsproto.SymbolKindProperty,
					Location:      f.Ranges()[1].LSLocation(),
					ContainerName: new("Point"),
				},
				{
					Name:          "_distance",
					Kind:          lsproto.SymbolKindMethod,
					Location:      f.Ranges()[6].LSLocation(),
					ContainerName: new("OriginI"),
				},
			}),
		}, {
			Pattern:     "mPointThatIJustInitiated wrongKeyWord",
			Preferences: nil,
			Exact:       new([]*lsproto.SymbolInformation{}),
		},
	})
}

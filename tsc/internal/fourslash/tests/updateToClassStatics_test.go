package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestUpdateToClassStatics(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace TypeScript {
    export class PullSymbol {}
    export class Diagnostic {}
    export class SymbolAndDiagnostics<TSymbol extends PullSymbol> {
        constructor(public symbol: TSymbol,
            public diagnostics: Diagnostic) {
        }
        /**/
        public static create<TSymbol extends PullSymbol>(symbol: TSymbol, diagnostics: Diagnostic): SymbolAndDiagnostics<TSymbol> {
            return new SymbolAndDiagnostics<TSymbol>(symbol, diagnostics);
        }
    }
}
namespace TypeScript {
    var x : TypeScript.SymbolAndDiagnostics;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.Insert(t, "someNewProperty = 0;")
}

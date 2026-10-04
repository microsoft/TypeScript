package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestTypeReferenceAndImportDeprecated(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: types.ts
/** @deprecated */
export type SelectorMap<T extends Record<string, (...params: unknown[]) => unknown>> = {
    [key in keyof T]: T[key];
};
// @filename: index.ts
/** @deprecated */
export type SelectorMap<T extends Record<string, (...params: unknown[]) => unknown>> = {
    [key in keyof T]: T[key];
};

export declare const value2: {
    sliceSelectors: <FuncMap extends [|import('./types').SelectorMap<FuncMap>|]>(selectorsBySlice: FuncMap) => { [P in keyof FuncMap]: Parameters<FuncMap[P]> };
};

export declare const value3: {
    sliceSelectors: <FuncMap extends [|SelectorMap<FuncMap>|]>(selectorsBySlice: FuncMap) => { [P in keyof FuncMap]: Parameters<FuncMap[P]> };
};`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "index.ts")
	f.VerifySuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: lsproto.StringOrMarkupContent{String: new("'SelectorMap' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[0].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: lsproto.StringOrMarkupContent{String: new("'SelectorMap' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[1].LSRange,
		},
	})
}

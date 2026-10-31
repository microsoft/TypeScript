package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestEnumComputedPropertyNameDeprecated(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `enum CHAR {
    [|['\t']|] = 0x09,
    [|["\n"]|] = 0x0A,
    [|[` + "`\\r`" + `]|] = 0x0D,
    'space' = 0x20,
}
enum Names {
    A,
    "quoted",
    [|["key"]|],
    [|["Infinity"]|],
    [|["NaN"]|],
}
const enum Constants {
    [|["constant"]|] = 1,
}
declare enum Ambient {
    [|["ambient"]|],
}
const object = { ["key"]: 1 };
class C { ["key"] = 1; }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	var diagnostics []*lsproto.Diagnostic
	for _, r := range f.Ranges() {
		diagnostics = append(diagnostics, &lsproto.Diagnostic{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(80011))},
			Message: lsproto.StringOrMarkupContent{String: new("Using a string literal as an enum member name via a computed property is deprecated. Use a simple string literal instead.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   r.LSRange,
		})
	}
	f.VerifyNonSuggestionDiagnostics(t, nil)
	f.VerifySuggestionDiagnostics(t, diagnostics)
}

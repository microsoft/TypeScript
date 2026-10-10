package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestEnumComputedPropertyNameError(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const key = "dynamic";
enum Invalid {
    [|[key]|] = 1,
    [|["a" + "b"]|] = 2,
    [|[{}]|] = 3,
    [|[1]|] = 4,
    [|[0x20]|] = 5,
    [|["42"]|] = 6,
    [|[` + "`43`" + `]|] = 7,
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	var diagnostics []*lsproto.Diagnostic
	for i, r := range f.Ranges() {
		code := int32(1164)
		message := "Computed property names are not allowed in enums."
		if i >= 3 {
			code = 2452
			message = "An enum member cannot have a numeric name."
		}
		diagnostics = append(diagnostics, &lsproto.Diagnostic{
			Code:    &lsproto.IntegerOrString{Integer: &code},
			Message: lsproto.StringOrMarkupContent{String: &message},
			Range:   r.LSRange,
		})
	}
	f.VerifyNonSuggestionDiagnostics(t, diagnostics)
	f.VerifySuggestionDiagnostics(t, nil)
	f.VerifyCodeFixNotAvailable(t)
}

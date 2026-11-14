package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestDeprecatedSignatureMemberName(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: /a.ts
interface Schema {
    /** @deprecated */
    passthrough(): Schema;
}
declare function object(): Schema;
object().[|passthrough|]();
object()[[|"passthrough"|]]();
(object().[|passthrough|])();
class C {
    /** @deprecated */
    m() {}
    /** @deprecated */
    #p() {}
    n() {
        this.[|m|]();
        this.[|#p|]();
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifySuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: lsproto.StringOrMarkupContent{String: new("The signature '(): Schema' of 'passthrough' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[0].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: lsproto.StringOrMarkupContent{String: new("The signature '(): Schema' of 'passthrough' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[1].LSRange,
		},
		// A parenthesized callee also reports the deprecated property itself; that suggestion is unchanged.
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: lsproto.StringOrMarkupContent{String: new("'passthrough' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[2].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: lsproto.StringOrMarkupContent{String: new("The signature '(): Schema' of 'passthrough' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[2].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: lsproto.StringOrMarkupContent{String: new("The signature '(): void' of 'm' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[3].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: lsproto.StringOrMarkupContent{String: new("The signature '(): void' of '#p' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[4].LSRange,
		},
	})
}

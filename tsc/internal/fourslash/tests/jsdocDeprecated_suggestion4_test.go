package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestJsdocDeprecated_suggestion4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo {
    /** @deprecated */
    f: number
    b: number
    /** @deprecated */
    baz: number
}
declare const f: Foo
f.[|f|];
f.b;
f.[|baz|];
const kf = 'f'
const kb = 'b'
declare const k: 'f' | 'b' | 'baz'
declare const kfb: 'f' | 'b'
declare const kfz: 'f' | 'baz'
declare const keys: keyof Foo
f[[|kf|]]
f[kb]
f[k]
f[kfb]
f[kfz]
f[keys]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifySuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Message: lsproto.StringOrMarkupContent{String: new("'f' is deprecated.")},
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Range:   f.Ranges()[0].LSRange,
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
		},
		{
			Message: lsproto.StringOrMarkupContent{String: new("'baz' is deprecated.")},
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Range:   f.Ranges()[1].LSRange,
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
		},
		{
			Message: lsproto.StringOrMarkupContent{String: new("'f' is deprecated.")},
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Range:   f.Ranges()[2].LSRange,
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
		},
	})
}

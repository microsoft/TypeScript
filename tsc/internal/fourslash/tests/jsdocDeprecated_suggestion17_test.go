package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestJsdocDeprecated_suggestion17(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: foo.ts
interface Foo {
    /** @deprecated */
    [k: string]: any;
    /** @deprecated please use ` + "`" + `.y` + "`" + ` instead  */
    x: number;
    y: number;
}
function f(foo: Foo) {
    foo.[|x|];
    foo.[|y|];
    foo.[|z|];
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifySuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: lsproto.StringOrMarkupContent{String: new("'x' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[0].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: lsproto.StringOrMarkupContent{String: new("'z' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[2].LSRange,
		},
	})
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsdocDeprecated_suggestion4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
// @filename: a.tsx
interface Props {
    /** @deprecated */
    x: number
    y: number
}
function A(props: Props) {
    return <div>{props.y}</div>
}
function B() {
    return <A [|x|]={1} y={1} />
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "a.tsx")
	f.VerifySuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Message: lsproto.StringOrMarkupContent{String: new("'x' is deprecated.")},
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Range:   f.Ranges()[0].LSRange,
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
		},
	})
}

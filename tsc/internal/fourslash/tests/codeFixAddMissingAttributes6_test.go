package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingAttributes6(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
// @filename: foo.tsx
interface P {
    a: number;
    b: string;
    c: number[];
    d: any;
}

const A = ({ a, b, c, d }: P) =>
    <div>{a}{b}{c}{d}</div>;

const props = { a: 1, b: "", c: [], d: undefined };
const Bar = () =>
    <A {...props}></A>`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content+addMissingAttributesJsxDeclarations)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyCodeFixNotAvailable(t, diagnostics.Add_missing_attributes.Localize(locale.Default))
}

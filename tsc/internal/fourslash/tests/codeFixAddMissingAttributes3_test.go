package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingAttributes3(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
// @Filename: a.tsx
interface P {
    a: number;
    b: string;
    c: number[];
    d: any;
}

const A = ({ a, b, c, d }: P) =>
    <div>{a}{b}{c}{d}</div>;

const B = () =>
    <A[||] {...{ a: 1, b: "" }}></A>`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content+addMissingAttributesJsxDeclarations)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description:     diagnostics.Add_missing_attributes.Localize(locale.Default),
		NewRangeContent: ` c={[]} d={undefined}`,
		ApplyChanges:    true,
	})
	f.VerifyNoErrors(t)
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingAttributes2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
// @Filename: a.tsx
interface P {
    a: number;
    b: string;
}

const A = ({ a, b }: P) =>
    <div>{a}{b}</div>;

const B = () =>
    <A a={100}[||]></A>`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content+addMissingAttributesJsxDeclarations)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description:     diagnostics.Add_missing_attributes.Localize(locale.Default),
		NewRangeContent: ` b={""}`,
		ApplyChanges:    true,
	})
	f.VerifyNoErrors(t)
}

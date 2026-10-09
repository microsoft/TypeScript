package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingAttributes_all(t *testing.T) {
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
const b = { a: 1, b: "" };

const C1 = () =>
    <A a={1} b={""}></A>
const C2 = () =>
    <A {...b}></A>
const C3 = () =>
    <A c={[]} {...b}></A>
const C4 = () =>
    <A></A>`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content+addMissingAttributesJsxDeclarations)
	defer done()
	f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
		FixID:       "fixMissingAttributes",
		Description: diagnostics.Add_all_missing_attributes.Localize(locale.Default),
		NewFileContent: `interface P {
    a: number;
    b: string;
    c: number[];
    d: any;
}
const A = ({ a, b, c, d }: P) =>
    <div>{a}{b}{c}{d}</div>;
const b = { a: 1, b: "" };

const C1 = () =>
    <A a={1} b={""} c={[]} d={undefined}></A>
const C2 = () =>
    <A c={[]} d={undefined} {...b}></A>
const C3 = () =>
    <A d={undefined} c={[]} {...b}></A>
const C4 = () =>
    <A a={0} b={""} c={[]} d={undefined}></A>` + addMissingAttributesJsxDeclarations,
	})
	f.VerifyNoErrors(t)
}

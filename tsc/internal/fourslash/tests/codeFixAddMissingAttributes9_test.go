package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingAttributes9(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
// @Filename: a.tsx
type A = 'a-' | 'b-';
type B = 'd' | 'c';
type C = ` + "`" + `${A}${B}` + "`" + `;

const A = (b: { [K in C]: K }) =>
    <div {...b}></div>;

const B = () =>
    <A[||]></A>`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content+addMissingAttributesJsxDeclarations)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description:     diagnostics.Add_missing_attributes.Localize(locale.Default),
		NewRangeContent: ` a-c={"a-c"} a-d={"a-d"} b-c={"b-c"} b-d={"b-d"}`,
		ApplyChanges:    true,
	})
	f.VerifyNoErrors(t)
}

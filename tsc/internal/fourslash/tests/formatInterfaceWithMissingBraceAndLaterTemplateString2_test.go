package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatInterfaceWithMissingBraceAndLaterTemplateString2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @Filename: /FormCheck.tsx
interface FormCheckProps {

const FormCheck: DynamicRefForwardingComponent<'input', FormCheckProps> =
  React.forwardRef(
	    () => {
	      return <div className={` + "`" + `${bsPrefix}-reverse` + "`" + `} />;
    },
  );

FormCheck.displayName = 'FormCheck';
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `interface FormCheckProps {

const FormCheck: DynamicRefForwardingComponent<'input', FormCheckProps> =
    React.forwardRef(
        () => {
            return <div className={`+"`"+`${bsPrefix}-reverse`+"`"+`} />;
        },
    );

FormCheck.displayName = 'FormCheck';
`)
}

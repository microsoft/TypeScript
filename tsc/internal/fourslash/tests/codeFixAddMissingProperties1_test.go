package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingProperties1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type T = { a: number; b: string }
const t: T = {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: diagnostics.Add_missing_properties.Localize(locale.Default),
		NewFileContent: `type T = { a: number; b: string }
const t: T = {
    a: 0,
    b: ""
}`,
		ApplyChanges: true,
	})
	f.VerifyNoErrors(t)
}

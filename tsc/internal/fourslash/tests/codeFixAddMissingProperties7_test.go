package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingProperties7(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type T = { a: T };
const a: T = {};`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: diagnostics.Add_missing_properties.Localize(locale.Default),
		NewFileContent: `type T = { a: T };
const a: T = {
    a: {
        a: undefined
    }
};`,
	})
}

func TestCodeFixAddMissingProperties7_1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type T<U> = { a: T<U[]> };
const a: T<number> = {};`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: diagnostics.Add_missing_properties.Localize(locale.Default),
		NewFileContent: `type T<U> = { a: T<U[]> };
const a: T<number> = {
    a: {
        a: {
            a: {
                a: undefined
            }
        }
    }
};`,
		ApplyChanges: true,
	})
}

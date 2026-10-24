package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingProperties9(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
type T<U> = { a: U };
const a: T<T<T<T<T<T<T<T<T<T<T<T<number>>>>>>>>>>>> = {};`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: diagnostics.Add_missing_properties.Localize(locale.Default),
		NewFileContent: `type T<U> = { a: U };
const a: T<T<T<T<T<T<T<T<T<T<T<T<number>>>>>>>>>>>> = {
    a: {
        a: {
            a: {
                a: {
                    a: {
                        a: {
                            a: {
                                a: {
                                    a: {
                                        a: {
                                            a: {
                                                a: 0
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};`,
		ApplyChanges: true,
	})
	f.VerifyNoErrors(t)
}

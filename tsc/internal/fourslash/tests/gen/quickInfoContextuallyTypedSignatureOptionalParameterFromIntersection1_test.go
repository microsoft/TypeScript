package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoContextuallyTypedSignatureOptionalParameterFromIntersection1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
const optionals: ((a?: number) => unknown) & ((b?: string) => unknown) = (
  arg,
) =/**/> {};`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "", "function(arg: string | number | undefined): void", "")
}

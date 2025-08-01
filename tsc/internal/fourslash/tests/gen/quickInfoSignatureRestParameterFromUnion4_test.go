package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoSignatureRestParameterFromUnion4(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare const fn:
  | ((a?: { x: number }, b?: { x: number }) => number)
  | ((...a: { y: number }[]) => number);

/**/fn();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "", "const fn: (a?: {\n    x: number;\n} & {\n    y: number;\n}, b?: {\n    x: number;\n} & {\n    y: number;\n}, ...args: {\n    y: number;\n}[]) => number", "")
}

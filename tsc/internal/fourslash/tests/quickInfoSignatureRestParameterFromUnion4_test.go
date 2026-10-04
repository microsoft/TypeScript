package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoSignatureRestParameterFromUnion4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare const fn:
  | ((a?: { x: number }, b?: { x: number }) => number)
  | ((...a: { y: number }[]) => number);

/**/fn();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "", "const fn: (a?: {\n    x: number;\n} & {\n    y: number;\n}, b?: {\n    x: number;\n} & {\n    y: number;\n}, ...args: {\n    y: number;\n}[]) => number", "")
}

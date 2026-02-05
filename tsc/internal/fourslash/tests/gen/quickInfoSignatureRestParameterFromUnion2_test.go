package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoSignatureRestParameterFromUnion2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
declare const rest:
  | ((a?: { a: true }, ...rest: string[]) => unknown)
  | ((b?: { b: true }) => unknown);

/**/rest({ a: true, b: true }, "foo", "bar");`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "", "const rest: (arg0?: {\n    a: true;\n} & {\n    b: true;\n}, ...rest: string[]) => unknown", "")
}

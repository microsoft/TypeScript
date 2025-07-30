package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnJsxIntrinsicDeclaredUsingTemplateLiteralTypeSignatures(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: react
// @filename: /a.tsx
declare namespace JSX {
  interface IntrinsicElements {
    [k: ` + "`" + `foo${string}` + "`" + `]: any;
    [k: ` + "`" + `foobar${string}` + "`" + `]: any;
  }
}
</*1*/foobaz />;
</*2*/foobarbaz />;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}

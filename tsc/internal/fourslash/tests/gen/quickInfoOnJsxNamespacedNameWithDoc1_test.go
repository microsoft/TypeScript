package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnJsxNamespacedNameWithDoc1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: react
// @Filename: /types.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'my-el': {
      /** This appears */
      foo: string;

      /** This also appears */
      'prop:foo': string;
    };
  }
}
// @filename: /a.tsx
<my-el /*1*/prop:foo="bar" /*2*/foo="baz" />`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(property) 'prop:foo': string", "This also appears")
	f.VerifyQuickInfoAt(t, "2", "(property) foo: string", "This appears")
}

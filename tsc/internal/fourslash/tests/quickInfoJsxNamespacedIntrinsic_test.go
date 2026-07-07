package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJsxNamespacedIntrinsic(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: react
// @Filename: /a.tsx
declare const React: any;
declare namespace JSX {
    interface Element {}
    interface IntrinsicElements {
        /** Element docs */
        "foo:bar": {
            /** Foo docs */
            foo: boolean
            /** Bar docs */
            bar: string
        }
    }
}
<foo:ba/*tag*/r fo/*attr*/o />`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "tag", "(property) JSX.IntrinsicElements[\"foo:bar\"]: {\n    foo: boolean;\n    bar: string;\n}", "Element docs")
	f.VerifyQuickInfoAt(t, "attr", "(property) foo: boolean", "Foo docs")
}

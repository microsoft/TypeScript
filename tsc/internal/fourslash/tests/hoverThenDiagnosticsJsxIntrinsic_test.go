package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Regression test for https://github.com/microsoft/typescript-go/issues/3638
//
// A `textDocument/hover` on a JSX intrinsic element used to cause the
// subsequent `textDocument/diagnostic` pull to spuriously report
// TS2304: Cannot find name 'div'.
func TestHoverThenDiagnosticsJsxIntrinsic(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{ "compilerOptions": { "strict": true, "jsx": "preserve" } }
// @Filename: /jsx.d.ts
declare namespace JSX {
    interface Element { }
    interface IntrinsicElements {
        div: any;
    }
}
// @Filename: /file.tsx
export default function Home() {
    return <di/*1*/v>hi</div>;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	// Hover on the intrinsic element first...
	f.VerifyQuickInfoAt(t, "1", "(property) JSX.IntrinsicElements.div: any", "")
	// ...then a subsequent diagnostic pull must not invent a TS2304 for `div`.
	f.VerifyNoErrors(t)
}

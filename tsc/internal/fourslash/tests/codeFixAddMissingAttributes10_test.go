package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingAttributes10(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
// @filename: foo.tsx
type A = 'a' | 'b' | 'c' | 'd' | 'e';
type B = 1 | 2 | 3;
type C = '@' | '!';
type D = ` + "`" + `${A}${Uppercase<A>}${B}${C}` + "`" + `;
const A = (props: { [K in D]: K }) =>
   <div {...props}></div>;

const Bar = () =>
   [|<A></A>|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFixNotAvailable(t, "fixMissingAttributes")
}

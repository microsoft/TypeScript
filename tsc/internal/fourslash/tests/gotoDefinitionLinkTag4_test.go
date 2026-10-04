package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGotoDefinitionLinkTag4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: a.ts
interface [|/*2*/Foo|] {
    foo: E.Foo;
}
// @Filename: b.ts
enum E {
    /** {@link /*1*/[|Foo|]} */
    Foo
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, false, "1")
}

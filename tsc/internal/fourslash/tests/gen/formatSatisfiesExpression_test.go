package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatSatisfiesExpression(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type Foo = "a" | "b" | "c";
const foo1 = ["a"] satisfies Foo[];
const foo2 = ["a"]satisfies Foo[];
const foo3 = ["a"]  satisfies Foo[];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `type Foo = "a" | "b" | "c";
const foo1 = ["a"] satisfies Foo[];
const foo2 = ["a"] satisfies Foo[];
const foo3 = ["a"] satisfies Foo[];`)
}

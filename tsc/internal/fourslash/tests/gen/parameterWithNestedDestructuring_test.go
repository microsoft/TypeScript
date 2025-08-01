package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestParameterWithNestedDestructuring(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[[{ a: 'hello', b: [1] }]]
  .map(([{ a, b: [c] }]) => /*1*/a + /*2*/c);
function f([[/*3*/a]]: [[string]], { b1: { /*4*/b2 } }: { b1: { b2: string; } }) {}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(parameter) a: string", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) c: number", "")
	f.VerifyQuickInfoAt(t, "3", "(parameter) a: string", "")
	f.VerifyQuickInfoAt(t, "4", "(parameter) b2: string", "")
}

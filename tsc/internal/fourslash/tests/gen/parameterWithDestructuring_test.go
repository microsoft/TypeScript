package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestParameterWithDestructuring(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const result = [{ a: 'hello' }]
    .map(({ /*1*/a }) => /*2*/a)
    .map(a => a);

const f1 = (a: (b: string[]) => void) => {};
f1(([a, b]) => { /*3*/a.charAt(0); });

function f2({/*4*/a }: { a: string; }, [/*5*/b]: [string]) {}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(parameter) a: string", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) a: string", "")
	f.VerifyQuickInfoAt(t, "3", "(parameter) a: string", "")
	f.VerifyQuickInfoAt(t, "4", "(parameter) a: string", "")
	f.VerifyQuickInfoAt(t, "5", "(parameter) b: string", "")
}

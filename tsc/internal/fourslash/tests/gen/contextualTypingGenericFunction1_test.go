package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestContextualTypingGenericFunction1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var obj: { f<T>(x: T): T } = { f: <S>(/*1*/x) => x };
var obj2: <T>(x: T) => T = <S>(/*2*/x) => x;

class C<T> {
    obj: <T>(x: T) => T
}
var c = new C();
c.obj = <S>(/*3*/x) => x;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(parameter) x: any", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) x: any", "")
	f.VerifyQuickInfoAt(t, "3", "(parameter) x: any", "")
}

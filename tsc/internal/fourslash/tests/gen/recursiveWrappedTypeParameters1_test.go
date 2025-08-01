package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRecursiveWrappedTypeParameters1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I<T> {
	a: T;
	b: I<T>;
	c: I<I<T>>;
}
var x: I<number>;
var y/*1*/y = x.c.c.c.c.c.b;
var a/*2*/a = x.a;
var b/*3*/b = x.b;
var c/*4*/c = x.c;
var d/*5*/d = x.c.a;
var e/*6*/e = x.c.b;
var f/*7*/f = x.c.c; `
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var yy: I<I<I<I<I<I<number>>>>>>", "")
	f.VerifyQuickInfoAt(t, "2", "var aa: number", "")
	f.VerifyQuickInfoAt(t, "3", "var bb: I<number>", "")
	f.VerifyQuickInfoAt(t, "4", "var cc: I<I<number>>", "")
	f.VerifyQuickInfoAt(t, "5", "var dd: I<number>", "")
	f.VerifyQuickInfoAt(t, "6", "var ee: I<I<number>>", "")
	f.VerifyQuickInfoAt(t, "7", "var ff: I<I<I<number>>>", "")
}

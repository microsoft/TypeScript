package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericTypeParamUnrelatedToArguments1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo<T> {
    new (x: number): Foo<T>;
}
declare var f/*1*/1: Foo<number>;
var f/*2*/2: Foo<number>;
var f/*3*/3 = new Foo(3);
var f/*4*/4: Foo<number> = new Foo(3);
var f/*5*/5 = new Foo<number>(3);
var f/*6*/6: Foo<number> = new Foo<number>(3);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var f1: Foo<number>", "")
	f.VerifyQuickInfoAt(t, "2", "var f2: Foo<number>", "")
	f.VerifyQuickInfoAt(t, "3", "var f3: any", "")
	f.VerifyQuickInfoAt(t, "4", "var f4: Foo<number>", "")
	f.VerifyQuickInfoAt(t, "5", "var f5: any", "")
	f.VerifyQuickInfoAt(t, "6", "var f6: Foo<number>", "")
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericWithSpecializedProperties3(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo<T, U> {
    x: Foo<T, U>;
    y: Foo<U, U>;
}
var f: Foo<number, string>;
var /*1*/xx = f.x;
var /*2*/yy = f.y;
var f2: Foo<string, number>;
var /*3*/x2 = f2.x;
var /*4*/y2 = f2.y;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var xx: Foo<number, string>", "")
	f.VerifyQuickInfoAt(t, "2", "var yy: Foo<string, string>", "")
	f.VerifyQuickInfoAt(t, "3", "var x2: Foo<string, number>", "")
	f.VerifyQuickInfoAt(t, "4", "var y2: Foo<number, number>", "")
}

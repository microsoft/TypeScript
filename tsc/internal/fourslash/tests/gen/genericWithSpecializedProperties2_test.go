package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericWithSpecializedProperties2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo<T> {
    y: Foo<number>;
    x: Foo<string>;
}
var f: Foo<string>;
var /*1*/x = f.x; 
var /*2*/y = f.y; 
var f2: Foo<number>;
var /*3*/x2 = f2.x; 
var /*4*/y2 = f2.y; `
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var x: Foo<string>", "")
	f.VerifyQuickInfoAt(t, "2", "var y: Foo<number>", "")
	f.VerifyQuickInfoAt(t, "3", "var x2: Foo<string>", "")
	f.VerifyQuickInfoAt(t, "4", "var y2: Foo<number>", "")
}

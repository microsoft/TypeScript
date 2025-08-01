package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestDefaultParamsAndContextualTypes(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface FooOptions {
    text?: string;
}
interface Foo {
    bar(xy: string, options?: FooOptions): void;
}
var o: Foo = {
    bar: function (x/*1*/y, opt/*2*/ions = {}) {
        // expect xy to have type string, and options to have type FooOptions in here
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(parameter) xy: string", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) options: FooOptions", "")
}

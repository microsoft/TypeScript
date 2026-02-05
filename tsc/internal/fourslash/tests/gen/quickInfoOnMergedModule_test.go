package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnMergedModule(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
namespace M2 {
    export interface A {
        foo: string;
    }
    var a: A;
    var r = a.foo + a.bar;
}
namespace M2 {
    export interface A {
        bar: number;
    }
    var a: A;
    var r = a.fo/*1*/o + a.bar;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "(property) M2.A.foo: string", "")
	f.VerifyNoErrors(t)
}

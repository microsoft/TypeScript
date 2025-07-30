package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnThis5(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noImplicitThis: true
const foo = {
    num: 0,
    f() {
        type Y = typeof th/*1*/is;
        type Z = typeof th/*2*/is.num;
    },
    g(this: number) {
        type X = typeof th/*3*/is;
    }
}
class Foo {
    num = 0;
    f() {
        type Y = typeof th/*4*/is;
        type Z = typeof th/*5*/is.num;
    }
    g(this: number) {
        type X = typeof th/*6*/is;
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}

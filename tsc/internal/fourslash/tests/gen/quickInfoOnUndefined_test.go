package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnUndefined(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo(a: string) {
}
foo(/*1*/undefined);
var x = {
    undefined: 10
};
x./*2*/undefined = 30;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var undefined", "")
	f.VerifyQuickInfoAt(t, "2", "(property) undefined: number", "")
}

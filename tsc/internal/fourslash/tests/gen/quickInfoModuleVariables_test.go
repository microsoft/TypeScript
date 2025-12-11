package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoModuleVariables(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var x = 1;
module M {
    export var x = 2;
    console.log(/*1*/x); // 2
}
module M {
    console.log(/*2*/x); // 2
}
module M {
    var x = 3;
    console.log(/*3*/x); // 3
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "var M.x: number", "")
	f.VerifyQuickInfoAt(t, "2", "var M.x: number", "")
	f.VerifyQuickInfoAt(t, "3", "var x: number", "")
}

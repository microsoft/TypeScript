package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoInFunctionTypeReference(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function map(fn: (variab/*1*/le1: string) => void) {
}
var x = <{ (fn: (va/*2*/riable2: string) => void, a: string): void; }> () => { };`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(parameter) variable1: string", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) variable2: string", "")
}

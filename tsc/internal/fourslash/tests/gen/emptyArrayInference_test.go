package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestEmptyArrayInference(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var x/*1*/x = true ? [1] : [undefined]; 
var y/*2*/y = true ? [1] : [];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "var xx: number[]", "")
	f.VerifyQuickInfoAt(t, "2", "var yy: number[]", "")
}

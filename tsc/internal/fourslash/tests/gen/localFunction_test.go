package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestLocalFunction(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function /*1*/foo() {
    function /*2*/bar2() {
    }
    var y = function /*3*/bar3() {
    }
}
var x = function /*4*/bar4() {
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "function foo(): void", "")
	f.VerifyQuickInfoAt(t, "2", "(local function) bar2(): void", "")
	f.VerifyQuickInfoAt(t, "3", "(local function) bar3(): void", "")
	f.VerifyQuickInfoAt(t, "4", "(local function) bar4(): void", "")
}

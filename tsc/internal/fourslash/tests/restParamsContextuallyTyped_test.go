package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestRestParamsContextuallyTyped(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var foo: Function = function (/*1*/a, /*2*/b, /*3*/c) { };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "(parameter) a: any", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) b: any", "")
	f.VerifyQuickInfoAt(t, "3", "(parameter) c: any", "")
}

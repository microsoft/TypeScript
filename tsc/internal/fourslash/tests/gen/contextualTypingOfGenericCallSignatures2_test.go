package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestContextualTypingOfGenericCallSignatures2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    <T>(x: T): void
}
function f6(x: <T extends I>(p: T) => void) { }
// x should not be contextually typed so this should be an error
f6(/**/x => x<number>())`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "", "(parameter) x: T extends I", "")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
}

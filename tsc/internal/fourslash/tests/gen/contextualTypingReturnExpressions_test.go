package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestContextualTypingReturnExpressions(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface A { }
var f44: (x: A) => (y: A) => A = /*1*/x => /*2*/y => /*3*/x;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(parameter) x: A", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) y: A", "")
	f.VerifyQuickInfoAt(t, "3", "(parameter) x: A", "")
}

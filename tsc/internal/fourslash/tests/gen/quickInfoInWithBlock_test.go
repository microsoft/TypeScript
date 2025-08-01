package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoInWithBlock(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `with (x) {
    function /*1*/f() { }
    var /*2*/b = /*3*/f;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "any", "")
	f.VerifyQuickInfoAt(t, "2", "any", "")
	f.VerifyQuickInfoAt(t, "3", "any", "")
}

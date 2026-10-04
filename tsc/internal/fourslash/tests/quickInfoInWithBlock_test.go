package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoInWithBlock(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `with (x) {
    function /*1*/f() { }
    var /*2*/b = /*3*/f;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "any", "")
	f.VerifyQuickInfoAt(t, "2", "any", "")
	f.VerifyQuickInfoAt(t, "3", "any", "")
}

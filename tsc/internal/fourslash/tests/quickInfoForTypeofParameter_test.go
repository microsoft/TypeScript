package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoForTypeofParameter(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo() {
    var y/*ref1*/1: string;
    var x: typeof y/*ref2*/1;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "ref1", "(local var) y1: string", "")
	f.VerifyQuickInfoAt(t, "ref2", "(local var) y1: string", "")
}

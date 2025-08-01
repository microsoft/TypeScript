package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForTypeofParameter(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo() {
    var y/*ref1*/1: string;
    var x: typeof y/*ref2*/1;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "ref1", "(local var) y1: string", "")
	f.VerifyQuickInfoAt(t, "ref2", "(local var) y1: string", "")
}

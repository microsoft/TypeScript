package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoTypeOfThisInStatics(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C {
    static foo() {
        var /*1*/r = this;
    }
    static get x() {
        var /*2*/r = this;
        return 1;
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "(local var) r: typeof C", "")
	f.VerifyQuickInfoAt(t, "2", "(local var) r: typeof C", "")
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestIncrementalResolveAccessor(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class c1 {
    get p1(): string {
        return "30";
    }
    set p1(a: number) {
        a = "30";
    }
}
var val = new c1();
var b = val.p1;
/*1*/b;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "var b: string", "")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
}

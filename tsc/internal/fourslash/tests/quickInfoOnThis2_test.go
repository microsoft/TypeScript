package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoOnThis2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Bar<T> {
    public explicitThis(this: this) {
        console.log(th/*1*/is);
    }
    public explicitClass(this: Bar<T>) {
        console.log(thi/*2*/s);
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "this: this", "")
	f.VerifyQuickInfoAt(t, "2", "this: Bar<T>", "")
}

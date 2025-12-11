package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingCommentsBeforeErrors(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module A {
    interface B {
        // a
        // b
        baz();
/*0*/        // d /*1*/asd a
        // e
        foo();
        // f asd
        // g as
        bar();
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.Insert(t, "\n")
	f.GoToMarker(t, "0")
	f.VerifyCurrentLineContentIs(t, "        // d ")
}

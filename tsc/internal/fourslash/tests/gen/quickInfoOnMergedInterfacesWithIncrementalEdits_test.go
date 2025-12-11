package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnMergedInterfacesWithIncrementalEdits(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module MM {
    interface B<T> {
        foo: number;
    }
    interface B<T> {
        bar: string;
    }
    var b: B<string>;
    var r3 = b.foo; // number
    var r/*2*/4 = b.b/*1*/ar; // string
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifyQuickInfoIs(t, "(property) B<string>.bar: string", "")
	f.DeleteAtCaret(t, 1)
	f.Insert(t, "z")
	f.VerifyQuickInfoIs(t, "any", "")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
	f.Backspace(t, 1)
	f.Insert(t, "a")
	f.VerifyQuickInfoIs(t, "(property) B<string>.bar: string", "")
	f.GoToMarker(t, "2")
	f.VerifyQuickInfoIs(t, "var r4: string", "")
	f.VerifyNoErrors(t)
}

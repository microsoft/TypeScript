package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestEditLambdaArgToTypeParameter1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C<T> {
    foo(x: T) {
        return (a: number/*1*/) => x;
    }
}
/*2*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.Backspace(t, 6)
	f.Insert(t, "T")
	f.VerifyNoErrors(t)
	f.GoToMarker(t, "2")
	f.InsertLine(t, "")
	f.VerifyNoErrors(t)
}

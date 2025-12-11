package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericMethodParam(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C<T> {
    /*1*/
}
/*2*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.GoToMarker(t, "1")
	f.InsertLine(t, "constructor(){}")
	f.InsertLine(t, "foo(a: T) {")
	f.InsertLine(t, "    return a;")
	f.InsertLine(t, "}")
	f.VerifyNoErrors(t)
	f.GoToMarker(t, "2")
	f.InsertLine(t, "var x = new C<number>();")
	f.InsertLine(t, "var y: number = x.foo(5);")
	f.VerifyNoErrors(t)
}

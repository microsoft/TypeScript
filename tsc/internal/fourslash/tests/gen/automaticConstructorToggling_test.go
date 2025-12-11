package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutomaticConstructorToggling(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class A<T> { }
class B<T> {/*B*/ }
class C<T> { /*C*/constructor(val: T) { } }
class D<T> { constructor(/*D*/val: T) { } }

new /*Asig*/A<string>();
new /*Bsig*/B("");
new /*Csig*/C("");
new /*Dsig*/D<string>();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "B")
	f.Insert(t, "constructor(val: T) { }")
	f.VerifyQuickInfoAt(t, "Asig", "constructor A<string>(): A<string>", "")
	f.VerifyQuickInfoAt(t, "Bsig", "constructor B<string>(val: string): B<string>", "")
	f.VerifyQuickInfoAt(t, "Csig", "constructor C<string>(val: string): C<string>", "")
	f.VerifyQuickInfoAt(t, "Dsig", "constructor D<string>(val: string): D<string>", "")
	f.GoToMarker(t, "C")
	f.DeleteAtCaret(t, 23)
	f.VerifyQuickInfoAt(t, "Asig", "constructor A<string>(): A<string>", "")
	f.VerifyQuickInfoAt(t, "Bsig", "constructor B<string>(val: string): B<string>", "")
	f.VerifyQuickInfoAt(t, "Csig", "constructor C<unknown>(): C<unknown>", "")
	f.VerifyQuickInfoAt(t, "Dsig", "constructor D<string>(val: string): D<string>", "")
	f.GoToMarker(t, "D")
	f.DeleteAtCaret(t, 6)
	f.VerifyQuickInfoAt(t, "Asig", "constructor A<string>(): A<string>", "")
	f.VerifyQuickInfoAt(t, "Bsig", "constructor B<string>(val: string): B<string>", "")
	f.VerifyQuickInfoAt(t, "Csig", "constructor C<unknown>(): C<unknown>", "")
	f.VerifyQuickInfoAt(t, "Dsig", "constructor D<string>(): D<string>", "")
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestDeleteExtensionInReopenedInterface(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface A { a: number; }
interface B { b: number; }

interface I /*del*/extends A { }
interface I extends B { }

var i: I;
class C /*delImplements*/implements A { }
var c: C;
c.a;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "del")
	f.DeleteAtCaret(t, 9)
	f.GoToEOF(t)
	f.Insert(t, "var a = i.a;")
	f.GoToMarker(t, "delImplements")
	f.DeleteAtCaret(t, 12)
	f.GoToMarker(t, "del")
	f.Insert(t, "extends A")
}

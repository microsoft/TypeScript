package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnCircularTypes(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface A { (): B; };
declare var a: A;
var xx = a();

interface B { (): C; };
declare var b: B;
var yy = b();

interface C { (): A; };
declare var c: C;
var zz = c();

x/*B*/x = y/*C*/y;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "B", "var xx: B", "")
	f.VerifyQuickInfoAt(t, "C", "var yy: C", "")
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestExtendsTArray(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I1<T> {
    (a: T): T;
}
interface I2<T> extends I1<T[]> {
    b: T;
}
var x: I2<Date>;
var /**/y = x(undefined); // Typeof y should be Date[]
y.length;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "", "var y: Date[]", "")
	f.VerifyNoErrors(t)
}

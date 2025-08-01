package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnMergedInterfaces(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module M {
    interface A<T> {
        (): string;
        (x: T): T;
    }
    interface A<T> {
        (x: T, y: number): T;
        <U>(x: U, y: T): U;
    }
    var a: A<boolean>;
    var r = a();
    var r2 = a(true);
    var r3 = a(true, 2);
    var /*1*/r4 = a(1, true);
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var r4: number", "")
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestIncrementalUpdateToClassImplementingGenericClass(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function alert(message?: string): void;
class Animal<T> {
    constructor(public name: T) { }
    move(meters: number) {
        alert(this.name + " moved " + meters + "m.");
    }
}
class Animal2 extends Animal<string> {
    constructor(name: string) { super(name); }
    /*1*/get name2() { return this.name; }
}
var a = new Animal2('eprst');`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifyNoErrors(t)
	f.Insert(t, "//")
	f.VerifyNoErrors(t)
}

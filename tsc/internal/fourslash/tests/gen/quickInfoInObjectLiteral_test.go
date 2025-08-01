package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoInObjectLiteral(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo {
    doStuff(x: string, callback: (a: string) => string);
}
var x1: Foo = {
    y/*1*/1: () => {
        return "";
    } ,
    doStuff: (z, callback) => { return callback(this.y); }
}
var value = 3;
class Foo {
    static getRandomPosition() {
        return {
            "row": v/*2*/alue
        }
  }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(property) y1: () => string", "")
	f.VerifyQuickInfoAt(t, "2", "var value: number", "")
}

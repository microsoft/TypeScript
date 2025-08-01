package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestConstructorQuickInfo(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class SS<T>{}

var x/*1*/1 = new SS<number>();
var x/*2*/2 = new SS();
var x/*3*/3 = new SS;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var x1: SS<number>", "")
	f.VerifyQuickInfoAt(t, "2", "var x2: SS<unknown>", "")
	f.VerifyQuickInfoAt(t, "3", "var x3: SS<unknown>", "")
}

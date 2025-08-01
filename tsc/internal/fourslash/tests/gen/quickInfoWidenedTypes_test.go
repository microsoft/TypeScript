package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoWidenedTypes(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var /*1*/a = null;                   // var a: any
var /*2*/b = undefined;              // var b: any
var /*3*/c = { x: 0, y: null };	// var c: { x: number, y: any }
var /*4*/d = [null, undefined];      // var d: any[]`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var a: any", "")
	f.VerifyQuickInfoAt(t, "2", "var b: any", "")
	f.VerifyQuickInfoAt(t, "3", "var c: {\n    x: number;\n    y: any;\n}", "")
	f.VerifyQuickInfoAt(t, "4", "var d: any[]", "")
}

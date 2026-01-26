package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingComma(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var x = [1 , 2];/*x*/
var y = ( 1  , 2 );/*y*/
var z1 = 1 , zz = 2;/*z1*/
var z2 = {
    x: 1 ,/*z2*/
    y: 2
};
var z3 = (
    () => { }  ,/*z3*/
    () => { }
    );
var z4 = [
    () => { } ,/*z4*/
    () => { }
];
var z5 = {
    x: () => { } ,/*z5*/
    y: () => { }
}; `
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "x")
	f.VerifyCurrentLineContent(t, `var x = [1, 2];`)
	f.GoToMarker(t, "y")
	f.VerifyCurrentLineContent(t, `var y = (1, 2);`)
	f.GoToMarker(t, "z1")
	f.VerifyCurrentLineContent(t, `var z1 = 1, zz = 2;`)
	f.GoToMarker(t, "z2")
	f.VerifyCurrentLineContent(t, `    x: 1,`)
	f.GoToMarker(t, "z3")
	f.VerifyCurrentLineContent(t, `    () => { },`)
	f.GoToMarker(t, "z4")
	f.VerifyCurrentLineContent(t, `    () => { },`)
	f.GoToMarker(t, "z5")
	f.VerifyCurrentLineContent(t, `    x: () => { },`)
}

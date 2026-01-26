package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingVoid(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/  var x: () =>           void    ;
/*2*/  var y:     void    ;
/*3*/  function test(a:void,b:string){}
/*4*/  var a, b, c, d;
/*5*/  void    a    ;
/*6*/  void        (0);
/*7*/  b=void(c=1,d=2);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `var x: () => void;`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `var y: void;`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `function test(a: void, b: string) { }`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `void a;`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `void (0);`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `b = void (c = 1, d = 2);`)
}

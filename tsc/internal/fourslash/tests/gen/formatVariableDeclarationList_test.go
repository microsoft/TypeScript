package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatVariableDeclarationList(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/var   fun1   =   function   (     )     {
/*2*/            var               x   =   'foo'             ,
/*3*/                z   =   'bar'           ;
/*4*/                return  x            ;
/*5*/},

/*6*/fun2   =   (                function        (   f               )   {
/*7*/            var   fun   =   function   (        )       {
/*8*/                        console         .  log             (           f     (  )  )       ;
/*9*/            },
/*10*/            x   =   'Foo'           ;
/*11*/                return   fun            ;
/*12*/}   (           fun1            )   )       ;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `var fun1 = function() {`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    var x = 'foo',`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `        z = 'bar';`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `    return x;`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `},`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `    fun2 = (function(f) {`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `        var fun = function() {`)
	f.GoToMarker(t, "8")
	f.VerifyCurrentLineContent(t, `            console.log(f());`)
	f.GoToMarker(t, "9")
	f.VerifyCurrentLineContent(t, `        },`)
	f.GoToMarker(t, "10")
	f.VerifyCurrentLineContent(t, `            x = 'Foo';`)
	f.GoToMarker(t, "11")
	f.VerifyCurrentLineContent(t, `        return fun;`)
	f.GoToMarker(t, "12")
	f.VerifyCurrentLineContent(t, `    }(fun1));`)
}

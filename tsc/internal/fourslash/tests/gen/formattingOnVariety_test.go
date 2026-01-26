package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingOnVariety(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function f(a,b,c,d){/*1*/
for(var i=0;i<10;i++){/*2*/
var a=0;/*3*/
var b=a+a+a*a%a/2-1;/*4*/
b+=a;/*5*/
++b;/*6*/
f(a,b,c,d);/*7*/
if(1===1){/*8*/
var m=function(e,f){/*9*/
return e^f;/*10*/
}/*11*/
}/*12*/
}/*13*/
}/*14*/

for (var i = 0   ; i < this.foo(); i++) {/*15*/
}/*16*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `function f(a, b, c, d) {`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    for (var i = 0; i < 10; i++) {`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `        var a = 0;`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `        var b = a + a + a * a % a / 2 - 1;`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `        b += a;`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `        ++b;`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `        f(a, b, c, d);`)
	f.GoToMarker(t, "8")
	f.VerifyCurrentLineContent(t, `        if (1 === 1) {`)
	f.GoToMarker(t, "9")
	f.VerifyCurrentLineContent(t, `            var m = function(e, f) {`)
	f.GoToMarker(t, "10")
	f.VerifyCurrentLineContent(t, `                return e ^ f;`)
	f.GoToMarker(t, "11")
	f.VerifyCurrentLineContent(t, `            }`)
	f.GoToMarker(t, "12")
	f.VerifyCurrentLineContent(t, `        }`)
	f.GoToMarker(t, "13")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "14")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "15")
	f.VerifyCurrentLineContent(t, `for (var i = 0; i < this.foo(); i++) {`)
	f.GoToMarker(t, "16")
	f.VerifyCurrentLineContent(t, `}`)
}

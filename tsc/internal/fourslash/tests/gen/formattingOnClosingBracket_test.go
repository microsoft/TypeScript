package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingOnClosingBracket(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function f( ) {/*1*/
var     x = 3;/*2*/
    var z = 2   ;/*3*/
    a  = z  ++ - 2 *  x ;/*4*/
        for ( ; ; ) {/*5*/
    a+=(g +g)*a%t;/*6*/
        b --                          ;/*7*/
}/*8*/

    switch ( a  )/*9*/
    {
        case 1  :     {/*10*/
    a ++  ;/*11*/
        b--;/*12*/
    if(a===a)/*13*/
                return;/*14*/
    else/*15*/
        {
            for(a in b)/*16*/
                if(a!=a)/*17*/
    {
    for(a in b)/*18*/
            {
a++;/*19*/
        }/*20*/
                }/*21*/
    }/*22*/
        }/*23*/
    default:/*24*/
        break;/*25*/
    }/*26*/
}/*27*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	opts874 := f.GetOptions()
	opts874.FormatCodeSettings.InsertSpaceAfterSemicolonInForStatements = core.TSTrue
	f.Configure(t, opts874)
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `function f() {`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    var x = 3;`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `    var z = 2;`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `    a = z++ - 2 * x;`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `    for (; ;) {`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `        a += (g + g) * a % t;`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `        b--;`)
	f.GoToMarker(t, "8")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "9")
	f.VerifyCurrentLineContent(t, `    switch (a) {`)
	f.GoToMarker(t, "10")
	f.VerifyCurrentLineContent(t, `        case 1: {`)
	f.GoToMarker(t, "11")
	f.VerifyCurrentLineContent(t, `            a++;`)
	f.GoToMarker(t, "12")
	f.VerifyCurrentLineContent(t, `            b--;`)
	f.GoToMarker(t, "13")
	f.VerifyCurrentLineContent(t, `            if (a === a)`)
	f.GoToMarker(t, "14")
	f.VerifyCurrentLineContent(t, `                return;`)
	f.GoToMarker(t, "15")
	f.VerifyCurrentLineContent(t, `            else {`)
	f.GoToMarker(t, "16")
	f.VerifyCurrentLineContent(t, `                for (a in b)`)
	f.GoToMarker(t, "17")
	f.VerifyCurrentLineContent(t, `                    if (a != a) {`)
	f.GoToMarker(t, "18")
	f.VerifyCurrentLineContent(t, `                        for (a in b) {`)
	f.GoToMarker(t, "19")
	f.VerifyCurrentLineContent(t, `                            a++;`)
	f.GoToMarker(t, "20")
	f.VerifyCurrentLineContent(t, `                        }`)
	f.GoToMarker(t, "21")
	f.VerifyCurrentLineContent(t, `                    }`)
	f.GoToMarker(t, "22")
	f.VerifyCurrentLineContent(t, `            }`)
	f.GoToMarker(t, "23")
	f.VerifyCurrentLineContent(t, `        }`)
	f.GoToMarker(t, "24")
	f.VerifyCurrentLineContent(t, `        default:`)
	f.GoToMarker(t, "25")
	f.VerifyCurrentLineContent(t, `            break;`)
	f.GoToMarker(t, "26")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "27")
	f.VerifyCurrentLineContent(t, `}`)
}

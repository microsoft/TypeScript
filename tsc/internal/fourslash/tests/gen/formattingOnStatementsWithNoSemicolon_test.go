package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingOnStatementsWithNoSemicolon(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/do
     { var a/*2*/
/*3*/}   while (1)
/*4*/function f() {
/*5*/    var s = 1
/*6*/            }
/*7*/switch (t) {
/*8*/    case 1:
/*9*/{
/*10*/test
/*11*/}
/*12*/}
/*13*/do{do{do{}while(a!==b)}while(a!==b)}while(a!==b)
/*14*/do{
/*15*/do{
/*16*/do{
/*17*/}while(a!==b)
/*18*/}while(a!==b)
/*19*/}while(a!==b)
/*20*/for(var i=0;i<10;i++){
/*21*/for(var j=0;j<10;j++){
/*22*/j-=i
/*23*/}/*24*/}
/*25*/function foo() {
/*26*/try {
/*27*/x+=2
/*28*/}
/*29*/catch( e){
/*30*/x+=2
/*31*/}finally {
/*32*/x+=2
/*33*/}
/*34*/}
/*35*/do     { var a }   while (1)
    foo(function (file) {/*49*/
        return 0/*50*/
    }).then(function (doc) {/*51*/
        return 1/*52*/
    });/*53*/
/*54*/if(1)
/*55*/if(1)
/*56*/x++
/*57*/else
/*58*/if(1)
/*59*/x+=2
/*60*/else
/*61*/x+=2



/*62*/;
         do do do do/*63*/
                test;/*64*/
            while (0)/*65*/
         while (0)/*66*/
            while (0)/*67*/
         while (0)/*68*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `do {`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    var a`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `} while (1)`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `function f() {`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `    var s = 1`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `switch (t) {`)
	f.GoToMarker(t, "8")
	f.VerifyCurrentLineContent(t, `    case 1:`)
	f.GoToMarker(t, "9")
	f.VerifyCurrentLineContent(t, `        {`)
	f.GoToMarker(t, "10")
	f.VerifyCurrentLineContent(t, `            test`)
	f.GoToMarker(t, "11")
	f.VerifyCurrentLineContent(t, `        }`)
	f.GoToMarker(t, "12")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "13")
	f.VerifyCurrentLineContent(t, `do { do { do { } while (a !== b) } while (a !== b) } while (a !== b)`)
	f.GoToMarker(t, "14")
	f.VerifyCurrentLineContent(t, `do {`)
	f.GoToMarker(t, "15")
	f.VerifyCurrentLineContent(t, `    do {`)
	f.GoToMarker(t, "16")
	f.VerifyCurrentLineContent(t, `        do {`)
	f.GoToMarker(t, "17")
	f.VerifyCurrentLineContent(t, `        } while (a !== b)`)
	f.GoToMarker(t, "18")
	f.VerifyCurrentLineContent(t, `    } while (a !== b)`)
	f.GoToMarker(t, "19")
	f.VerifyCurrentLineContent(t, `} while (a !== b)`)
	f.GoToMarker(t, "20")
	f.VerifyCurrentLineContent(t, `for (var i = 0; i < 10; i++) {`)
	f.GoToMarker(t, "21")
	f.VerifyCurrentLineContent(t, `    for (var j = 0; j < 10; j++) {`)
	f.GoToMarker(t, "22")
	f.VerifyCurrentLineContent(t, `        j -= i`)
	f.GoToMarker(t, "23")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "24")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "25")
	f.VerifyCurrentLineContent(t, `function foo() {`)
	f.GoToMarker(t, "26")
	f.VerifyCurrentLineContent(t, `    try {`)
	f.GoToMarker(t, "27")
	f.VerifyCurrentLineContent(t, `        x += 2`)
	f.GoToMarker(t, "28")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "29")
	f.VerifyCurrentLineContent(t, `    catch (e) {`)
	f.GoToMarker(t, "30")
	f.VerifyCurrentLineContent(t, `        x += 2`)
	f.GoToMarker(t, "31")
	f.VerifyCurrentLineContent(t, `    } finally {`)
	f.GoToMarker(t, "32")
	f.VerifyCurrentLineContent(t, `        x += 2`)
	f.GoToMarker(t, "33")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "34")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "35")
	f.VerifyCurrentLineContent(t, `do { var a } while (1)`)
	f.GoToMarker(t, "49")
	f.VerifyCurrentLineContent(t, `foo(function(file) {`)
	f.GoToMarker(t, "50")
	f.VerifyCurrentLineContent(t, `    return 0`)
	f.GoToMarker(t, "51")
	f.VerifyCurrentLineContent(t, `}).then(function(doc) {`)
	f.GoToMarker(t, "52")
	f.VerifyCurrentLineContent(t, `    return 1`)
	f.GoToMarker(t, "53")
	f.VerifyCurrentLineContent(t, `});`)
	f.GoToMarker(t, "54")
	f.VerifyCurrentLineContent(t, `if (1)`)
	f.GoToMarker(t, "55")
	f.VerifyCurrentLineContent(t, `    if (1)`)
	f.GoToMarker(t, "56")
	f.VerifyCurrentLineContent(t, `        x++`)
	f.GoToMarker(t, "57")
	f.VerifyCurrentLineContent(t, `    else`)
	f.GoToMarker(t, "58")
	f.VerifyCurrentLineContent(t, `        if (1)`)
	f.GoToMarker(t, "59")
	f.VerifyCurrentLineContent(t, `            x += 2`)
	f.GoToMarker(t, "60")
	f.VerifyCurrentLineContent(t, `        else`)
	f.GoToMarker(t, "61")
	f.VerifyCurrentLineContent(t, `            x += 2`)
	f.GoToMarker(t, "62")
	f.VerifyCurrentLineContent(t, `                ;`)
	f.GoToMarker(t, "63")
	f.VerifyCurrentLineContent(t, `do do do do`)
	f.GoToMarker(t, "64")
	f.VerifyCurrentLineContent(t, `    test;`)
	f.GoToMarker(t, "65")
	f.VerifyCurrentLineContent(t, `while (0)`)
	f.GoToMarker(t, "66")
	f.VerifyCurrentLineContent(t, `while (0)`)
	f.GoToMarker(t, "67")
	f.VerifyCurrentLineContent(t, `while (0)`)
	f.GoToMarker(t, "68")
	f.VerifyCurrentLineContent(t, `while (0)`)
}

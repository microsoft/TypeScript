package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingOnInvalidCodes(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/var a;var c          , b;var  $d
/*2*/var $e
/*3*/var f
/*4*/a++;b++;

/*5*/function        f     (     )        {
/*6*/    for (i = 0; i < 10; i++) {
/*7*/        k = abc + 123 ^ d;
/*8*/        a = XYZ[m  (a[b[c][d]])];
/*9*/        break;

/*10*/        switch ( variable){
/*11*/       case  1: abc += 425;
/*12*/break;
/*13*/case 404 : a [x--/2]%=3 ;
/*14*/                    break ;
/*15*/                case vari : v[--x ] *=++y*( m + n / k[z]);
/*16*/                for (a in b){
/*17*/             for (a = 0; a < 10; ++a) {
/*18*/              a++;--a;
/*19*/                   if (a == b) {
/*20*/                          a++;b--;
/*21*/                     }
/*22*/else
/*23*/if (a == c){
/*24*/++a;
/*25*/(--c)+=d;
/*26*/$c = $a + --$b;
/*27*/}
/*28*/if (a == b)
/*29*/if (a != b) {
/*30*/ if (a !== b)
/*31*/ if (a === b)
/*32*/ --a;
/*33*/ else
/*34*/  --a;
/*35*/  else {
/*36*/  a--;++b;
/*37*/a++
/*38*/                    }
/*39*/                    }
/*40*/                    }
/*41*/                    for (x in y) {
/*42*/m-=m;
/*43*/k=1+2+3+4;
/*44*/}
/*45*/}
/*46*/    break;

/*47*/    }
/*48*/    }
/*49*/    var a  ={b:function(){}};
/*50*/    return {a:1,b:2}
/*51*/}

/*52*/var z = 1;
/*53*/            for (i = 0; i < 10; i++)
/*54*/     for (j = 0; j < 10; j++)
/*55*/for (k = 0; k < 10; ++k) {
/*56*/z++;
/*57*/}

/*58*/for (k = 0; k < 10; k += 2) {
/*59*/z++;
/*60*/}

/*61*/    $(document).ready ();


/*62*/ function  pageLoad() {
/*63*/ $('#TextBox1' ) .     unbind   (  ) ;
/*64*/$('#TextBox1' ) . datepicker ( ) ;
/*65*/}

/*66*/        function pageLoad    (     )    {
/*67*/    var webclass=[
/*68*/                { 'student'     :/*69*/
/*70*/                { 'id': '1', 'name': 'Linda Jones', 'legacySkill': 'Access, VB 5.0' }
/*71*/        }   ,
/*72*/{    'student':/*73*/
/*74*/{'id':'2','name':'Adam Davidson','legacySkill':'Cobol,MainFrame'}
/*75*/}      ,
/*76*/    { 'student':/*77*/
/*78*/{   'id':'3','name':'Charles Boyer' ,'legacySkill':'HTML, XML'}
/*79*/}
/*80*/    ];

/*81*/$create(Sys.UI.DataView,{data:webclass},null,null,$get('SList'));

/*82*/}

/*83*/$( document ).ready(function(){
/*84*/alert('hello');
/*85*/    } ) ;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `var a; var c, b; var $d`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `var $e`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `var f`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `a++; b++;`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `function f() {`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `    for (i = 0; i < 10; i++) {`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `        k = abc + 123 ^ d;`)
	f.GoToMarker(t, "8")
	f.VerifyCurrentLineContent(t, `        a = XYZ[m(a[b[c][d]])];`)
	f.GoToMarker(t, "9")
	f.VerifyCurrentLineContent(t, `        break;`)
	f.GoToMarker(t, "10")
	f.VerifyCurrentLineContent(t, `        switch (variable) {`)
	f.GoToMarker(t, "11")
	f.VerifyCurrentLineContent(t, `            case 1: abc += 425;`)
	f.GoToMarker(t, "12")
	f.VerifyCurrentLineContent(t, `                break;`)
	f.GoToMarker(t, "13")
	f.VerifyCurrentLineContent(t, `            case 404: a[x-- / 2] %= 3;`)
	f.GoToMarker(t, "14")
	f.VerifyCurrentLineContent(t, `                break;`)
	f.GoToMarker(t, "15")
	f.VerifyCurrentLineContent(t, `            case vari: v[--x] *= ++y * (m + n / k[z]);`)
	f.GoToMarker(t, "16")
	f.VerifyCurrentLineContent(t, `                for (a in b) {`)
	f.GoToMarker(t, "17")
	f.VerifyCurrentLineContent(t, `                    for (a = 0; a < 10; ++a) {`)
	f.GoToMarker(t, "18")
	f.VerifyCurrentLineContent(t, `                        a++; --a;`)
	f.GoToMarker(t, "19")
	f.VerifyCurrentLineContent(t, `                        if (a == b) {`)
	f.GoToMarker(t, "20")
	f.VerifyCurrentLineContent(t, `                            a++; b--;`)
	f.GoToMarker(t, "21")
	f.VerifyCurrentLineContent(t, `                        }`)
	f.GoToMarker(t, "22")
	f.VerifyCurrentLineContent(t, `                        else`)
	f.GoToMarker(t, "23")
	f.VerifyCurrentLineContent(t, `                            if (a == c) {`)
	f.GoToMarker(t, "24")
	f.VerifyCurrentLineContent(t, `                                ++a;`)
	f.GoToMarker(t, "25")
	f.VerifyCurrentLineContent(t, `                                (--c) += d;`)
	f.GoToMarker(t, "26")
	f.VerifyCurrentLineContent(t, `                                $c = $a + --$b;`)
	f.GoToMarker(t, "27")
	f.VerifyCurrentLineContent(t, `                            }`)
	f.GoToMarker(t, "28")
	f.VerifyCurrentLineContent(t, `                        if (a == b)`)
	f.GoToMarker(t, "29")
	f.VerifyCurrentLineContent(t, `                            if (a != b) {`)
	f.GoToMarker(t, "30")
	f.VerifyCurrentLineContent(t, `                                if (a !== b)`)
	f.GoToMarker(t, "31")
	f.VerifyCurrentLineContent(t, `                                    if (a === b)`)
	f.GoToMarker(t, "32")
	f.VerifyCurrentLineContent(t, `                                        --a;`)
	f.GoToMarker(t, "33")
	f.VerifyCurrentLineContent(t, `                                    else`)
	f.GoToMarker(t, "34")
	f.VerifyCurrentLineContent(t, `                                        --a;`)
	f.GoToMarker(t, "35")
	f.VerifyCurrentLineContent(t, `                                else {`)
	f.GoToMarker(t, "36")
	f.VerifyCurrentLineContent(t, `                                    a--; ++b;`)
	f.GoToMarker(t, "37")
	f.VerifyCurrentLineContent(t, `                                    a++`)
	f.GoToMarker(t, "38")
	f.VerifyCurrentLineContent(t, `                                }`)
	f.GoToMarker(t, "39")
	f.VerifyCurrentLineContent(t, `                            }`)
	f.GoToMarker(t, "40")
	f.VerifyCurrentLineContent(t, `                    }`)
	f.GoToMarker(t, "41")
	f.VerifyCurrentLineContent(t, `                    for (x in y) {`)
	f.GoToMarker(t, "42")
	f.VerifyCurrentLineContent(t, `                        m -= m;`)
	f.GoToMarker(t, "43")
	f.VerifyCurrentLineContent(t, `                        k = 1 + 2 + 3 + 4;`)
	f.GoToMarker(t, "44")
	f.VerifyCurrentLineContent(t, `                    }`)
	f.GoToMarker(t, "45")
	f.VerifyCurrentLineContent(t, `                }`)
	f.GoToMarker(t, "46")
	f.VerifyCurrentLineContent(t, `                break;`)
	f.GoToMarker(t, "47")
	f.VerifyCurrentLineContent(t, `        }`)
	f.GoToMarker(t, "48")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "49")
	f.VerifyCurrentLineContent(t, `    var a = { b: function() { } };`)
	f.GoToMarker(t, "50")
	f.VerifyCurrentLineContent(t, `    return { a: 1, b: 2 }`)
	f.GoToMarker(t, "51")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "52")
	f.VerifyCurrentLineContent(t, `var z = 1;`)
	f.GoToMarker(t, "53")
	f.VerifyCurrentLineContent(t, `for (i = 0; i < 10; i++)`)
	f.GoToMarker(t, "54")
	f.VerifyCurrentLineContent(t, `    for (j = 0; j < 10; j++)`)
	f.GoToMarker(t, "55")
	f.VerifyCurrentLineContent(t, `        for (k = 0; k < 10; ++k) {`)
	f.GoToMarker(t, "56")
	f.VerifyCurrentLineContent(t, `            z++;`)
	f.GoToMarker(t, "57")
	f.VerifyCurrentLineContent(t, `        }`)
	f.GoToMarker(t, "58")
	f.VerifyCurrentLineContent(t, `for (k = 0; k < 10; k += 2) {`)
	f.GoToMarker(t, "59")
	f.VerifyCurrentLineContent(t, `    z++;`)
	f.GoToMarker(t, "60")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "61")
	f.VerifyCurrentLineContent(t, `$(document).ready();`)
	f.GoToMarker(t, "62")
	f.VerifyCurrentLineContent(t, `function pageLoad() {`)
	f.GoToMarker(t, "63")
	f.VerifyCurrentLineContent(t, `    $('#TextBox1').unbind();`)
	f.GoToMarker(t, "64")
	f.VerifyCurrentLineContent(t, `    $('#TextBox1').datepicker();`)
	f.GoToMarker(t, "65")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "66")
	f.VerifyCurrentLineContent(t, `function pageLoad() {`)
	f.GoToMarker(t, "67")
	f.VerifyCurrentLineContent(t, `    var webclass = [`)
	f.GoToMarker(t, "68")
	f.VerifyCurrentLineContent(t, `        {`)
	f.GoToMarker(t, "69")
	f.VerifyCurrentLineContent(t, `            'student':`)
	f.GoToMarker(t, "70")
	f.VerifyCurrentLineContent(t, `                { 'id': '1', 'name': 'Linda Jones', 'legacySkill': 'Access, VB 5.0' }`)
	f.GoToMarker(t, "71")
	f.VerifyCurrentLineContent(t, `        },`)
	f.GoToMarker(t, "72")
	f.VerifyCurrentLineContent(t, `        {`)
	f.GoToMarker(t, "73")
	f.VerifyCurrentLineContent(t, `            'student':`)
	f.GoToMarker(t, "74")
	f.VerifyCurrentLineContent(t, `                { 'id': '2', 'name': 'Adam Davidson', 'legacySkill': 'Cobol,MainFrame' }`)
	f.GoToMarker(t, "75")
	f.VerifyCurrentLineContent(t, `        },`)
	f.GoToMarker(t, "76")
	f.VerifyCurrentLineContent(t, `        {`)
	f.GoToMarker(t, "77")
	f.VerifyCurrentLineContent(t, `            'student':`)
	f.GoToMarker(t, "78")
	f.VerifyCurrentLineContent(t, `                { 'id': '3', 'name': 'Charles Boyer', 'legacySkill': 'HTML, XML' }`)
	f.GoToMarker(t, "79")
	f.VerifyCurrentLineContent(t, `        }`)
	f.GoToMarker(t, "80")
	f.VerifyCurrentLineContent(t, `    ];`)
	f.GoToMarker(t, "81")
	f.VerifyCurrentLineContent(t, `    $create(Sys.UI.DataView, { data: webclass }, null, null, $get('SList'));`)
	f.GoToMarker(t, "82")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "83")
	f.VerifyCurrentLineContent(t, `$(document).ready(function() {`)
	f.GoToMarker(t, "84")
	f.VerifyCurrentLineContent(t, `    alert('hello');`)
	f.GoToMarker(t, "85")
	f.VerifyCurrentLineContent(t, `});`)
}

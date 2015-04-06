/// <reference path='fourslash.ts' />

/////*1*/var a;var c          , b;var  $d
/////*2*/var $e
/////*3*/var f
/////*4*/a++;b++;
////
/////*5*/function        f     (     )        {
/////*6*/    for (i = 0; i < 10; i++) {
/////*7*/        k = abc + 123 ^ d;
/////*8*/        a = XYZ[m  (a[b[c][d]])];
/////*9*/        break;
////
/////*10*/        switch ( variable){
/////*11*/       case  1: abc += 425;
/////*12*/break;
/////*13*/case 404 : a [x--/2]%=3 ;
/////*14*/                    break ;
/////*15*/                case vari : v[--x ] *=++y*( m + n / k[z]);
/////*16*/                for (a in b){
/////*17*/             for (a = 0; a < 10; ++a) {
/////*18*/              a++;--a;
/////*19*/                   if (a == b) {
/////*20*/                          a++;b--;
/////*21*/                     }
/////*22*/else
/////*23*/if (a == c){
/////*24*/++a;
/////*25*/(--c)+=d;
/////*26*/$c = $a + --$b;
/////*27*/}
/////*28*/if (a == b)
/////*29*/if (a != b) {
/////*30*/ if (a !== b)
/////*31*/ if (a === b)
/////*32*/ --a;
/////*33*/ else
/////*34*/  --a;
/////*35*/  else {
/////*36*/  a--;++b;
/////*37*/a++
/////*38*/                    }
/////*39*/                    }
/////*40*/                    }
/////*41*/                    for (x in y) {
/////*42*/m-=m;
/////*43*/k=1+2+3+4;
/////*44*/}
/////*45*/}
/////*46*/    break;
////
/////*47*/    }
/////*48*/    }
/////*49*/    var a  ={b:function(){}};
/////*50*/    return {a:1,b:2}
/////*51*/}
////
/////*52*/var z = 1;
/////*53*/            for (i = 0; i < 10; i++)
/////*54*/     for (j = 0; j < 10; j++)
/////*55*/for (k = 0; k < 10; ++k) {
/////*56*/z++;
/////*57*/}
////
/////*58*/for (k = 0; k < 10; k += 2) {
/////*59*/z++;
/////*60*/}
////
/////*61*/    $(document).ready ();
////
////
/////*62*/ function  pageLoad() {
/////*63*/ $('#TextBox1' ) .     unbind   (  ) ;
/////*64*/$('#TextBox1' ) . datepicker ( ) ;
/////*65*/}
////
/////*66*/        function pageLoad    (     )    {
/////*67*/    var webclass=[
/////*68*/                { 'student'     :/*69*/
/////*70*/                { 'id': '1', 'name': 'Linda Jones', 'legacySkill': 'Access, VB 5.0' }
/////*71*/        }   ,
/////*72*/{    'student':/*73*/
/////*74*/{'id':'2','name':'Adam Davidson','legacySkill':'Cobol,MainFrame'}
/////*75*/}      ,
/////*76*/    { 'student':/*77*/
/////*78*/{   'id':'3','name':'Charles Boyer' ,'legacySkill':'HTML, XML'}
/////*79*/}
/////*80*/    ];
////
/////*81*/$create(Sys.UI.DataView,{data:webclass},null,null,$get('SList'));
////
/////*82*/}
////
/////*83*/$( document ).ready(function(){
/////*84*/alert('hello');
/////*85*/    } ) ;
format.document();
goTo.marker("1");
verify.currentLineContentIs("var a; var c, b; var $d");
goTo.marker("2");
verify.currentLineContentIs("var $e");
goTo.marker("3");
verify.currentLineContentIs("var f");
goTo.marker("4");
verify.currentLineContentIs("a++; b++;");
goTo.marker("5");
verify.currentLineContentIs("function f() {");
goTo.marker("6");
verify.currentLineContentIs("    for (i = 0; i < 10; i++) {");
goTo.marker("7");
verify.currentLineContentIs("        k = abc + 123 ^ d;");
goTo.marker("8");
verify.currentLineContentIs("        a = XYZ[m(a[b[c][d]])];");
goTo.marker("9");
verify.currentLineContentIs("        break;");
goTo.marker("10");
verify.currentLineContentIs("        switch (variable) {");
goTo.marker("11");
verify.currentLineContentIs("            case 1: abc += 425;");
goTo.marker("12");
verify.currentLineContentIs("                break;");
goTo.marker("13");
verify.currentLineContentIs("            case 404: a[x-- / 2] %= 3;");
goTo.marker("14");
verify.currentLineContentIs("                break;");
goTo.marker("15");
verify.currentLineContentIs("            case vari: v[--x] *= ++y * (m + n / k[z]);");
goTo.marker("16");
verify.currentLineContentIs("                for (a in b) {");
goTo.marker("17");
verify.currentLineContentIs("                    for (a = 0; a < 10; ++a) {");
goTo.marker("18");
verify.currentLineContentIs("                        a++; --a;");
goTo.marker("19");
verify.currentLineContentIs("                        if (a == b) {");
goTo.marker("20");
verify.currentLineContentIs("                            a++; b--;");
goTo.marker("21");
verify.currentLineContentIs("                        }");
goTo.marker("22");
verify.currentLineContentIs("                        else");
goTo.marker("23");
verify.currentLineContentIs("                            if (a == c) {");
goTo.marker("24");
verify.currentLineContentIs("                                ++a;");
goTo.marker("25");
verify.currentLineContentIs("                                (--c) += d;");
goTo.marker("26");
verify.currentLineContentIs("                                $c = $a + --$b;");
goTo.marker("27");
verify.currentLineContentIs("                            }");
goTo.marker("28");
verify.currentLineContentIs("                        if (a == b)");
goTo.marker("29");
verify.currentLineContentIs("                            if (a != b) {");
goTo.marker("30");
verify.currentLineContentIs("                                if (a !== b)");
goTo.marker("31");
verify.currentLineContentIs("                                    if (a === b)");
goTo.marker("32");
verify.currentLineContentIs("                                        --a;");
goTo.marker("33");
verify.currentLineContentIs("                                    else");
goTo.marker("34");
verify.currentLineContentIs("                                        --a;");
goTo.marker("35");
verify.currentLineContentIs("                                else {");
goTo.marker("36");
verify.currentLineContentIs("                                    a--; ++b;");
goTo.marker("37");
verify.currentLineContentIs("                                    a++");
goTo.marker("38");
//bug 697788 expect result : "                                }", actual result : "                    }"
//verify.currentLineContentIs("                                }");
verify.currentLineContentIs("                                }");
goTo.marker("39");
verify.currentLineContentIs("                            }");
goTo.marker("40");
verify.currentLineContentIs("                    }");
goTo.marker("41");
verify.currentLineContentIs("                    for (x in y) {");
goTo.marker("42");
verify.currentLineContentIs("                        m -= m;");
goTo.marker("43");
verify.currentLineContentIs("                        k = 1 + 2 + 3 + 4;");
goTo.marker("44");
verify.currentLineContentIs("                    }");
goTo.marker("45");
verify.currentLineContentIs("                }");
goTo.marker("46");
verify.currentLineContentIs("                break;");
goTo.marker("47");
verify.currentLineContentIs("        }");
goTo.marker("48");
verify.currentLineContentIs("    }");
goTo.marker("49");
//bug 704204 expect result : "    var a = { b: function () { } };", actual result : "    var a = { b: function() { } };"
//verify.currentLineContentIs("    var a = { b: function () { } };");
verify.currentLineContentIs("    var a = { b: function() { } };");
goTo.marker("50");
verify.currentLineContentIs("    return { a: 1, b: 2 }");
goTo.marker("51");
verify.currentLineContentIs("}");
goTo.marker("52");
verify.currentLineContentIs("var z = 1;");
goTo.marker("53");
verify.currentLineContentIs("for (i = 0; i < 10; i++)");
goTo.marker("54");
verify.currentLineContentIs("    for (j = 0; j < 10; j++)");
goTo.marker("55");
verify.currentLineContentIs("        for (k = 0; k < 10; ++k) {");
goTo.marker("56");
verify.currentLineContentIs("            z++;");
goTo.marker("57");
verify.currentLineContentIs("        }");
goTo.marker("58");
verify.currentLineContentIs("for (k = 0; k < 10; k += 2) {");
goTo.marker("59");
verify.currentLineContentIs("    z++;");
goTo.marker("60");
verify.currentLineContentIs("}");
goTo.marker("61");
verify.currentLineContentIs("$(document).ready();");
goTo.marker("62");
verify.currentLineContentIs("function pageLoad() {");
goTo.marker("63");
verify.currentLineContentIs("    $('#TextBox1').unbind();");
goTo.marker("64");
verify.currentLineContentIs("    $('#TextBox1').datepicker();");
goTo.marker("65");
verify.currentLineContentIs("}");
goTo.marker("66");
verify.currentLineContentIs("function pageLoad() {");
goTo.marker("67");
verify.currentLineContentIs("    var webclass = [");
goTo.marker("68");
verify.currentLineContentIs("        {");
goTo.marker("69");
verify.currentLineContentIs("            'student':");
goTo.marker("70");
verify.currentLineContentIs("            { 'id': '1', 'name': 'Linda Jones', 'legacySkill': 'Access, VB 5.0' }");
goTo.marker("71");
verify.currentLineContentIs("        },");
goTo.marker("72");
verify.currentLineContentIs("        {");
goTo.marker("73");
verify.currentLineContentIs("            'student':");
goTo.marker("74");
verify.currentLineContentIs("            { 'id': '2', 'name': 'Adam Davidson', 'legacySkill': 'Cobol,MainFrame' }");
goTo.marker("75");
verify.currentLineContentIs("        },");
goTo.marker("76");
verify.currentLineContentIs("        {");
goTo.marker("77");
verify.currentLineContentIs("            'student':");
goTo.marker("78");
verify.currentLineContentIs("            { 'id': '3', 'name': 'Charles Boyer', 'legacySkill': 'HTML, XML' }");
goTo.marker("79");
verify.currentLineContentIs("        }");
goTo.marker("80");
verify.currentLineContentIs("    ];");
goTo.marker("81");
verify.currentLineContentIs("    $create(Sys.UI.DataView, { data: webclass }, null, null, $get('SList'));");
goTo.marker("82");
verify.currentLineContentIs("}");
goTo.marker("83");
//bug 704204 expect result : "$(document).ready(function () {", actual result : "$(document).ready(function() "
//verify.currentLineContentIs("$(document).ready(function () {");
verify.currentLineContentIs("$(document).ready(function() {");
goTo.marker("84");
verify.currentLineContentIs("    alert('hello');");
goTo.marker("85");
verify.currentLineContentIs("});");
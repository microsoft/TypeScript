/// <reference path='fourslash.ts'/>

////function f( ) {/*1*/
////var     x = 3;/*2*/
////    var z = 2   ;/*3*/
////    a  = z  ++ - 2 *  x ;/*4*/
////        for ( ; ; ) {/*5*/
////    a+=(g +g)*a%t;/*6*/
////        b --                          ;/*7*/
////}/*8*/
////
////    switch ( a  )/*9*/
////    {
////        case 1  :     {/*10*/
////    a ++  ;/*11*/
////        b--;/*12*/
////    if(a===a)/*13*/
////                return;/*14*/
////    else/*15*/
////        {
////            for(a in b)/*16*/
////                if(a!=a)/*17*/
////    {
////    for(a in b)/*18*/
////            {
////a++;/*19*/
////        }/*20*/
////                }/*21*/
////    }/*22*/
////        }/*23*/
////    default:/*24*/
////        break;/*25*/
////    }/*26*/
////}/*27*/

format.setOption("InsertSpaceAfterSemicolonInForStatements", true);
format.document();
goTo.marker("1");
verify.currentLineContentIs("function f() {");
goTo.marker("2");
verify.currentLineContentIs("    var x = 3;");
goTo.marker("3");
verify.currentLineContentIs("    var z = 2;");
goTo.marker("4");
verify.currentLineContentIs("    a = z++ - 2 * x;");
goTo.marker("5");
verify.currentLineContentIs("    for (; ;) {");
goTo.marker("6");
verify.currentLineContentIs("        a += (g + g) * a % t;");
goTo.marker("7");
verify.currentLineContentIs("        b--;");
goTo.marker("8");
verify.currentLineContentIs("    }");
goTo.marker("9");
verify.currentLineContentIs("    switch (a) {");
goTo.marker("10");
verify.currentLineContentIs("        case 1: {");
goTo.marker("11");
verify.currentLineContentIs("            a++;");
goTo.marker("12");
verify.currentLineContentIs("            b--;");
goTo.marker("13");
verify.currentLineContentIs("            if (a === a)");
goTo.marker("14");
verify.currentLineContentIs("                return;");
goTo.marker("15");
verify.currentLineContentIs("            else {");
goTo.marker("16");
verify.currentLineContentIs("                for (a in b)");
goTo.marker("17");
verify.currentLineContentIs("                    if (a != a) {");
goTo.marker("18");
verify.currentLineContentIs("                        for (a in b) {");
goTo.marker("19");
verify.currentLineContentIs("                            a++;");
goTo.marker("20");
verify.currentLineContentIs("                        }");
goTo.marker("21");
verify.currentLineContentIs("                    }");
goTo.marker("22");
verify.currentLineContentIs("            }");
goTo.marker("23");
verify.currentLineContentIs("        }");
goTo.marker("24");
verify.currentLineContentIs("        default:");
goTo.marker("25");
verify.currentLineContentIs("            break;");
goTo.marker("26");
verify.currentLineContentIs("    }");
goTo.marker("27");
verify.currentLineContentIs("}");
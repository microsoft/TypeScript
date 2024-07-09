/// <reference path='fourslash.ts' />

/////*1*/do
////     { var a/*2*/
/////*3*/}   while (1)
/////*4*/function f() {
/////*5*/    var s = 1
/////*6*/            }
/////*7*/switch (t) {
/////*8*/    case 1:
/////*9*/{
/////*10*/test
/////*11*/}
/////*12*/}
/////*13*/do{do{do{}while(a!==b)}while(a!==b)}while(a!==b)
/////*14*/do{
/////*15*/do{
/////*16*/do{
/////*17*/}while(a!==b)
/////*18*/}while(a!==b)
/////*19*/}while(a!==b)
/////*20*/for(var i=0;i<10;i++){
/////*21*/for(var j=0;j<10;j++){
/////*22*/j-=i
/////*23*/}/*24*/}
/////*25*/function foo() {
/////*26*/try {
/////*27*/x+=2
/////*28*/}
/////*29*/catch( e){
/////*30*/x+=2
/////*31*/}finally {
/////*32*/x+=2
/////*33*/}
/////*34*/}
/////*35*/do     { var a }   while (1)
////    foo(function (file) {/*49*/
////        return 0/*50*/
////    }).then(function (doc) {/*51*/
////        return 1/*52*/
////    });/*53*/
/////*54*/if(1)
/////*55*/if(1)
/////*56*/x++
/////*57*/else
/////*58*/if(1)
/////*59*/x+=2
/////*60*/else
/////*61*/x+=2
////
////
////
/////*62*/;
////         do do do do/*63*/
////                test;/*64*/
////            while (0)/*65*/
////         while (0)/*66*/
////            while (0)/*67*/
////         while (0)/*68*/
format.document();
goTo.marker("1");
verify.currentLineContentIs("do {");
goTo.marker("2");
verify.currentLineContentIs("    var a");
goTo.marker("3");
verify.currentLineContentIs("} while (1)");
goTo.marker("4");
verify.currentLineContentIs("function f() {");
goTo.marker("5");
verify.currentLineContentIs("    var s = 1");
goTo.marker("6");
verify.currentLineContentIs("}");
goTo.marker("7");
verify.currentLineContentIs("switch (t) {");
goTo.marker("8");
verify.currentLineContentIs("    case 1:");
goTo.marker("9");
verify.currentLineContentIs("        {");
goTo.marker("10");
verify.currentLineContentIs("            test");
goTo.marker("11");
verify.currentLineContentIs("        }");
goTo.marker("12");
verify.currentLineContentIs("}");
goTo.marker("13");
verify.currentLineContentIs("do { do { do { } while (a !== b) } while (a !== b) } while (a !== b)");
goTo.marker("14");
verify.currentLineContentIs("do {");
goTo.marker("15");
verify.currentLineContentIs("    do {");
goTo.marker("16");
verify.currentLineContentIs("        do {");
goTo.marker("17");
verify.currentLineContentIs("        } while (a !== b)");
goTo.marker("18");
verify.currentLineContentIs("    } while (a !== b)");
goTo.marker("19");
verify.currentLineContentIs("} while (a !== b)");
goTo.marker("20");
verify.currentLineContentIs("for (var i = 0; i < 10; i++) {");
goTo.marker("21");
verify.currentLineContentIs("    for (var j = 0; j < 10; j++) {");
goTo.marker("22");
verify.currentLineContentIs("        j -= i");
goTo.marker("23");
verify.currentLineContentIs("    }");
goTo.marker("24");
verify.currentLineContentIs("    }");
goTo.marker("25");
verify.currentLineContentIs("function foo() {");
goTo.marker("26");
verify.currentLineContentIs("    try {");
goTo.marker("27");
verify.currentLineContentIs("        x += 2");
goTo.marker("28");
verify.currentLineContentIs("    }");
goTo.marker("29");
verify.currentLineContentIs("    catch (e) {");
goTo.marker("30");
verify.currentLineContentIs("        x += 2");
goTo.marker("31");
verify.currentLineContentIs("    } finally {");
goTo.marker("32");
verify.currentLineContentIs("        x += 2");
goTo.marker("33");
verify.currentLineContentIs("    }");
goTo.marker("34");
verify.currentLineContentIs("}");
goTo.marker("35");
verify.currentLineContentIs("do { var a } while (1)");
goTo.marker("49");
verify.currentLineContentIs("foo(function(file) {");
goTo.marker("50");
verify.currentLineContentIs("    return 0");
goTo.marker("51");
verify.currentLineContentIs("}).then(function(doc) {");
goTo.marker("52");
verify.currentLineContentIs("    return 1");
goTo.marker("53");
verify.currentLineContentIs("});");
goTo.marker("54");
verify.currentLineContentIs("if (1)");
goTo.marker("55");
verify.currentLineContentIs("    if (1)");
goTo.marker("56");
verify.currentLineContentIs("        x++");
goTo.marker("57");
verify.currentLineContentIs("    else");
goTo.marker("58");
verify.currentLineContentIs("        if (1)");
goTo.marker("59");
verify.currentLineContentIs("            x += 2");
goTo.marker("60");
verify.currentLineContentIs("        else");
goTo.marker("61");
verify.currentLineContentIs("            x += 2");
goTo.marker("62");
verify.currentLineContentIs("                ;");
goTo.marker("63");
verify.currentLineContentIs("do do do do");
goTo.marker("64");
verify.currentLineContentIs("    test;");
goTo.marker("65");
verify.currentLineContentIs("while (0)");
goTo.marker("66");
verify.currentLineContentIs("while (0)");
goTo.marker("67");
verify.currentLineContentIs("while (0)");
goTo.marker("68");
verify.currentLineContentIs("while (0)");

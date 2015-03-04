/// <reference path='fourslash.ts' />

////var x = /*1*/{foo:/*2*/ 1,
////bar: "tt",/*3*/
////boo: /*4*/1 + 5}/*5*/;
////
////var x2 = /*6*/{foo/*7*/: 1,
////bar: /*8*/"tt",boo:1+5}/*9*/;
////
////function Foo() {/*10*/
////var typeICalc = {/*11*/
////clear: {/*12*/
////"()": [1, 2, 3]/*13*/
////}/*14*/
////}/*15*/
////}/*16*/
////
////// Rule for object literal members for the "value" of the memebr to follow the indent/*17*/
////// of the member, i.e. the relative position of the value is maintained when the member/*18*/
////// is indented./*19*/
////var x2 = {/*20*/
////  foo:/*21*/
////3,/*22*/
////          'bar':/*23*/
////                    { a: 1, b : 2}/*24*/
////};/*25*/
////
////var x={    };/*26*/
////var y = {};/*27*/

format.document();
goTo.marker("1");
verify.currentLineContentIs("var x = {");
goTo.marker("2");
verify.currentLineContentIs("    foo: 1,");
goTo.marker("3");
verify.currentLineContentIs("    bar: \"tt\",");
goTo.marker("4");
verify.currentLineContentIs("    boo: 1 + 5");
goTo.marker("5");
verify.currentLineContentIs("};");
goTo.marker("6");
verify.currentLineContentIs("var x2 = {");
goTo.marker("7");
verify.currentLineContentIs("    foo: 1,");
goTo.marker("8");
verify.currentLineContentIs("    bar: \"tt\", boo: 1 + 5");
goTo.marker("9");
verify.currentLineContentIs("};");
goTo.marker("10");
verify.currentLineContentIs("function Foo() {");
goTo.marker("11");
verify.currentLineContentIs("    var typeICalc = {");
goTo.marker("12");
verify.currentLineContentIs("        clear: {");
goTo.marker("13");
verify.currentLineContentIs("            \"()\": [1, 2, 3]");
goTo.marker("14");
verify.currentLineContentIs("        }");
goTo.marker("15");
verify.currentLineContentIs("    }");
goTo.marker("16");
verify.currentLineContentIs("}");
goTo.marker("17");
verify.currentLineContentIs("// Rule for object literal members for the \"value\" of the memebr to follow the indent");
goTo.marker("18");
verify.currentLineContentIs("// of the member, i.e. the relative position of the value is maintained when the member");
goTo.marker("19");
verify.currentLineContentIs("// is indented.");
goTo.marker("20");
verify.currentLineContentIs("var x2 = {");
goTo.marker("21");
verify.currentLineContentIs("    foo:");
goTo.marker("22");
verify.currentLineContentIs("    3,");
goTo.marker("23");
verify.currentLineContentIs("    'bar':");
goTo.marker("24");
verify.currentLineContentIs("    { a: 1, b: 2 }");
goTo.marker("25");
verify.currentLineContentIs("};");
goTo.marker("26");
verify.currentLineContentIs("var x = {};");
goTo.marker("27");
verify.currentLineContentIs("var y = {};");
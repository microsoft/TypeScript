/// <reference path='fourslash.ts' />


////var v =
/////*0*/a === b
/////*1*/? c
/////*2*/: d;

////var v = a === b
/////*3*/? c
/////*4*/: d;

////var x =
/////*5*/a
/////*6*/? function(){
/////*7*/var z = 1
/////*8*/}
/////*9*/: function(){
/////*10*/var z = 2
/////*11*/}
    



function verifyLine(marker: string, content: string) {
    goTo.marker(marker);
    verify.currentLineContentIs(content);
}

format.document();
verifyLine("0",  "    a === b");
verifyLine("1",  "        ? c");
verifyLine("2",  "        : d;");

verifyLine("3",  "    ? c");
verifyLine("4",  "    : d;");

verifyLine("5",  "    a");
verifyLine("6",  "        ? function() {");
verifyLine("7",  "            var z = 1");
verifyLine("8",  "        }");
verifyLine("9",  "        : function() {");
verifyLine("10", "            var z = 2");
verifyLine("11", "        }");

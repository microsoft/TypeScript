/// <reference path='fourslash.ts' />

////function test() /*1*//* %^ */
////{
////    if (true) /*2*//* %^ */
////    {
////    }
////}
////function a() {
////    /* %^ */ }/*3*/
debugger;
format.document();
goTo.marker('1');
verify.currentLineContentIs('function test() /* %^ */ {');
goTo.marker('2');
verify.currentLineContentIs('    if (true) /* %^ */ {');
goTo.marker('3');
verify.currentLineContentIs('}');
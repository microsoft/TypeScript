/// <reference path="fourslash.ts"/>
////class X {
////    constructor () {}/*target*/
//// /**/

goTo.marker();
edit.insert("}");
goTo.marker("target");
verify.currentLineContentIs("    constructor() { }"); // <-- Remove the space before LParen, and add one before RBrace.

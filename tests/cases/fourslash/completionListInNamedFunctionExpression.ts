/// <reference path="fourslash.ts"/>

////function foo(a: number): string {
////    /*insideFunctionDeclaration*/
////    return "";
////}
////
////(function foo(): number {
////    /*insideFunctionExpression*/
////    fo/*referenceInsideFunctionExpression*/o;
////    return "";
////})
////
/////*globalScope*/
////fo/*referenceInGlobalScope*/o;

goTo.marker("globalScope");
verify.memberListContains("foo");

goTo.marker("insideFunctionDeclaration");
verify.memberListContains("foo");

goTo.marker("insideFunctionExpression");
verify.memberListContains("foo");

goTo.marker("referenceInsideFunctionExpression");
verify.quickInfoIs("(): number");

goTo.marker("referenceInGlobalScope");
verify.quickInfoIs("(a: number): string");



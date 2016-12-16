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
verify.completionListContains("foo");

goTo.marker("insideFunctionDeclaration");
verify.completionListContains("foo");

goTo.marker("insideFunctionExpression");
verify.completionListContains("foo");

verify.quickInfos({
    referenceInsideFunctionExpression: "(local function) foo(): number",
    referenceInGlobalScope: "function foo(a: number): string"
});

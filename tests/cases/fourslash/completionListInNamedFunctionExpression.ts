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

verify.completions({ marker: ["globalScope", "insideFunctionDeclaration", "insideFunctionExpression"], includes: "foo" });

verify.quickInfos({
    referenceInsideFunctionExpression: "(local function) foo(): number",
    referenceInGlobalScope: "function foo(a: number): string"
});

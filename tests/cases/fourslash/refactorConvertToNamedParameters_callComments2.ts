/// <reference path='fourslash.ts' />

////function /*a*/foo/*b*/(a: number, b: number, ...rest: number[]) {
////    return a + b;
////}
////foo(
////    /**a*/
////    1,
////    /**c*/
////    2,
////    /**e*/
////    3,
////    /**g*/
////    4);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `function foo({ a, b, rest = [] }: { a: number; b: number; rest?: number[]; }) {
    return a + b;
}
foo({ a: /**a*/ 1, b: /**c*/ 2, rest: [/**e*/ 3, /**g*/ 4] });`
});
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
/* The expected content is currently wrong. The new argument object has the wrong formatting. */
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `function foo({ a, b, rest = [] }: { a: number; b: number; rest?: number[]; }) {
    return a + b;
}
foo(
    { /**a*/
        a: 1, /**c*/
        b: 2, rest: [
            /**e*/
            3,
            /**g*/
            4]
    });`
});
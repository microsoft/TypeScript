/// <reference path='fourslash.ts' />

////function /*a*/foo/*b*/(// comment
////    // a comment
////    a: number,
////    // b comment
////    b: number
////) {
////    return a + b;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `function foo(// comment
{ a, b }: {
    // a comment
    a: number;
    // b comment
    b: number;
}) {
    return a + b;
}`
});
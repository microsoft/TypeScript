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
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
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
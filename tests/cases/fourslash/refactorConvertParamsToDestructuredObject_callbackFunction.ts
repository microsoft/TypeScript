/// <reference path='fourslash.ts' />

//// function /*a*/foo/*b*/(actual: number) {
////     return actual;
//// }
//// [1].map(foo);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: 
`function foo({ actual }: { actual: number; }) {
    return actual;
}
[1].map(foo);`
});
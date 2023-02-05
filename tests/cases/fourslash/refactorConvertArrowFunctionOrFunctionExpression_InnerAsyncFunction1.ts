/// <reference path='fourslash.ts' />

/////*a*/const fn = () =>
////    async () => { };/*b*/

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to named function",
    actionDescription: "Convert to named function",
    newContent:
`function fn() {
    return async () => { };
}`,
});

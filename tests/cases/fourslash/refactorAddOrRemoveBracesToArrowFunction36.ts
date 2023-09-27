/// <reference path='fourslash.ts' />

////const f = /*a*/(param) => {
////    return {
////        "a": 1,
////        "b": 2,
////    }[param];
////}/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Add or remove braces in an arrow function",
    actionName: "Remove braces from arrow function",
    actionDescription: "Remove braces from arrow function",
    newContent:
`const f = (param) => ({
    "a": 1,
    "b": 2,
}[param]);`,
});
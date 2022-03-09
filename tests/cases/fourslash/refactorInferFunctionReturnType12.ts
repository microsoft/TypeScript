/// <reference path='fourslash.ts' />

////function f(x: number) {
////    return 1;
////}
////function /*a*/f/*b*/(x: number) {
////    return "1";
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Infer function return type",
    actionName: "Infer function return type",
    actionDescription: "Infer function return type",
    newContent:
`function f(x: number) {
    return 1;
}
function f(x: number): string {
    return "1";
}`
});

/// <reference path='fourslash.ts' />

////function f(x: number): string;
////function f(x: string): number;
////function /*a*/f/*b*/(x: string | number) {
////    return x === 1 ? 1 : "quit";
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Infer function return type",
    actionName: "Infer function return type",
    actionDescription: "Infer function return type",
    newContent:
`function f(x: number): string;
function f(x: string): number;
function f(x: string | number): string | number {
    return x === 1 ? 1 : "quit";
}`
});

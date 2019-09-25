/// <reference path='fourslash.ts' />

////function /*a*/foo/*b*/(a: number, b: number, ...rest: number[]) {
////    return a + b;
////}
////foo(/**a*/ 1 /**b*/, /**c*/ 2 /**d*/, /**e*/ 3 /**f*/, /**g*/ 4 /**h*/);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `function foo({ a, b, rest = [] }: { a: number; b: number; rest?: number[]; }) {
    return a + b;
}
foo({ /**a*/ a: 1 /**b*/, /**c*/ b: 2 /**d*/, rest: [/**e*/ 3 /**f*/, /**g*/ 4 /**h*/] });`
});
/// <reference path="fourslash.ts" />

////declare const Symbol: () => symbol;
////namespace M {
////    export const sym = Symbol();
////}
////namespace N {
////    const sym = Symbol();
////    export interface I {
////        [sym]: number;
////        [M.sym]: number;
////    }
////}
////
////declare const i: N.I;
////i[|./**/|];

verify.completions({
    marker: "",
    exact: { name: "M.sym", insertText: "[M.sym]", replacementSpan: test.ranges()[0] },
    preferences: { includeInsertTextCompletions: true },
});

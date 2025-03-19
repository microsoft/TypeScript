//// [tests/cases/compiler/declarationEmitOfFuncspace.ts] ////

//// [expando.ts]
// #27032
function ExpandoMerge(n: number) {
    return n;
}
namespace ExpandoMerge {
    export interface I { }
}


//// [expando.js]
// #27032
function ExpandoMerge(n) {
    return n;
}

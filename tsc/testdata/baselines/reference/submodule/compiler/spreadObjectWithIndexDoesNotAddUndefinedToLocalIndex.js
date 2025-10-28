//// [tests/cases/compiler/spreadObjectWithIndexDoesNotAddUndefinedToLocalIndex.ts] ////

//// [spreadObjectWithIndexDoesNotAddUndefinedToLocalIndex.ts]
declare const m: { [k: string]: string };
const x: { [k: string]: string } = { ...m, ["a" + "b"]: "" };

//// [spreadObjectWithIndexDoesNotAddUndefinedToLocalIndex.js]
const x = Object.assign(Object.assign({}, m), { ["a" + "b"]: "" });

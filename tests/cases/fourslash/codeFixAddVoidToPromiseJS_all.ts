/// <reference path='fourslash.ts' />

// @target: esnext
// @lib: es2015
// @strict: true
// @allowJS: true
// @checkJS: true
// @filename: main.js
////const p1 = new Promise(resolve => resolve());
////const p2 = /** @type {Promise<number>} */(new Promise(resolve => resolve()));
////const p3 = /** @type {Promise<number | string>} */(new Promise(resolve => resolve()));
////const p4 = /** @type {Promise<{ x: number } & { y: string }>} */(new Promise(resolve => resolve()));

verify.codeFixAll({
    fixId: "addVoidToPromise",
    fixAllDescription: ts.Diagnostics.Add_void_to_all_Promises_resolved_without_a_value.message,
    newFileContent: `const p1 = /** @type {Promise<void>} */(new Promise(resolve => resolve()));
const p2 = /** @type {Promise<number | void>} */(new Promise(resolve => resolve()));
const p3 = /** @type {Promise<number | string | void>} */(new Promise(resolve => resolve()));
const p4 = /** @type {Promise<({ x: number } & { y: string }) | void>} */(new Promise(resolve => resolve()));`
});

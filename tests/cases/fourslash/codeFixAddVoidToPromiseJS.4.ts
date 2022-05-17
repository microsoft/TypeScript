/// <reference path='fourslash.ts' />

// @target: esnext
// @lib: es2015
// @strict: true
// @allowJS: true
// @checkJS: true
// @filename: main.js
////const p4 = /** @type {Promise<{ x: number } & { y: string }>} */(new Promise(resolve => resolve()));

verify.codeFix({
    errorCode: 2810,
    description: "Add 'void' to Promise resolved without a value",
    index: 2,
    newFileContent: `const p4 = /** @type {Promise<({ x: number } & { y: string }) | void>} */(new Promise(resolve => resolve()));`
});

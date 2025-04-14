/// <reference path='fourslash.ts' />

// @target: esnext
// @lib: es2015
// @strict: true
// @allowJS: true
// @checkJS: true
// @filename: main.js
////const p2 = /** @type {Promise<number>} */(new Promise(resolve => resolve()));

verify.codeFix({
    errorCode: 2810,
    description: "Add 'void' to Promise resolved without a value",
    index: 2,
    newFileContent: `const p2 = /** @type {Promise<number | void>} */(new Promise(resolve => resolve()));`
});

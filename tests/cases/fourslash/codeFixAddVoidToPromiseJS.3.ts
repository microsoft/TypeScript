/// <reference path='fourslash.ts' />

// @target: esnext
// @lib: es2015
// @strict: true
// @allowJS: true
// @checkJS: true
// @filename: main.js
////const p3 = /** @type {Promise<number | string>} */(new Promise(resolve => resolve()));

verify.codeFix({
    errorCode: 2810,
    description: "Add 'void' to Promise resolved without a value",
    index: 2,
    newFileContent: `const p3 = /** @type {Promise<number | string | void>} */(new Promise(resolve => resolve()));`
});

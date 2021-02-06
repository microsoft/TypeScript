/// <reference path='fourslash.ts' />

// @target: esnext
// @lib: es2015
// @strict: true
// @allowJS: true
// @checkJS: true
// @filename: main.js
////const p1 = new Promise(resolve => resolve());

verify.codeFix({
    errorCode: 2794,
    description: "Add 'void' to Promise resolved without a value",
    index: 2,
    newFileContent: `const p1 = /** @type {Promise<void>} */(new Promise(resolve => resolve()));`
});

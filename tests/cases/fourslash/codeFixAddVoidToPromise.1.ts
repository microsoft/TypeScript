/// <reference path='fourslash.ts' />

// @target: esnext
// @lib: es2015
// @strict: true

////const p1 = new Promise(resolve => resolve());

verify.codeFix({
    errorCode: 2794,
    description: "Add 'void' to Promise resolved without a value",
    index: 0,
    newFileContent: `const p1 = new Promise<void>(resolve => resolve());`
});

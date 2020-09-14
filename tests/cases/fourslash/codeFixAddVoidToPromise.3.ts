/// <reference path='fourslash.ts' />

// @target: esnext
// @lib: es2015
// @strict: true

////const p3 = new Promise<number | string>(resolve => resolve());

verify.codeFix({
    errorCode: 2554,
    description: "Add 'void' to Promise resolved without a value",
    index: 0,
    newFileContent: `const p3 = new Promise<number | string | void>(resolve => resolve());`
});

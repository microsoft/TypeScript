/// <reference path='fourslash.ts' />

// @target: esnext
// @lib: es2015
// @strict: true

////const p4 = new Promise<{ x: number } & { y: string }>(resolve => resolve());

verify.codeFix({
    errorCode: 2794,
    description: "Add 'void' to Promise resolved without a value",
    index: 0,
    newFileContent: `const p4 = new Promise<({ x: number } & { y: string }) | void>(resolve => resolve());`
});

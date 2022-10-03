/// <reference path='fourslash.ts' />

// @target: esnext
// @lib: es2015
// @strict: true

////const p1 = new Promise(resolve => resolve());
////const p2 = new Promise<number>(resolve => resolve());
////const p3 = new Promise<number | string>(resolve => resolve());
////const p4 = new Promise<{ x: number } & { y: string }>(resolve => resolve());

verify.codeFixAll({
    fixId: "addVoidToPromise",
    fixAllDescription: ts.Diagnostics.Add_void_to_all_Promises_resolved_without_a_value.message,
    newFileContent: `const p1 = new Promise<void>(resolve => resolve());
const p2 = new Promise<number | void>(resolve => resolve());
const p3 = new Promise<number | string | void>(resolve => resolve());
const p4 = new Promise<({ x: number } & { y: string }) | void>(resolve => resolve());`
});

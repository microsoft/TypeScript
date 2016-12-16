// @target: ES5
// @lib: es5,es2015.promise
// @noEmitHelpers: true
declare class C { }
declare var p: Promise<typeof C>;

async function func(): Promise<void> {
    class D extends (await p) {
    }
}
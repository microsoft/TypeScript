// @target: ES5
// @lib: es5,es2015.promise
// @noEmitHelpers: true
declare var a: number;
declare var p: Promise<number>;
declare function before(): void;
declare function after(): void;
async function func(): Promise<void> {
    before();
    var b = await p + a;
    after();
}
// @target: es2017
// @noEmitHelpers: true
declare var a: boolean;
declare var p: Promise<boolean>;
declare function before(): void;
declare function after(): void;
async function func(): Promise<void> {
    before();
    var b = await p && a;
    after();
}
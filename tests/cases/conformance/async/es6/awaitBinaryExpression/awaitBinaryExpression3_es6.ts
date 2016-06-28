// @target: ES6
// @noEmitHelpers: true
declare var a: number;
declare var p: Promise<number>;
async function func(): Promise<void> {
    "before";
    var b = await p + a;
    "after";
}
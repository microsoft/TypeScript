// @target: ES6
// @noEmitHelpers: true
declare var a: boolean;
declare var p: Promise<boolean>;
async function func(): Promise<void> {
    "before";
    var o: { a: boolean; };
    o.a = await p;
    "after";
}
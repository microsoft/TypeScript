// @target: ES5
// @lib: es5,es2015.promise
// @noEmitHelpers: true
declare var a: boolean;
declare var p: Promise<boolean>;
async function func(): Promise<void> {
    "use strict";
    var b = await p || a;
}
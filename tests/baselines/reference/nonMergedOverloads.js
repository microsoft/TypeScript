//// [nonMergedOverloads.ts]
var f = 10;

export function f();
export function f() {
}

//// [nonMergedOverloads.js]
"use strict";
var f = 10;
function f() {
}
exports.f = f;

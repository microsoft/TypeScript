//// [nonStrictIndexedAccessOnObjectInReturnPosition.ts]
export function func(id: string): string[] {
    var a1 = [];
    var a2 = ["elem"];
    return { a1, a2 }[id];
}

//// [nonStrictIndexedAccessOnObjectInReturnPosition.js]
"use strict";
exports.__esModule = true;
exports.func = void 0;
function func(id) {
    var a1 = [];
    var a2 = ["elem"];
    return { a1: a1, a2: a2 }[id];
}
exports.func = func;

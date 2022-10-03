//// [tests/cases/compiler/defaultIsNotVisibleInLocalScope.ts] ////

//// [a.ts]
export default function () {
    return true;
}
export type X = typeof default;  // expect error

//// [b.ts]
export default { a: true }
export type X = typeof default; // expect error

//// [a.js]
"use strict";
exports.__esModule = true;
function default_1() {
    return true;
}
exports["default"] = default_1;
//// [b.js]
"use strict";
exports.__esModule = true;
exports["default"] = { a: true };

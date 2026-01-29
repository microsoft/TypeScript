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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1() {
    return true;
}
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { a: true };

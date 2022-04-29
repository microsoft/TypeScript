//// [exportArrayBindingPattern.ts]
// issue: https://github.com/Microsoft/TypeScript/issues/10778
const [a, , b] = [1, 2, 3];
export { a, b };

//// [exportArrayBindingPattern.js]
"use strict";
exports.__esModule = true;
exports.b = exports.a = void 0;
// issue: https://github.com/Microsoft/TypeScript/issues/10778
var _a = [1, 2, 3], a = _a[0], b = _a[2];
exports.a = a;
exports.b = b;

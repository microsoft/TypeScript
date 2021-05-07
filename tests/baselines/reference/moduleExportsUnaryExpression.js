//// [moduleExportsUnaryExpression.ts]
let x = 1;

export function foo(y: number) {
    if (y <= x++) return y <= x++;
    if (y <= x--) return y <= x--;
    if (y <= ++x) return y <= ++x;
    if (y <= --x) return y <= --x;

    x++;
    x--;
    ++x;
    --x;
}

export { x };


//// [moduleExportsUnaryExpression.js]
"use strict";
exports.__esModule = true;
exports.x = exports.foo = void 0;
var x = 1;
exports.x = x;
function foo(y) {
    if (y <= (exports.x = ++x) - 1)
        return y <= (exports.x = ++x) - 1;
    if (y <= (exports.x = --x) + 1)
        return y <= (exports.x = --x) + 1;
    if (y <= (exports.x = ++x))
        return y <= (exports.x = ++x);
    if (y <= (exports.x = --x))
        return y <= (exports.x = --x);
    (exports.x = ++x) - 1;
    (exports.x = --x) + 1;
    exports.x = ++x;
    exports.x = --x;
}
exports.foo = foo;

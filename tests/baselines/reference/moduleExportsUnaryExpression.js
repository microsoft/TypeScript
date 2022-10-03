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
var _a, _b, _c, _d;
exports.__esModule = true;
exports.x = exports.foo = void 0;
var x = 1;
exports.x = x;
function foo(y) {
    if (y <= (exports.x = (_a = x++, x), _a))
        return y <= (exports.x = (_b = x++, x), _b);
    if (y <= (exports.x = (_c = x--, x), _c))
        return y <= (exports.x = (_d = x--, x), _d);
    if (y <= (exports.x = ++x))
        return y <= (exports.x = ++x);
    if (y <= (exports.x = --x))
        return y <= (exports.x = --x);
    exports.x = (x++, x);
    exports.x = (x--, x);
    exports.x = ++x;
    exports.x = --x;
}
exports.foo = foo;

//// [tests/cases/compiler/moduleExportsUnaryExpression.ts] ////

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

export let x1 = 0;
export { x1 as y1, x1 as default, x1 as "a b" };

export function f1() {
    return x1++;
}

export function f2() {
    return x1--;
}

x1++;
x1--;

for (let i = 0; i < 2; x1++) {
    i++;
}

export const f3 = () => x1++;

export var x2 = 0;
export { x2 as y2 };

x2++;
export const f4 = () => x2--;


//// [moduleExportsUnaryExpression.js]
"use strict";
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.f4 = exports.y2 = exports.x2 = exports.f3 = exports["a b"] = exports.default = exports.y1 = exports.x1 = exports.x = void 0;
exports.foo = foo;
exports.f1 = f1;
exports.f2 = f2;
let x = 1;
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
exports.x1 = 0;
exports.y1 = exports.x1;
exports.default = exports.x1;
exports["a b"] = exports.x1;
function f1() {
    return exports["a b"] = exports.default = exports.y1 = (_e = exports.x1++, x1), _e;
}
function f2() {
    return exports["a b"] = exports.default = exports.y1 = (_f = exports.x1--, x1), _f;
}
exports["a b"] = exports.default = exports.y1 = (exports.x1++, x1);
exports["a b"] = exports.default = exports.y1 = (exports.x1--, x1);
for (let i = 0; i < 2; exports["a b"] = exports.default = exports.y1 = (exports.x1++, x1)) {
    i++;
}
const f3 = () => { var _a; return exports["a b"] = exports.default = exports.y1 = (_a = exports.x1++, x1), _a; };
exports.f3 = f3;
exports.x2 = 0;
exports.y2 = exports.x2;
exports.y2 = (exports.x2++, x2);
const f4 = () => { var _a; return exports.y2 = (_a = exports.x2--, x2), _a; };
exports.f4 = f4;

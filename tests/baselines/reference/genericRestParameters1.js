//// [genericRestParameters1.ts]
function bind<T, U extends unknown[], V>(f: (x: T, ...rest: U) => V, x: T) {
    return (...rest: U) => f(x, ...rest);
}

//// [genericRestParameters1.js]
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function bind(f, x) {
    return function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        return f.apply(void 0, __spreadArrays([x], rest));
    };
}


//// [genericRestParameters1.d.ts]
declare function bind<T, U extends unknown[], V>(f: (x: T, ...rest: U) => V, x: T): (...rest: U) => V;

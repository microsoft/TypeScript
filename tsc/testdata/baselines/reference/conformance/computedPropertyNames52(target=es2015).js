//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames52.ts] ////

//// [computedPropertyNames52.js]
const array = [];
for (let i = 0; i < 10; ++i) {
    array.push(class C {
        [i] = () => C;
        static [i] = 100;
    })
}


//// [computedPropertyNames52.js]
"use strict";
var __propKey = (this && this.__propKey) || function (x) {
    return typeof x === "symbol" ? x : "".concat(x);
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
const array = [];
for (let i = 0; i < 10; ++i) {
    let _a, _b, _c;
    array.push((_c = class C {
            constructor() {
                this[_a] = __setFunctionName(() => _c, _a);
            }
        },
        _a = __propKey(i),
        _b = i,
        _c[_b] = 100,
        _c));
}

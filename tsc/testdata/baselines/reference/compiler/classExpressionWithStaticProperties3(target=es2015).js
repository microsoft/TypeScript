//// [tests/cases/compiler/classExpressionWithStaticProperties3.ts] ////

//// [classExpressionWithStaticProperties3.ts]
declare var console: any;
const arr: {y(): number}[] = [];
for (let i = 0; i < 3; i++) {
    arr.push(class C {
        static x = i;
        static y = () => C.x * 2;
    });
}
arr.forEach(C => console.log(C.y()));

//// [classExpressionWithStaticProperties3.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a;
const arr = [];
for (let i = 0; i < 3; i++) {
    arr.push((_a = class C {
        },
        _a.x = i,
        _a.y = __setFunctionName(() => _a.x * 2, "y"),
        _a));
}
arr.forEach(C => console.log(C.y()));

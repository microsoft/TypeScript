//// [tests/cases/compiler/classFieldsAssignmentNamedEvaluation.ts] ////

//// [classFieldsAssignmentNamedEvaluation.ts]
let x: any;
x = class { static #foo = 1; };


//// [classFieldsAssignmentNamedEvaluation.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _x_foo;
let x;
x = (_a = class {
    },
    __setFunctionName(_a, "x"),
    _x_foo = { value: 1 },
    _a);

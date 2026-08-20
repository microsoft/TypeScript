//// [tests/cases/compiler/classFieldsNamedEvaluationDestructuringAssignment.ts] ////

//// [classFieldsNamedEvaluationDestructuringAssignment.ts]
// Bug 2: Named evaluation missing in destructuring assignment elements.
// Anonymous class expressions used as default values in destructuring
// assignments should receive their inferred name.

let x: any;

// Array destructuring assignment with anonymous class default
[x = class { static #y = 1; }] = [];

// Object destructuring assignment (shorthand) with anonymous class default
({ x = class { static #z = 2; } } = {} as any);

// Object destructuring assignment (property) with anonymous class default
({ y: x = class { static #w = 3; } } = {} as any);


//// [classFieldsNamedEvaluationDestructuringAssignment.js]
"use strict";
// Bug 2: Named evaluation missing in destructuring assignment elements.
// Anonymous class expressions used as default values in destructuring
// assignments should receive their inferred name.
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _x_y, _b, _x_z, _c, _x_w;
let x;
// Array destructuring assignment with anonymous class default
[x = (_a = class {
        },
        __setFunctionName(_a, "x"),
        _x_y = { value: 1 },
        _a)] = [];
// Object destructuring assignment (shorthand) with anonymous class default
({ x = (_b = class {
        },
        __setFunctionName(_b, "x"),
        _x_z = { value: 2 },
        _b) } = {});
// Object destructuring assignment (property) with anonymous class default
({ y: x = (_c = class {
        },
        __setFunctionName(_c, "x"),
        _x_w = { value: 3 },
        _c) } = {});

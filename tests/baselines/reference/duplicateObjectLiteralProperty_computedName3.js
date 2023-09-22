//// [tests/cases/compiler/duplicateObjectLiteralProperty_computedName3.ts] ////

//// [a.ts]
export const n = 1;
export const s = "s";
export enum E1 { A = "ENUM_KEY" }
export enum E2 { B }

//// [b.ts]
import * as keys from "./a";

const t1 = {
    [keys.n]: 1,
    [keys.n]: 1, // duplicate
}

const t2 = {
    [keys.s]: 1,
    [keys.s]: 1, // duplicate
}

const t3 = {
    [keys.E1.A]: 1,
    [keys.E1.A]: 1, // duplicate
}

const t4 = {
    [keys.E2.B]: 1,
    [keys.E2.B]: 1, // duplicate
}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E2 = exports.E1 = exports.s = exports.n = void 0;
exports.n = 1;
exports.s = "s";
var E1;
(function (E1) {
    E1["A"] = "ENUM_KEY";
})(E1 || (exports.E1 = E1 = {}));
var E2;
(function (E2) {
    E2[E2["B"] = 0] = "B";
})(E2 || (exports.E2 = E2 = {}));
//// [b.js]
"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var keys = require("./a");
var t1 = (_a = {},
    _a[keys.n] = 1,
    _a[keys.n] = 1,
    _a);
var t2 = (_b = {},
    _b[keys.s] = 1,
    _b[keys.s] = 1,
    _b);
var t3 = (_c = {},
    _c[keys.E1.A] = 1,
    _c[keys.E1.A] = 1,
    _c);
var t4 = (_d = {},
    _d[keys.E2.B] = 1,
    _d[keys.E2.B] = 1,
    _d);

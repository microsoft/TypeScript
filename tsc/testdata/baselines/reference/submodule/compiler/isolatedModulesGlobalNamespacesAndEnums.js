//// [tests/cases/compiler/isolatedModulesGlobalNamespacesAndEnums.ts] ////

//// [script-namespaces.ts]
namespace Instantiated {
    export const x = 1;
}
namespace Uninstantiated {
    export type T = number;
}
declare namespace Ambient {
    export const x: number;
}

//// [module-namespaces.ts]
export namespace Instantiated {
    export const x = 1;
}

//// [enum1.ts]
enum Enum { A, B, C }
declare enum Enum { X = 1_000_000 }
const d = 'd';

//// [enum2.ts]
enum Enum {
    D = d,
    E = A, // error
    Y = X, // error
    Z = Enum.A
}

declare enum Enum {
    F = A
}

//// [script-namespaces.js]
var Instantiated;
(function (Instantiated) {
    Instantiated.x = 1;
})(Instantiated || (Instantiated = {}));
//// [module-namespaces.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instantiated = void 0;
var Instantiated;
(function (Instantiated) {
    Instantiated.x = 1;
})(Instantiated || (exports.Instantiated = Instantiated = {}));
//// [enum1.js]
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum[Enum["C"] = 2] = "C";
})(Enum || (Enum = {}));
const d = 'd';
//// [enum2.js]
var Enum;
(function (Enum) {
    Enum["D"] = d;
    if (typeof Enum.D !== "string") Enum[Enum.D] = "D";
    Enum["E"] = A;
    if (typeof Enum.E !== "string") Enum[Enum.E] = "E";
    Enum["Y"] = X;
    if (typeof Enum.Y !== "string") Enum[Enum.Y] = "Y";
    Enum["Z"] = Enum.A;
    if (typeof Enum.Z !== "string") Enum[Enum.Z] = "Z";
})(Enum || (Enum = {}));

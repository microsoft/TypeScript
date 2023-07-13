//// [tests/cases/compiler/mergedDeclarationExports.ts] ////

//// [mergedDeclarationExports.ts]
// OK -- one is type, one is value
interface b {}
export const b = 1;

// OK -- one is a type, one is a namespace, one is a value.
type t = 0;
namespace t { interface I {} }
export const t = 0;

// Should get errors if they have some meaning in common.

// both types
interface c {}
export interface c {}

// both types (class is also value, but that doesn't matter)
interface d {}
export class d {}

// both namespaces
namespace N { }
export namespace N {}


//// [mergedDeclarationExports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = exports.t = exports.b = void 0;
exports.b = 1;
exports.t = 0;
var d = /** @class */ (function () {
    function d() {
    }
    return d;
}());
exports.d = d;

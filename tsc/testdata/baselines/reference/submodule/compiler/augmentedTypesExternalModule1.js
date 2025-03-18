//// [tests/cases/compiler/augmentedTypesExternalModule1.ts] ////

//// [augmentedTypesExternalModule1.ts]
export var a = 1;
class c5 { public foo() { } }
module c5 { } // should be ok everywhere

//// [augmentedTypesExternalModule1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 1;
class c5 {
    foo() { }
}

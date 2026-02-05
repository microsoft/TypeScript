//// [tests/cases/compiler/exportImportNonInstantiatedModule.ts] ////

//// [exportImportNonInstantiatedModule.ts]
namespace A {
    export interface I { x: number }
}

namespace B {
    export import A1 = A
    
}

var x: B.A1.I = { x: 1 };

//// [exportImportNonInstantiatedModule.js]
"use strict";
var B;
(function (B) {
    B.A1 = A;
})(B || (B = {}));
var x = { x: 1 };

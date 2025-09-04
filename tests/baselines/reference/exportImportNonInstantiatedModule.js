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
var B;
(function (B) {
})(B || (B = {}));
var x = { x: 1 };

//// [tests/cases/compiler/internalImportUnInstantiatedModuleNotReferencingInstanceNoConflict.ts] ////

//// [internalImportUnInstantiatedModuleNotReferencingInstanceNoConflict.ts]
namespace A {
    export interface X { s: string }
}

namespace B {
    var A = 1;
    import Y = A;
}


//// [internalImportUnInstantiatedModuleNotReferencingInstanceNoConflict.js]
"use strict";
var B;
(function (B) {
    var A = 1;
    var Y = A;
})(B || (B = {}));

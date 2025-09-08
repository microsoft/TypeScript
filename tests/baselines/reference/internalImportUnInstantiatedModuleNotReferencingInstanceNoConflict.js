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
var B;
(function (B) {
    var A = 1;
})(B || (B = {}));

//// [tests/cases/compiler/internalImportUnInstantiatedModuleMergedWithClassNotReferencingInstanceNoConflict.ts] ////

//// [internalImportUnInstantiatedModuleMergedWithClassNotReferencingInstanceNoConflict.ts]
class A {
    aProp: string;
}
namespace A {
    export interface X { s: string }
}

namespace B {
    import Y = A;
}


//// [internalImportUnInstantiatedModuleMergedWithClassNotReferencingInstanceNoConflict.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());

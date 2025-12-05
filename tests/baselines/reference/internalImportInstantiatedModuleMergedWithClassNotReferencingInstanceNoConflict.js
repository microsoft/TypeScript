//// [tests/cases/compiler/internalImportInstantiatedModuleMergedWithClassNotReferencingInstanceNoConflict.ts] ////

//// [internalImportInstantiatedModuleMergedWithClassNotReferencingInstanceNoConflict.ts]
class A {
    aProp: string;
}
namespace A {
    export interface X { s: string }
    export var a = 10;
}

namespace B {
    import Y = A;
}


//// [internalImportInstantiatedModuleMergedWithClassNotReferencingInstanceNoConflict.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
(function (A) {
    A.a = 10;
})(A || (A = {}));

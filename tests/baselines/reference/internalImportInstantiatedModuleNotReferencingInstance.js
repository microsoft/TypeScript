//// [tests/cases/compiler/internalImportInstantiatedModuleNotReferencingInstance.ts] ////

//// [internalImportInstantiatedModuleNotReferencingInstance.ts]
namespace A {
    export interface X { s: string }
    export var a = 10;
}

namespace B {
    var A = 1;
    import Y = A;
}


//// [internalImportInstantiatedModuleNotReferencingInstance.js]
var A;
(function (A) {
    A.a = 10;
})(A || (A = {}));
var B;
(function (B) {
    var A = 1;
})(B || (B = {}));

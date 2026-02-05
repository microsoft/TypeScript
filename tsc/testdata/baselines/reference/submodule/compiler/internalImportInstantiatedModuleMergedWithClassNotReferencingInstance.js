//// [tests/cases/compiler/internalImportInstantiatedModuleMergedWithClassNotReferencingInstance.ts] ////

//// [internalImportInstantiatedModuleMergedWithClassNotReferencingInstance.ts]
class A {
    aProp: string;
}
namespace A {
    export interface X { s: string }
    export var a = 10;
}

namespace B {
    var A = 1;
    import Y = A;
}


//// [internalImportInstantiatedModuleMergedWithClassNotReferencingInstance.js]
"use strict";
class A {
    aProp;
}
(function (A) {
    A.a = 10;
})(A || (A = {}));
var B;
(function (B) {
    var A = 1;
    var Y = A;
})(B || (B = {}));

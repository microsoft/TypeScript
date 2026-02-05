//// [tests/cases/compiler/internalImportUnInstantiatedModuleMergedWithClassNotReferencingInstance.ts] ////

//// [internalImportUnInstantiatedModuleMergedWithClassNotReferencingInstance.ts]
class A {
    aProp: string;
}
namespace A {
    export interface X { s: string }
}

namespace B {
    var A = 1;
    import Y = A;
}


//// [internalImportUnInstantiatedModuleMergedWithClassNotReferencingInstance.js]
"use strict";
class A {
    aProp;
}
var B;
(function (B) {
    var A = 1;
    var Y = A;
})(B || (B = {}));

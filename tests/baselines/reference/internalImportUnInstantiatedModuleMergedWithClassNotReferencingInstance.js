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
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B;
(function (B) {
    var A = 1;
})(B || (B = {}));

//// [classExpressionWithResolutionOfNamespaceOfSameName01.ts]
namespace C {
    export interface type {
    }
}

var x = class C {
    prop: C.type;
}

//// [classExpressionWithResolutionOfNamespaceOfSameName01.js]
var x = /** @class */ (function () {
    function C() {
    }
    return C;
}());

//// [tests/cases/compiler/nonExportedElementsOfMergedModules.ts] ////

//// [nonExportedElementsOfMergedModules.ts]
namespace One {
    enum A { X }
    namespace B {
        export var x;
    }
}

namespace One {
    enum A { Y }
    namespace B {
        export var y;
    }
    B.x;
    B.y;
}


//// [nonExportedElementsOfMergedModules.js]
var One;
(function (One) {
    var A;
    (function (A) {
        A[A["X"] = 0] = "X";
    })(A || (A = {}));
    var B;
    (function (B) {
    })(B || (B = {}));
})(One || (One = {}));
(function (One) {
    var A;
    (function (A) {
        A[A["Y"] = 0] = "Y";
    })(A || (A = {}));
    var B;
    (function (B) {
    })(B || (B = {}));
    B.x;
    B.y;
})(One || (One = {}));

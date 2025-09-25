//// [tests/cases/compiler/importAliasWithDottedName.ts] ////

//// [importAliasWithDottedName.ts]
namespace M {
    export var x = 1;
    export namespace N {
        export var y = 2;
    }
}

namespace A {
    import N = M.N;
    var r = N.y;
    var r2 = M.N.y;
}

//// [importAliasWithDottedName.js]
var M;
(function (M) {
    M.x = 1;
    var N;
    (function (N) {
        N.y = 2;
    })(N = M.N || (M.N = {}));
})(M || (M = {}));
var A;
(function (A) {
    var N = M.N;
    var r = N.y;
    var r2 = M.N.y;
})(A || (A = {}));

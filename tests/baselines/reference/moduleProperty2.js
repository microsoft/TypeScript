//// [tests/cases/compiler/moduleProperty2.ts] ////

//// [moduleProperty2.ts]
namespace M {
    function f() {
        var x;
    }
    var y;
    export var z;
    var test1=x;
    var test2=y; // y visible because same module
}

namespace N {
    var test3=M.y; // nope y private property of M
    var test4=M.z; // ok public property of M
}

//// [moduleProperty2.js]
var M;
(function (M) {
    function f() {
        var x;
    }
    var y;
    var test1 = x;
    var test2 = y; // y visible because same module
})(M || (M = {}));
var N;
(function (N) {
    var test3 = M.y; // nope y private property of M
    var test4 = M.z; // ok public property of M
})(N || (N = {}));

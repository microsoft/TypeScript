//// [tests/cases/compiler/overloadsInDifferentContainersDisagreeOnAmbient.ts] ////

//// [overloadsInDifferentContainersDisagreeOnAmbient.ts]
declare namespace M {
    // Error because body is not ambient and this overload is
    export function f();
}

namespace M {
    export function f() { }
}

//// [overloadsInDifferentContainersDisagreeOnAmbient.js]
var M;
(function (M) {
    function f() { }
    M.f = f;
})(M || (M = {}));

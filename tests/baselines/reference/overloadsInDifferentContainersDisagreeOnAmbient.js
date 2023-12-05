//// [tests/cases/compiler/overloadsInDifferentContainersDisagreeOnAmbient.ts] ////

//// [overloadsInDifferentContainersDisagreeOnAmbient.ts]
declare module M {
    // Error because body is not ambient and this overload is
    export function f();
}

module M {
    export function f() { }
}

//// [overloadsInDifferentContainersDisagreeOnAmbient.js]
var M;
(function (M) {
    function f() { }
    M.f = f;
})(M || (M = {}));

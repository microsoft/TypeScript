//// [tests/cases/compiler/duplicateIdentifiersAcrossContainerBoundaries.ts] ////

//// [duplicateIdentifiersAcrossContainerBoundaries.ts]
module M {
    export interface I { }
}
module M {
    export class I { }
}

module M {
    export function f() { }
}
module M {
    export class f { } // error
}

module M {
    function g() { }
}
module M {
    export class g { } // no error
}

module M {
    export class C { }
}
module M {
    function C() { } // no error
}

module M {
    export var v = 3;
}
module M {
    export var v = 3; // error for redeclaring var in a different parent
}

class Foo {
    static x: number;
}

module Foo {
    export var x: number; // error for redeclaring var in a different parent
}

module N {
    export module F {
        var t;
    }
}
declare module N {
    export function F(); // no error because function is ambient
}


//// [duplicateIdentifiersAcrossContainerBoundaries.js]
var M;
(function (M) {
    class I {
    }
    M.I = I;
})(M || (M = {}));
(function (M) {
    function f() { }
    M.f = f;
})(M || (M = {}));
(function (M) {
    class f {
    }
    M.f = f;
})(M || (M = {}));
(function (M) {
    function g() { }
})(M || (M = {}));
(function (M) {
    class g {
    }
    M.g = g;
})(M || (M = {}));
(function (M) {
    class C {
    }
    M.C = C;
})(M || (M = {}));
(function (M) {
    function C() { }
})(M || (M = {}));
(function (M) {
    M.v = 3;
})(M || (M = {}));
(function (M) {
    v = 3;
})(M || (M = {}));
class Foo {
    static x;
}
(function (Foo) {
})(Foo || (Foo = {}));
var N;
(function (N) {
    let F;
    (function (F) {
        var t;
    })(F = N.F || (N.F = {}));
})(N || (N = {}));

//// [tests/cases/compiler/duplicateIdentifiersAcrossContainerBoundaries.ts] ////

//// [duplicateIdentifiersAcrossContainerBoundaries.ts]
namespace M {
    export interface I { }
}
namespace M {
    export class I { }
}

namespace M {
    export function f() { }
}
namespace M {
    export class f { } // error
}

namespace M {
    function g() { }
}
namespace M {
    export class g { } // no error
}

namespace M {
    export class C { }
}
namespace M {
    function C() { } // no error
}

namespace M {
    export var v = 3;
}
namespace M {
    export var v = 3; // error for redeclaring var in a different parent
}

class Foo {
    static x: number;
}

namespace Foo {
    export var x: number; // error for redeclaring var in a different parent
}

namespace N {
    export namespace F {
        var t;
    }
}
declare namespace N {
    export function F(); // no error because function is ambient
}


//// [duplicateIdentifiersAcrossContainerBoundaries.js]
"use strict";
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
    } // error
    M.f = f;
})(M || (M = {}));
(function (M) {
    function g() { }
})(M || (M = {}));
(function (M) {
    class g {
    } // no error
    M.g = g;
})(M || (M = {}));
(function (M) {
    class C {
    }
    M.C = C;
})(M || (M = {}));
(function (M) {
    function C() { } // no error
})(M || (M = {}));
(function (M) {
    M.v = 3;
})(M || (M = {}));
(function (M) {
    v = 3; // error for redeclaring var in a different parent
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

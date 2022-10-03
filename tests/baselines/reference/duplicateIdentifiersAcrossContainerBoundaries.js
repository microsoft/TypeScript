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
    var I = /** @class */ (function () {
        function I() {
        }
        return I;
    }());
    M.I = I;
})(M || (M = {}));
(function (M) {
    function f() { }
    M.f = f;
})(M || (M = {}));
(function (M) {
    var f = /** @class */ (function () {
        function f() {
        }
        return f;
    }()); // error
    M.f = f;
})(M || (M = {}));
(function (M) {
    function g() { }
})(M || (M = {}));
(function (M) {
    var g = /** @class */ (function () {
        function g() {
        }
        return g;
    }()); // no error
    M.g = g;
})(M || (M = {}));
(function (M) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    M.C = C;
})(M || (M = {}));
(function (M) {
    function C() { } // no error
})(M || (M = {}));
(function (M) {
    M.v = 3;
})(M || (M = {}));
(function (M) {
    M.v = 3; // error for redeclaring var in a different parent
})(M || (M = {}));
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
(function (Foo) {
})(Foo || (Foo = {}));
var N;
(function (N) {
    var F;
    (function (F) {
        var t;
    })(F = N.F || (N.F = {}));
})(N || (N = {}));

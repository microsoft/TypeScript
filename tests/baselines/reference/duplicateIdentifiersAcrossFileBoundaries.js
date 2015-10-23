//// [tests/cases/compiler/duplicateIdentifiersAcrossFileBoundaries.ts] ////

//// [file1.ts]

interface I { }
class C1 { }
class C2 { }
function f() { }
var v = 3;

class Foo {
    static x: number;
}

module N {
    export module F {
        var t;
    }
}

//// [file2.ts]
class I { } // error -- cannot merge interface with non-ambient class
interface C1 { } // error -- cannot merge interface with non-ambient class
function C2() { } // error -- cannot merge function with non-ambient class
class f { } // error -- cannot merge function with non-ambient class
var v = 3;

module Foo {
    export var x: number; // error for redeclaring var in a different parent
}

declare module N {
    export function F(); // no error because function is ambient
}


//// [file1.js]
var C1 = (function () {
    function C1() {
    }
    return C1;
})();
var C2 = (function () {
    function C2() {
    }
    return C2;
})();
function f() { }
var v = 3;
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();
var N;
(function (N) {
    var F;
    (function (F) {
        var t;
    })(F = N.F || (N.F = {}));
})(N || (N = {}));
//// [file2.js]
var I = (function () {
    function I() {
    }
    return I;
})(); // error -- cannot merge interface with non-ambient class
function C2() { } // error -- cannot merge function with non-ambient class
var f = (function () {
    function f() {
    }
    return f;
})(); // error -- cannot merge function with non-ambient class
var v = 3;
var Foo;
(function (Foo) {
})(Foo || (Foo = {}));

//// [tests/cases/compiler/nameCollisions.ts] ////

//// [nameCollisions.ts]
namespace T {
    var x = 2;

    namespace x { // error
        export class Bar {
            test: number;
        }
    }

    namespace z {
        var t;
    }
    var z; // error

    namespace y {
        var b;
    }

    class y { } // error

    var w;
    namespace w { } //ok

    var f;
    function f() { } //error

    function f2() { }
    var f2; // error

    var i;
    interface i { } //ok

    class C { }
    function C() { } // error

    function C2() { }
    class C2 { } // error

    function fi() { }
    interface fi { } // ok

    class cli { }
    interface cli { }

    interface cli2 { }
    class cli2 { }
}

//// [nameCollisions.js]
"use strict";
var T;
(function (T) {
    var x = 2;
    (function (x) {
        class Bar {
            test;
        }
        x.Bar = Bar;
    })(x || (x = {}));
    let z;
    (function (z) {
        var t;
    })(z || (z = {}));
    var z; // error
    let y;
    (function (y) {
        var b;
    })(y || (y = {}));
    class y {
    } // error
    var w;
    var f;
    function f() { } //error
    function f2() { }
    var f2; // error
    var i;
    class C {
    }
    function C() { } // error
    function C2() { }
    class C2 {
    } // error
    function fi() { }
    class cli {
    }
    class cli2 {
    }
})(T || (T = {}));

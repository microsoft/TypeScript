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
var T;
(function (T) {
    var x = 2;
    var x;
    (function (x) {
        var Bar = /** @class */ (function () {
            function Bar() {
            }
            return Bar;
        }());
        x.Bar = Bar;
    })(x || (x = {}));
    var z;
    (function (z) {
        var t;
    })(z || (z = {}));
    var z; // error
    var y;
    (function (y) {
        var b;
    })(y || (y = {}));
    var y = /** @class */ (function () {
        function y() {
        }
        return y;
    }()); // error
    var w;
    var f;
    function f() { } //error
    function f2() { }
    var f2; // error
    var i;
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    function C() { } // error
    function C2() { }
    var C2 = /** @class */ (function () {
        function C2() {
        }
        return C2;
    }()); // error
    function fi() { }
    var cli = /** @class */ (function () {
        function cli() {
        }
        return cli;
    }());
    var cli2 = /** @class */ (function () {
        function cli2() {
        }
        return cli2;
    }());
})(T || (T = {}));

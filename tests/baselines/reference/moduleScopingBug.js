//// [tests/cases/compiler/moduleScopingBug.ts] ////

//// [moduleScopingBug.ts]
module M

{

    var outer: number;

    function f() {

        var inner = outer;   // Ok

    }

    class C {

        constructor() {
            var inner = outer;   // Ok
        }

    }

    module X {

        var inner = outer;   // Error: outer not visible

    }

}



//// [moduleScopingBug.js]
var M;
(function (M) {
    var outer;
    function f() {
        var inner = outer; // Ok
    }
    var C = /** @class */ (function () {
        function C() {
            var inner = outer; // Ok
        }
        return C;
    }());
    var X;
    (function (X) {
        var inner = outer; // Error: outer not visible
    })(X || (X = {}));
})(M || (M = {}));

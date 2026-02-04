//// [tests/cases/compiler/moduleScopingBug.ts] ////

//// [moduleScopingBug.ts]
namespace M

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

    namespace X {

        var inner = outer;   // Error: outer not visible

    }

}



//// [moduleScopingBug.js]
"use strict";
var M;
(function (M) {
    var outer;
    function f() {
        var inner = outer; // Ok
    }
    class C {
        constructor() {
            var inner = outer; // Ok
        }
    }
    let X;
    (function (X) {
        var inner = outer; // Error: outer not visible
    })(X || (X = {}));
})(M || (M = {}));

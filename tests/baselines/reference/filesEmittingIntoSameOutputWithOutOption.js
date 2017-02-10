//// [tests/cases/compiler/filesEmittingIntoSameOutputWithOutOption.ts] ////

//// [a.ts]
export class c {
}

//// [b.ts]
function foo() {
}


//// [a.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var c = (function () {
        function c() {
        }
        return c;
    }());
    exports.c = c;
});
function foo() {
}

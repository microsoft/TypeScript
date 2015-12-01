//// [tests/cases/compiler/filesEmittingIntoSameOutputWithOutOption.ts] ////

//// [a.ts]
export class c {
}

//// [b.ts]
function foo() {
}


//// [a.js]
define("tests/cases/compiler/a", ["require", "exports"], function (require, exports) {
    "use strict";
    var c = (function () {
        function c() {
        }
        return c;
    })();
    exports.c = c;
});
function foo() {
}

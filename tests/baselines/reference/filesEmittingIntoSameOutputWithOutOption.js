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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.c = void 0;
    class c {
    }
    exports.c = c;
});
function foo() {
}

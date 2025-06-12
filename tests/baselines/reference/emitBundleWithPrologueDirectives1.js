//// [tests/cases/compiler/emitBundleWithPrologueDirectives1.ts] ////

//// [test.ts]
/* Detached Comment */

// Class Doo Comment
export class Doo {}
class Scooby extends Doo {}

//// [outFile.js]
/* Detached Comment */
define("test", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Doo = void 0;
    // Class Doo Comment
    class Doo {
    }
    exports.Doo = Doo;
    class Scooby extends Doo {
    }
});

//// [tests/cases/compiler/modulePrologueAMD.ts] ////

//// [modulePrologueAMD.ts]
"use strict";

export class Foo {}

//// [modulePrologueAMD.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Foo = void 0;
    var Foo = /** @class */ (function () {
        function Foo() {
        }
        return Foo;
    }());
    exports.Foo = Foo;
});

//// [modulePrologueAMD.ts]
"use strict";

export class Foo {}

//// [modulePrologueAMD.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Foo = void 0;
    var Foo = /** @class */ (function () {
        function Foo() {
        }
        return Foo;
    }());
    exports.Foo = Foo;
});

//// [modulePrologueAMD.ts]
"use strict";

export class Foo {}

//// [modulePrologueAMD.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    }());
    exports.Foo = Foo;
});

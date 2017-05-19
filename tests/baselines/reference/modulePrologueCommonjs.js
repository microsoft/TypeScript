//// [modulePrologueCommonjs.ts]
"use strict";

export class Foo {}

//// [modulePrologueCommonjs.js]
"use strict";
exports.__esModule = true;
var Foo = (function () {
    function Foo() {
    }
    return Foo;
}());
exports.Foo = Foo;

//// [exportDefaultTypeAndClass.ts]
export default class Foo {}
type Bar = {}
export default Bar


//// [exportDefaultTypeAndClass.js]
"use strict";
exports.__esModule = true;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
exports["default"] = Foo;

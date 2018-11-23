//// [autoEmitAMDModuleNames1.ts]
class Foo {
    x: number;
    constructor() {
        this.x = 5;
    }
}
export = Foo;

//// [autoEmitAMDModuleNames1.js]
define("autoEmitAMDModuleNames1", ["require", "exports"], function (require, exports) {
    "use strict";
    var Foo = /** @class */ (function () {
        function Foo() {
            this.x = 5;
        }
        return Foo;
    }());
    return Foo;
});

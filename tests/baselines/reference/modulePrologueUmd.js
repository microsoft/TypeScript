//// [modulePrologueUmd.ts]
"use strict";

export class Foo {}

//// [modulePrologueUmd.js]
(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports"], function (require, exports) {
    "use strict";
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    }());
    exports.Foo = Foo;
});

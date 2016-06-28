//// [tests/cases/conformance/es6/moduleExportsUmd/defaultExportsGetExportedUmd.ts] ////

//// [a.ts]
export default class Foo {}

//// [b.ts]
export default function foo() {}


//// [a.js]
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    class Foo {
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Foo;
});
//// [b.js]
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    function foo() { }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = foo;
});

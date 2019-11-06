//// [tests/cases/conformance/es2020/modules/exportAsNamespace1_umd.ts] ////

//// [0.ts]
export const a = 1;
export const b = 2;

//// [1.ts]
export * as ns from './0';
ns.a;
ns.b;

//// [2.ts]
import * as foo from './1'

foo.ns.a;
foo.ns.b;

//// [0.js]
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.a = 1;
    exports.b = 2;
});
//// [1.js]
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./0"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var _0_1 = require("./0");
    exports.ns = _0_1;
    exports.ns.a;
    exports.ns.b;
});
//// [2.js]
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./1"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var foo = require("./1");
    foo.ns.a;
    foo.ns.b;
});

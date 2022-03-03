//// [tests/cases/conformance/salsa/commonJSImportExportedClassExpression.ts] ////

//// [main.js]
const { K } = require("./mod1");
/** @param {K} k */
function f(k) {
    k.values()
}

//// [mod1.js]
exports.K = class K {
    values() {
    }
};


//// [mod1.js]
"use strict";
exports.K = /** @class */ (function () {
    function K() {
    }
    K.prototype.values = function () {
    };
    return K;
}());
//// [main.js]
"use strict";
var K = require("./mod1").K;
/** @param {K} k */
function f(k) {
    k.values();
}


//// [mod1.d.ts]
export class K {
    values(): void;
}
//// [main.d.ts]
export {};

//// [tests/cases/conformance/salsa/commonJSImportNestedClassTypeReference.ts] ////

//// [main.js]
const { K } = require("./mod1");
/** @param {K} k */
function f(k) {
    k.values()
}

//// [mod1.js]
var NS = {}
NS.K =class {
    values() {
        return new NS.K()
    }
}
exports.K = NS.K;


//// [mod1.js]
"use strict";
var NS = {};
NS.K = /** @class */ (function () {
    function K() {
    }
    K.prototype.values = function () {
        return new NS.K();
    };
    return K;
}());
exports.K = NS.K;
//// [main.js]
"use strict";
var K = require("./mod1").K;
/** @param {K} k */
function f(k) {
    k.values();
}


//// [mod1.d.ts]
export var K: {
    new (): {
        values(): any;
    };
};
//// [main.d.ts]
export {};

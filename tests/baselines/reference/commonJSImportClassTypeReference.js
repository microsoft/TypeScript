//// [tests/cases/conformance/salsa/commonJSImportClassTypeReference.ts] ////

//// [main.js]
const { K } = require("./mod1");
/** @param {K} k */
function f(k) {
    k.values()
}

//// [mod1.js]
class K {
    values() {
        return new K()
    }
}
exports.K = K;


//// [mod1.js]
"use strict";
var K = /** @class */ (function () {
    function K() {
    }
    K.prototype.values = function () {
        return new K();
    };
    return K;
}());
exports.K = K;
//// [main.js]
"use strict";
var K = require("./mod1").K;
/** @param {K} k */
function f(k) {
    k.values();
}


//// [mod1.d.ts]
export class K {
    values(): K;
}
//// [main.d.ts]
export {};

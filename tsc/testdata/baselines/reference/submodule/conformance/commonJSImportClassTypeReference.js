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
Object.defineProperty(exports, "__esModule", { value: true });
class K {
    values() {
        return new K();
    }
}
export var K = K;
exports.K = K;
//// [main.js]
"use strict";
const { K } = require("./mod1");
/** @param {K} k */
function f(k) {
    k.values();
}


//// [mod1.d.ts]
export var K = K;
export {};
//// [main.d.ts]
export {};

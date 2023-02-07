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
        values(): this;
    };
};
//// [main.d.ts]
export {};


//// [DtsFileErrors]


out/mod1.d.ts(3,19): error TS2526: A 'this' type is available only in a non-static member of a class or interface.


==== out/main.d.ts (0 errors) ====
    export {};
    
==== out/mod1.d.ts (1 errors) ====
    export var K: {
        new (): {
            values(): this;
                      ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
        };
    };
    
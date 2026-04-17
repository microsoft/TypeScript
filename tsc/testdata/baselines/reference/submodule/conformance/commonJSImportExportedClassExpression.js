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
exports.K = class K {
    values() {
    }
};
//// [main.js]
"use strict";
const { K } = require("./mod1");
/** @param {K} k */
function f(k) {
    k.values();
}


//// [mod1.d.ts]
export declare var K: {
    new (): K;
};
//// [main.d.ts]
export {};


//// [DtsFileErrors]


out/mod1.d.ts(2,13): error TS2749: 'K' refers to a value, but is being used as a type here. Did you mean 'typeof K'?


==== out/main.d.ts (0 errors) ====
    export {};
    
==== out/mod1.d.ts (1 errors) ====
    export declare var K: {
        new (): K;
                ~
!!! error TS2749: 'K' refers to a value, but is being used as a type here. Did you mean 'typeof K'?
    };
    
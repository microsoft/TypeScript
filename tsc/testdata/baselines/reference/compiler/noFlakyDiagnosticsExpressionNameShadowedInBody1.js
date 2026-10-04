//// [tests/cases/compiler/noFlakyDiagnosticsExpressionNameShadowedInBody1.ts] ////

//// [noFlakyDiagnosticsExpressionNameShadowedInBody1.ts]
const x = function f() {
    let f = 1;
};

const y = class C {
    static {
        let C = 1;
    }
};


//// [noFlakyDiagnosticsExpressionNameShadowedInBody1.js]
"use strict";
const x = function f() {
    let f = 1;
};
const y = class C {
    static {
        let C = 1;
    }
};

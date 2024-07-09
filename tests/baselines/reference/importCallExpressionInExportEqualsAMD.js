//// [tests/cases/conformance/dynamicImport/importCallExpressionInExportEqualsAMD.ts] ////

//// [something.ts]
export = 42;

//// [index.ts]
export = async function() {
    const something = await import("./something");
};

//// [something.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    return 42;
});
//// [index.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    return async function () {
        const something = await new Promise((resolve_1, reject_1) => { require(["./something"], resolve_1, reject_1); });
    };
});

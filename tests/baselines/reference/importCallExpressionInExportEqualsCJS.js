//// [tests/cases/conformance/dynamicImport/importCallExpressionInExportEqualsCJS.ts] ////

//// [something.ts]
export = 42;

//// [index.ts]
export = async function() {
    const something = await import("./something");
};

//// [something.js]
"use strict";
module.exports = 42;
//// [index.js]
"use strict";
module.exports = async function () {
    const something = await Promise.resolve().then(() => require("./something"));
};

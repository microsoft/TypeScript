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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
module.exports = async function () {
    const something = await Promise.resolve().then(() => __importStar(require("./something")));
};

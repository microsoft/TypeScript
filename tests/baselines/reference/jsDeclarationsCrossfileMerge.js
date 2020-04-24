//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsCrossfileMerge.ts] ////

//// [index.js]
const m = require("./exporter");

module.exports = m.default;
module.exports.memberName = "thing";

//// [exporter.js]
function validate() {}

export default validate;


//// [exporter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validate() { }
exports.default = validate;
//// [index.js]
var m = require("./exporter");
module.exports = m.default;
module.exports.memberName = "thing";


//// [index.d.ts]
declare const _exports: typeof import("./exporter").default;
export = _exports;

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
declare const _exports: typeof m.default;
export = _exports;
import m = require("./exporter");


!!!! File out/exporter.d.ts missing from original emit, but present in noCheck emit
//// [exporter.d.ts]
export default validate;
declare function validate(): void;

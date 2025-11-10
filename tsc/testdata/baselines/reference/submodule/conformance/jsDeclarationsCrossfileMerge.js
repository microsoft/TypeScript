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
const m = require("./exporter");
module.exports = m.default;
export var memberName = "thing";
module.exports.memberName = "thing";


//// [exporter.d.ts]
declare function validate(): void;
export default validate;
//// [index.d.ts]
declare const m: typeof m;
declare const _default: typeof m.default;
export = _default;
export declare var memberName: string;

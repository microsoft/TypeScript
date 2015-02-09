//// [tests/cases/compiler/es6ImportNamedImportInExportAssignment.ts] ////

//// [es6ImportNamedImportInExportAssignment_0.ts]

export var a = 10;

//// [es6ImportNamedImportInExportAssignment_1.ts]
import { a } from "es6ImportNamedImportInExportAssignment_0";
export = a;

//// [es6ImportNamedImportInExportAssignment_0.js]
exports.a = 10;
//// [es6ImportNamedImportInExportAssignment_1.js]
var _a = require("es6ImportNamedImportInExportAssignment_0");
var a = _a.a;
module.exports = a;

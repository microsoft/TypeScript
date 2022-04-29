//// [tests/cases/compiler/es6ImportNamedImportInExportAssignment.ts] ////

//// [es6ImportNamedImportInExportAssignment_0.ts]
export var a = 10;

//// [es6ImportNamedImportInExportAssignment_1.ts]
import { a } from "./es6ImportNamedImportInExportAssignment_0";
export = a;

//// [es6ImportNamedImportInExportAssignment_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
//// [es6ImportNamedImportInExportAssignment_1.js]
"use strict";
const es6ImportNamedImportInExportAssignment_0_1 = require("./es6ImportNamedImportInExportAssignment_0");
module.exports = es6ImportNamedImportInExportAssignment_0_1.a;


//// [es6ImportNamedImportInExportAssignment_0.d.ts]
export declare var a: number;
//// [es6ImportNamedImportInExportAssignment_1.d.ts]
import { a } from "./es6ImportNamedImportInExportAssignment_0";
export = a;

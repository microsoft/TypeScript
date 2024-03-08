//// [tests/cases/compiler/duplicateDefaultExport.ts] ////

//// [duplicateDefaultExport.ts]
export default 0;
export default function() {}


//// [duplicateDefaultExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
exports.default = 0;
function default_1() { }

//// [tests/cases/conformance/salsa/moduleExportDuplicateAlias.ts] ////

//// [moduleExportAliasDuplicateAlias.js]
exports.apply = undefined;
function a() { }
exports.apply()
exports.apply = a;
exports.apply()

//// [test.js]
const { apply } = require('./moduleExportAliasDuplicateAlias')
apply()


//// [moduleExportAliasDuplicateAlias.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
export var apply = undefined;
exports.apply = undefined;
function a() { }
exports.apply();
export var apply = a;
exports.apply = a;
exports.apply();
//// [test.js]
"use strict";
const { apply } = require('./moduleExportAliasDuplicateAlias');
apply();


//// [moduleExportAliasDuplicateAlias.d.ts]
export var apply = undefined;
export var apply = a;
export {};
//// [test.d.ts]
export {};

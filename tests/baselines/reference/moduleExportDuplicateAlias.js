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
exports.apply = undefined;
function a() { }
exports.apply();
exports.apply = a;
exports.apply();
//// [test.js]
"use strict";
var apply = require('./moduleExportAliasDuplicateAlias').apply;
apply();


//// [moduleExportAliasDuplicateAlias.d.ts]
export { a as apply };
declare function a(): void;
//// [test.d.ts]
export {};

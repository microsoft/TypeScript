//// [tests/cases/conformance/salsa/moduleExportDuplicateAlias2.ts] ////

//// [moduleExportAliasDuplicateAlias.js]
module.exports.apply = undefined;
function a() { }
module.exports.apply = a;
module.exports.apply = a;
module.exports.apply()

//// [test.js]
const { apply } = require('./moduleExportAliasDuplicateAlias')
apply()


//// [moduleExportAliasDuplicateAlias.js]
"use strict";
module.exports.apply = undefined;
function a() { }
module.exports.apply = a;
module.exports.apply = a;
module.exports.apply();
//// [test.js]
"use strict";
var apply = require('./moduleExportAliasDuplicateAlias').apply;
apply();


//// [moduleExportAliasDuplicateAlias.d.ts]
export { a as apply };
declare function a(): void;
//// [test.d.ts]
export {};

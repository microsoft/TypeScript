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
const { apply } = require('./moduleExportAliasDuplicateAlias');
apply();


//// [moduleExportAliasDuplicateAlias.d.ts]
export declare var apply: typeof a;
declare function a(): void;
export declare var apply: typeof a;
export declare var apply: typeof a;
//// [test.d.ts]
export {};

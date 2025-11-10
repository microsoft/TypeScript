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
export var apply = undefined;
module.exports.apply = undefined;
function a() { }
export var apply = a;
module.exports.apply = a;
export var apply = a;
module.exports.apply = a;
module.exports.apply();
//// [test.js]
"use strict";
const { apply } = require('./moduleExportAliasDuplicateAlias');
apply();


//// [moduleExportAliasDuplicateAlias.d.ts]
export declare var apply: undefined;
export declare var apply: undefined;
export declare var apply: undefined;
//// [test.d.ts]
export {};

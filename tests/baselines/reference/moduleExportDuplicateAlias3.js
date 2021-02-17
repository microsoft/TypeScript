//// [tests/cases/conformance/salsa/moduleExportDuplicateAlias3.ts] ////

//// [moduleExportAliasDuplicateAlias.js]
exports.apply = undefined;
exports.apply = undefined;
function a() { }
exports.apply = a;
exports.apply()
exports.apply = 'ok'
var OK = exports.apply.toUpperCase()
exports.apply = 1

//// [test.js]
const { apply } = require('./moduleExportAliasDuplicateAlias')
const result = apply.toFixed()


//// [moduleExportAliasDuplicateAlias.js]
"use strict";
exports.apply = undefined;
exports.apply = undefined;
function a() { }
exports.apply = a;
exports.apply();
exports.apply = 'ok';
var OK = exports.apply.toUpperCase();
exports.apply = 1;
//// [test.js]
"use strict";
var apply = require('./moduleExportAliasDuplicateAlias').apply;
var result = apply.toFixed();


//// [moduleExportAliasDuplicateAlias.d.ts]
export var apply: string | number | typeof a | undefined;
export { a as apply };
declare function a(): void;
//// [test.d.ts]
export {};

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
const { apply } = require('./moduleExportAliasDuplicateAlias');
const result = apply.toFixed();


//// [moduleExportAliasDuplicateAlias.d.ts]
export declare var apply: "ok" | 1 | typeof a | undefined;
export declare var apply: "ok" | 1 | typeof a | undefined;
declare function a(): void;
export declare var apply: "ok" | 1 | typeof a | undefined;
export declare var apply: "ok" | 1 | typeof a | undefined;
export declare var apply: "ok" | 1 | typeof a | undefined;
//// [test.d.ts]
export {};

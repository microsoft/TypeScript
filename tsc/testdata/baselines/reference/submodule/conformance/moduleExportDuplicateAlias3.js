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
Object.defineProperty(exports, "__esModule", { value: true });
export var apply = undefined;
exports.apply = undefined;
export var apply = undefined;
exports.apply = undefined;
function a() { }
export var apply = a;
exports.apply = a;
exports.apply();
export var apply = 'ok';
exports.apply = 'ok';
var OK = exports.apply.toUpperCase();
export var apply = 1;
exports.apply = 1;
//// [test.js]
"use strict";
const { apply } = require('./moduleExportAliasDuplicateAlias');
const result = apply.toFixed();


//// [moduleExportAliasDuplicateAlias.d.ts]
export var apply = undefined;
export var apply = undefined;
export var apply = a;
export var apply = 'ok';
export var apply = 1;
export {};
//// [test.d.ts]
export {};

//// [tests/cases/compiler/declFileForExportedImport.ts] ////

//// [declFileForExportedImport_0.ts]
export var x: number;

//// [declFileForExportedImport_1.ts]
///<reference path='declFileForExportedImport_0.ts'/>
export import a = require('./declFileForExportedImport_0');
var y = a.x;

export import b = a;
var z = b.x;

//// [declFileForExportedImport_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
//// [declFileForExportedImport_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
///<reference path='declFileForExportedImport_0.ts'/>
exports.a = require("./declFileForExportedImport_0");
var y = exports.a.x;
exports.b = exports.a;
var z = exports.b.x;


//// [declFileForExportedImport_0.d.ts]
export declare var x: number;
//// [declFileForExportedImport_1.d.ts]
export import a = require('./declFileForExportedImport_0');
export import b = a;

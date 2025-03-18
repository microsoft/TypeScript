//// [tests/cases/compiler/declFileExportImportChain2.ts] ////

//// [declFileExportImportChain2_a.ts]
module m1 {
    export module m2 {
        export class c1 {
        }
    }
}
export = m1;

//// [declFileExportImportChain2_b.ts]
import a = require("declFileExportImportChain2_a");
export = a;

//// [declFileExportImportChain2_c.ts]
export import b = require("declFileExportImportChain2_b");

//// [declFileExportImportChain2_d.ts]
import c = require("declFileExportImportChain2_c");
export var x: c.b.m2.c1;

//// [declFileExportImportChain2_d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;

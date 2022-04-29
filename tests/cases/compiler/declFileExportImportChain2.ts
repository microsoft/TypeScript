//@module: amd
//@declaration: true

// @Filename: declFileExportImportChain2_a.ts
module m1 {
    export module m2 {
        export class c1 {
        }
    }
}
export = m1;

// @Filename: declFileExportImportChain2_b.ts
import a = require("declFileExportImportChain2_a");
export = a;

// @Filename: declFileExportImportChain2_c.ts
export import b = require("declFileExportImportChain2_b");

// @Filename: declFileExportImportChain2_d.ts
import c = require("declFileExportImportChain2_c");
export var x: c.b.m2.c1;
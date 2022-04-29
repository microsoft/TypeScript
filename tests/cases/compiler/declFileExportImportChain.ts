//@module: amd
//@declaration: true

// @Filename: declFileExportImportChain_a.ts
module m1 {
    export module m2 {
        export class c1 {
        }
    }
}
export = m1;

// @Filename: declFileExportImportChain_b.ts
export import a = require("declFileExportImportChain_a");

// @Filename: declFileExportImportChain_b1.ts
import b = require("declFileExportImportChain_b");
export = b;

// @Filename: declFileExportImportChain_c.ts
export import b1 = require("declFileExportImportChain_b1");

// @Filename: declFileExportImportChain_d.ts
import c = require("declFileExportImportChain_c");
export var x: c.b1.a.m2.c1;
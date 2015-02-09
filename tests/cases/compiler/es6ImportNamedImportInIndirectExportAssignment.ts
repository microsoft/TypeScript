// @target: es6
// @module: commonjs

// @filename: es6ImportNamedImportInIndirectExportAssignment_0.ts
export module a {
    export class c {
    }
}

// @filename: es6ImportNamedImportInIndirectExportAssignment_1.ts
import { a } from "es6ImportNamedImportInIndirectExportAssignment_0";
import x = a;
export = x;
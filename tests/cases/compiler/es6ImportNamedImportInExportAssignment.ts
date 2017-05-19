// @target: es6
// @module: commonjs
// @declaration: true

// @filename: es6ImportNamedImportInExportAssignment_0.ts
export var a = 10;

// @filename: es6ImportNamedImportInExportAssignment_1.ts
import { a } from "./es6ImportNamedImportInExportAssignment_0";
export = a;
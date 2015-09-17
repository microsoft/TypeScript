// @module: commonjs

// @filename: es6ImportNamedImportNoExportMember_0.ts
export var a = 10;
export var x = a;

// @filename: es6ImportNamedImport_1.ts
import { a1 } from "./es6ImportNamedImportNoExportMember_0";
import { x1 as x } from "./es6ImportNamedImportNoExportMember_0";
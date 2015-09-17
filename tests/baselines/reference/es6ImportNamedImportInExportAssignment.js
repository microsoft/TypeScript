//// [tests/cases/compiler/es6ImportNamedImportInExportAssignment.ts] ////

//// [es6ImportNamedImportInExportAssignment_0.ts]

export var a = 10;

//// [es6ImportNamedImportInExportAssignment_1.ts]
import { a } from "./es6ImportNamedImportInExportAssignment_0";
export = a;

//// [es6ImportNamedImportInExportAssignment_0.js]
export var a = 10;
//// [es6ImportNamedImportInExportAssignment_1.js]
import { a } from "./es6ImportNamedImportInExportAssignment_0";


//// [es6ImportNamedImportInExportAssignment_0.d.ts]
export declare var a: number;
//// [es6ImportNamedImportInExportAssignment_1.d.ts]
import { a } from "./es6ImportNamedImportInExportAssignment_0";
export = a;

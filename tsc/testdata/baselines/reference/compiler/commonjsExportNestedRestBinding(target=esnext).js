//// [tests/cases/compiler/commonjsExportNestedRestBinding.ts] ////

//// [commonjsExportNestedRestBinding.ts]
declare const source: any;
export const {...{object}} = source;


//// [commonjsExportNestedRestBinding.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.object = void 0;
({ ...{ object: exports.object } } = source);

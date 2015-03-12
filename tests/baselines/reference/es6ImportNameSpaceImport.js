//// [tests/cases/compiler/es6ImportNameSpaceImport.ts] ////

//// [es6ImportNameSpaceImport_0.ts]

export var a = 10;

//// [es6ImportNameSpaceImport_1.ts]
import * as nameSpaceBinding from "es6ImportNameSpaceImport_0";


//// [es6ImportNameSpaceImport_0.js]
exports.a = 10;
//// [es6ImportNameSpaceImport_1.js]


//// [es6ImportNameSpaceImport_0.d.ts]
export declare var a: number;
//// [es6ImportNameSpaceImport_1.d.ts]

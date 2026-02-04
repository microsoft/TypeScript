//// [tests/cases/compiler/es6ImportNameSpaceImportMergeErrors.ts] ////

//// [es6ImportNameSpaceImportMergeErrors_0.ts]
export var a = 10;

//// [es6ImportNameSpaceImportMergeErrors_1.ts]
import * as nameSpaceBinding from "./es6ImportNameSpaceImportMergeErrors_0"; 
interface nameSpaceBinding { } // this should be ok

import * as nameSpaceBinding1 from "./es6ImportNameSpaceImportMergeErrors_0"; // should be error
import * as nameSpaceBinding1 from "./es6ImportNameSpaceImportMergeErrors_0"; // should be error

import * as nameSpaceBinding3 from "./es6ImportNameSpaceImportMergeErrors_0"; // should be error
var nameSpaceBinding3 = 10;


//// [es6ImportNameSpaceImportMergeErrors_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
//// [es6ImportNameSpaceImportMergeErrors_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nameSpaceBinding3 = 10;

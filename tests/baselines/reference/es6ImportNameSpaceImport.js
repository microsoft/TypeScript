//// [tests/cases/compiler/es6ImportNameSpaceImport.ts] ////

//// [es6ImportNameSpaceImport_0.ts]

export var a = 10;

//// [es6ImportNameSpaceImport_1.ts]
import * as nameSpaceBinding from "./es6ImportNameSpaceImport_0";
var x = nameSpaceBinding.a;
import * as nameSpaceBinding2 from "./es6ImportNameSpaceImport_0"; // elide this


//// [es6ImportNameSpaceImport_0.js]
"use strict";
exports.a = 10;
//// [es6ImportNameSpaceImport_1.js]
"use strict";
var nameSpaceBinding = require("./es6ImportNameSpaceImport_0");
var x = nameSpaceBinding.a;


//// [es6ImportNameSpaceImport_0.d.ts]
export declare var a: number;
//// [es6ImportNameSpaceImport_1.d.ts]

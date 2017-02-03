//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBindingWithExport.ts] ////

//// [server.ts]

export var a = 10;

//// [client.ts]
export import defaultBinding, * as nameSpaceBinding  from "./server";
export var x: number = nameSpaceBinding.a;

//// [server.js]
"use strict";
exports.a = 10;
exports.__esModule = true;
//// [client.js]
"use strict";
var nameSpaceBinding = require("./server");
exports.x = nameSpaceBinding.a;
exports.__esModule = true;


//// [server.d.ts]
export declare var a: number;
//// [client.d.ts]
export declare var x: number;

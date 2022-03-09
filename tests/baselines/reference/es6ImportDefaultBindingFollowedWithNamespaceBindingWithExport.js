//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBindingWithExport.ts] ////

//// [server.ts]
export var a = 10;

//// [client.ts]
export import defaultBinding, * as nameSpaceBinding  from "./server";
export var x: number = nameSpaceBinding.a;

//// [server.js]
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = 10;
//// [client.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
var nameSpaceBinding = require("./server");
exports.x = nameSpaceBinding.a;


//// [server.d.ts]
export declare var a: number;
//// [client.d.ts]
export declare var x: number;

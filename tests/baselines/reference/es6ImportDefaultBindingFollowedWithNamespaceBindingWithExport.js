//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBindingWithExport.ts] ////

//// [server.ts]

export var a = 10;

//// [client.ts]
export import defaultBinding, * as nameSpaceBinding  from "./server";
export var x: number = nameSpaceBinding.a;

//// [server.js]
exports.a = 10;
//// [client.js]
var server_1 = require("./server"), nameSpaceBinding = server_1;
exports.x = nameSpaceBinding.a;


//// [server.d.ts]
export declare var a: number;

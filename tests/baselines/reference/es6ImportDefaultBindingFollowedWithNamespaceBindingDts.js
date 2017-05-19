//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBindingDts.ts] ////

//// [server.ts]
export class a { }

//// [client.ts]
import defaultBinding, * as nameSpaceBinding  from "./server";
export var x = new nameSpaceBinding.a();

//// [server.js]
"use strict";
exports.__esModule = true;
var a = (function () {
    function a() {
    }
    return a;
}());
exports.a = a;
//// [client.js]
"use strict";
exports.__esModule = true;
var nameSpaceBinding = require("./server");
exports.x = new nameSpaceBinding.a();


//// [server.d.ts]
export declare class a {
}
//// [client.d.ts]
import * as nameSpaceBinding from "./server";
export declare var x: nameSpaceBinding.a;

//// [tests/cases/compiler/es6ImportNameSpaceImportDts.ts] ////

//// [server.ts]

export class c { };  

//// [client.ts]
import * as nameSpaceBinding from "./server";
export var x = new nameSpaceBinding.c();
import * as nameSpaceBinding2 from "./server"; // unreferenced

//// [server.js]
"use strict";
var c = (function () {
    function c() {
    }
    return c;
})();
exports.c = c;
;
//// [client.js]
"use strict";
var nameSpaceBinding = require("./server");
exports.x = new nameSpaceBinding.c();


//// [server.d.ts]
export declare class c {
}
//// [client.d.ts]
import * as nameSpaceBinding from "./server";
export declare var x: nameSpaceBinding.c;

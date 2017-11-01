//// [tests/cases/compiler/es6ImportNameSpaceImportDts.ts] ////

//// [server.ts]
export class c { };  

//// [client.ts]
import * as nameSpaceBinding from "./server";
export var x = new nameSpaceBinding.c();
import * as nameSpaceBinding2 from "./server"; // unreferenced

//// [server.js]
"use strict";
exports.__esModule = true;
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
exports.c = c;
;
//// [client.js]
"use strict";
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
exports.__esModule = true;
var nameSpaceBinding = __importStar(require("./server"));
exports.x = new nameSpaceBinding.c();


//// [server.d.ts]
export declare class c {
}
//// [client.d.ts]
import * as nameSpaceBinding from "./server";
export declare var x: nameSpaceBinding.c;

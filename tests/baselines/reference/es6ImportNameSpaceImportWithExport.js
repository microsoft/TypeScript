//// [tests/cases/compiler/es6ImportNameSpaceImportWithExport.ts] ////

//// [server.ts]
export var a = 10;

//// [client.ts]
export import * as nameSpaceBinding from "server";
export var x = nameSpaceBinding.a;
export import * as nameSpaceBinding2 from "server"; // Not referenced imports


//// [server.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.a = 10;
});
//// [client.js]
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
define(["require", "exports", "server"], function (require, exports, nameSpaceBinding) {
    "use strict";
    exports.__esModule = true;
    nameSpaceBinding = __importStar(nameSpaceBinding);
    exports.x = nameSpaceBinding.a;
});


//// [server.d.ts]
export declare var a: number;
//// [client.d.ts]
export declare var x: number;

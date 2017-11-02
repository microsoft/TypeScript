//// [tests/cases/compiler/es6ImportNameSpaceImportAmd.ts] ////

//// [es6ImportNameSpaceImportAmd_0.ts]
export var a = 10;

//// [es6ImportNameSpaceImportAmd_1.ts]
import * as nameSpaceBinding from "es6ImportNameSpaceImportAmd_0";
var x = nameSpaceBinding.a;
import * as nameSpaceBinding2 from "es6ImportNameSpaceImportAmd_0"; // elide this


//// [es6ImportNameSpaceImportAmd_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.a = 10;
});
//// [es6ImportNameSpaceImportAmd_1.js]
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
define(["require", "exports", "es6ImportNameSpaceImportAmd_0"], function (require, exports, nameSpaceBinding) {
    "use strict";
    exports.__esModule = true;
    nameSpaceBinding = __importStar(nameSpaceBinding);
    var x = nameSpaceBinding.a;
});


//// [es6ImportNameSpaceImportAmd_0.d.ts]
export declare var a: number;
//// [es6ImportNameSpaceImportAmd_1.d.ts]

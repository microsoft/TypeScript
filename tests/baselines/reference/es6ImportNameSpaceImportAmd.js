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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
});
//// [es6ImportNameSpaceImportAmd_1.js]
define(["require", "exports", "es6ImportNameSpaceImportAmd_0"], function (require, exports, nameSpaceBinding) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var x = nameSpaceBinding.a;
});


//// [es6ImportNameSpaceImportAmd_0.d.ts]
export declare var a: number;
//// [es6ImportNameSpaceImportAmd_1.d.ts]
export {};

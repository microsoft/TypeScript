//// [tests/cases/compiler/pathMappingBasedModuleResolution6_classic.ts] ////

//// [file1.ts]
import {x} from "./project/file3";
declare function use(x: string);
use(x.toExponential());

//// [file2.d.ts]
export let x: number;

//// [file3.ts]
export {x} from "../file2";

//// [file3.js]
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
define(["require", "exports", "../file2"], function (require, exports, file2_1) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    __createBinding(exports, file2_1, "x");
});
//// [file1.js]
define(["require", "exports", "./project/file3"], function (require, exports, file3_1) {
    "use strict";
    exports.__esModule = true;
    use(file3_1.x.toExponential());
});

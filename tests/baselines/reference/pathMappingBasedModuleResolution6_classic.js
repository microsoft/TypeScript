//// [tests/cases/compiler/pathMappingBasedModuleResolution6_classic.ts] ////

//// [file3.ts]
export {x} from "../file2";
//// [file1.ts]
import {x} from "./project/file3";
declare function use(x: string);
use(x.toExponential());

//// [file2.d.ts]
export let x: number;


//// [file3.js]
define(["require", "exports", "../file2"], function (require, exports, file2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    Object.defineProperty(exports, "x", { enumerable: true, get: function () { return file2_1.x; } });
});
//// [file1.js]
define(["require", "exports", "./project/file3"], function (require, exports, file3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    use(file3_1.x.toExponential());
});

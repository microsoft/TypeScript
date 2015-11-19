//// [tests/cases/compiler/pathMappingBasedModuleResolution10.ts] ////

//// [file1.ts]
import {x} from "./file2" // should be resolved to 'generated/folder1/file2.ts' 

export var z = x.toExponential();

//// [file2.ts]
export {x} from "folder1/file3" // should be resolved to 'folder1/file3.ts' 

//// [file3.ts]
export var x = 1;

//// [file3.ts]
import {z as y} from "../folder1/file1" // should be resolved to 'folder1/file1.ts'
let z = y.toLowerCase();


//// [file3.js]
define(["require", "exports"], function (require, exports) {
    exports.x = 1;
});
//// [file2.js]
define(["require", "exports", "folder1/file3"], function (require, exports, file3_1) {
    exports.x = file3_1.x; // should be resolved to 'folder1/file3.ts' 
});
//// [file1.js]
define(["require", "exports", "./file2"], function (require, exports, file2_1) {
    exports.z = file2_1.x.toExponential();
});
//// [file3.js]
define(["require", "exports", "../folder1/file1"], function (require, exports, file1_1) {
    var z = file1_1.z.toLowerCase();
});

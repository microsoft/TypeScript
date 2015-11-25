//// [tests/cases/compiler/pathMappingBasedModuleResolution11.ts] ////

//// [file1.ts]
import {x} from "./file2" // should be resolved to 'generated/folder1/file2/file.ts' 

export var z = x.toExponential();

//// [file.ts]
export {x} from "folder1/file3" // should be resolved to 'folder1/file3.ts' 

//// [file3.ts]
export var x = 1;

//// [file3.ts]
import {z as y} from "../folder1/file1" // should be resolved to 'folder1/file1.ts'
let z = y.toLowerCase();


//// [file3.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.x = 1;
});
//// [file.js]
define(["require", "exports", "folder1/file3"], function (require, exports, file3_1) {
    "use strict";
    exports.x = file3_1.x; // should be resolved to 'folder1/file3.ts' 
});
//// [file1.js]
define(["require", "exports", "./file2"], function (require, exports, file2_1) {
    "use strict";
    exports.z = file2_1.x.toExponential();
});
//// [file3.js]
define(["require", "exports", "../folder1/file1"], function (require, exports, file1_1) {
    "use strict";
    var z = file1_1.z.toLowerCase();
});

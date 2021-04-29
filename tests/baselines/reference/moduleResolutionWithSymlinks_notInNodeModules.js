//// [tests/cases/compiler/moduleResolutionWithSymlinks_notInNodeModules.ts] ////

//// [abc.ts]
// When symlinked files are not in node_modules, realpath is not used.
// A symlink file acts like the real thing. So, 2 symlinks act like 2 different files.
// See GH#10364. 

export const x = 0;

//// [app.ts]
import { x } from "./shared/abc";
import { x as x2 } from "./shared2/abc";
x + x2;


//// [/src/bin/shared/abc.js]
"use strict";
// When symlinked files are not in node_modules, realpath is not used.
// A symlink file acts like the real thing. So, 2 symlinks act like 2 different files.
// See GH#10364. 
exports.__esModule = true;
exports.x = void 0;
exports.x = 0;
//// [/src/bin/shared2/abc.js]
"use strict";
// When symlinked files are not in node_modules, realpath is not used.
// A symlink file acts like the real thing. So, 2 symlinks act like 2 different files.
// See GH#10364. 
exports.__esModule = true;
exports.x = void 0;
exports.x = 0;
//// [/src/bin/app.js]
"use strict";
exports.__esModule = true;
var abc_1 = require("./shared/abc");
var abc_2 = require("./shared2/abc");
abc_1.x + abc_2.x;

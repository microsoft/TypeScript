Input::
//// [/a/b/f1.ts]
export * from "./f2"

//// [/a/b/f2.ts]
export let x = 1

//// [/a/c/f3.ts]
export let y = 1;

//// [/a/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }


/a/lib/tsc.js -w /a/b/f1.ts --explainFiles
Output::
>> Screen clear
[[90m12:00:19 AM[0m] Starting compilation in watch mode...

a/lib/lib.d.ts
  Default library for target 'es3'
a/b/f2.ts
  Imported via "./f2" from file 'a/b/f1.ts'
a/b/f1.ts
  Root file specified for compilation
[[90m12:00:24 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/f1.ts"]
Program options: {"watch":true,"explainFiles":true}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/f2.ts
/a/b/f1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/f2.ts
/a/b/f1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/f2.ts (used version)
/a/b/f1.ts (used version)

WatchedFiles::
/a/b/f1.ts:
  {"fileName":"/a/b/f1.ts","pollingInterval":250}
/a/b/f2.ts:
  {"fileName":"/a/b/f2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/a/b/f2.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 1;


//// [/a/b/f1.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./f2"), exports);



Change:: Modify f2 to include f3

Input::
//// [/a/b/f2.ts]
export * from "../c/f3"


Output::
>> Screen clear
[[90m12:00:27 AM[0m] File change detected. Starting incremental compilation...

a/lib/lib.d.ts
  Default library for target 'es3'
a/c/f3.ts
  Imported via "../c/f3" from file 'a/b/f2.ts'
a/b/f2.ts
  Imported via "./f2" from file 'a/b/f1.ts'
a/b/f1.ts
  Root file specified for compilation
[[90m12:00:36 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/f1.ts"]
Program options: {"watch":true,"explainFiles":true}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/a/c/f3.ts
/a/b/f2.ts
/a/b/f1.ts

Semantic diagnostics in builder refreshed for::
/a/c/f3.ts
/a/b/f2.ts
/a/b/f1.ts

Shape signatures in builder refreshed for::
/a/c/f3.ts (computed .d.ts)
/a/b/f2.ts (computed .d.ts)
/a/b/f1.ts (computed .d.ts)

WatchedFiles::
/a/b/f1.ts:
  {"fileName":"/a/b/f1.ts","pollingInterval":250}
/a/b/f2.ts:
  {"fileName":"/a/b/f2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/a/c/f3.ts:
  {"fileName":"/a/c/f3.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/a/b/f2.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("../c/f3"), exports);


//// [/a/b/f1.js] file written with same contents
//// [/a/c/f3.js]
"use strict";
exports.__esModule = true;
exports.y = void 0;
exports.y = 1;



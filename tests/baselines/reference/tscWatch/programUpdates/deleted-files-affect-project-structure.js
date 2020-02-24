/a/lib/tsc.js -w /a/b/f1.ts
//// [/a/b/f1.ts]
export * from "./f2"

//// [/a/b/f2.ts]
export * from "../c/f3"

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

//// [/a/c/f3.js]
"use strict";
exports.__esModule = true;
exports.y = 1;


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
    for (var p in m) if (!exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
exports.__esModule = true;
__exportStar(require("../c/f3"), exports);


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
    for (var p in m) if (!exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
exports.__esModule = true;
__exportStar(require("./f2"), exports);



Output::
>> Screen clear
12:00:19 AM - Starting compilation in watch mode...



12:00:26 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/f1.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/a/c/f3.ts
/a/b/f2.ts
/a/b/f1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/c/f3.ts
/a/b/f2.ts
/a/b/f1.ts

WatchedFiles::
/a/b/f1.ts:
  {"fileName":"/a/b/f1.ts","pollingInterval":250}
/a/b/f2.ts:
  {"fileName":"/a/b/f2.ts","pollingInterval":250}
/a/c/f3.ts:
  {"fileName":"/a/c/f3.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

Change:: Delete f2

//// [/a/b/f1.js] file written with same contents
//// [/a/b/f2.ts] deleted

Output::
>> Screen clear
12:00:28 AM - File change detected. Starting incremental compilation...


a/b/f1.ts(1,15): error TS2307: Cannot find module './f2'.


12:00:32 AM - Found 1 error. Watching for file changes.


Program root files: ["/a/b/f1.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/a/b/f1.ts

Semantic diagnostics in builder refreshed for::
/a/b/f1.ts

WatchedFiles::
/a/b/f1.ts:
  {"fileName":"/a/b/f1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/a/b/f2.ts:
  {"fileName":"/a/b/f2.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

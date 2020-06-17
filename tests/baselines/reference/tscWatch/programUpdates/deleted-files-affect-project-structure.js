Input::
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


/a/lib/tsc.js -w /a/b/f1.ts --noImplicitAny
Output::
>> Screen clear
[[90m12:00:19 AM[0m] Starting compilation in watch mode...


[[90m12:00:26 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/f1.ts"]
Program options: {"watch":true,"noImplicitAny":true}
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

//// [/a/c/f3.js]
"use strict";
exports.__esModule = true;
exports.y = void 0;
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
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
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
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./f2"), exports);



Change:: Delete f2

Input::
//// [/a/b/f2.ts] deleted

Output::
>> Screen clear
[[90m12:00:28 AM[0m] File change detected. Starting incremental compilation...


[96ma/b/f1.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module './f2'. '/a/b/f2.js' implicitly has an 'any' type.

[7m1[0m export * from "./f2"
[7m [0m [91m              ~~~~~~[0m


[[90m12:00:32 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a/b/f1.ts"]
Program options: {"watch":true,"noImplicitAny":true}
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

FsWatches::

FsWatchesRecursive::
/a:
  {"directoryName":"/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/b/f1.js] file written with same contents

Input::
//// [/a/b/file1.ts]
import * as T from "./moduleFile"; T.bar();

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


/a/lib/tsc.js -w /a/b/file1.ts
Output::
>> Screen clear
[[90m12:00:13 AM[0m] Starting compilation in watch mode...


[96ma/b/file1.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS2307: [0mCannot find module './moduleFile' or its corresponding type declarations.

[7m1[0m import * as T from "./moduleFile"; T.bar();
[7m [0m [91m                   ~~~~~~~~~~~~~~[0m


[[90m12:00:16 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a/b/file1.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/file1.ts

WatchedFiles::
/a/b/file1.ts:
  {"fileName":"/a/b/file1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a:
  {"directoryName":"/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/b/file1.js]
"use strict";
exports.__esModule = true;
var T = require("./moduleFile");
T.bar();



Change:: Create module file

Input::
//// [/a/b/moduleFile.ts]
export function bar() { }


Output::
>> Screen clear
[[90m12:00:19 AM[0m] File change detected. Starting incremental compilation...


[[90m12:00:25 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/file1.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/a/b/moduleFile.ts
/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/a/b/moduleFile.ts
/a/b/file1.ts

WatchedFiles::
/a/b/file1.ts:
  {"fileName":"/a/b/file1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/a/b/modulefile.ts:
  {"fileName":"/a/b/moduleFile.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/a/b/file1.js] file written with same contents
//// [/a/b/moduleFile.js]
"use strict";
exports.__esModule = true;
exports.bar = void 0;
function bar() { }
exports.bar = bar;



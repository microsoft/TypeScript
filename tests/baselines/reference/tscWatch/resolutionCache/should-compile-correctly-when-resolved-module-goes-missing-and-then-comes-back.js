Input::
//// [/a/foo.ts]
import {x} from "bar"

//// [/a/bar.d.ts]
export const y = 1;export const x = 10;

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


fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

/a/lib/tsc.js --w /a/foo.ts
Output::
>> Screen clear
[[90m12:00:13 AM[0m] Starting compilation in watch mode...

[[90m12:00:16 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/foo.ts"]
Program options: {"module":2}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/bar.d.ts
/a/foo.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/bar.d.ts
/a/foo.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/bar.d.ts (used version)
/a/foo.ts (used version)

WatchedFiles::
/a/foo.ts:
  {"fileName":"/a/foo.ts","pollingInterval":250}
/a/bar.d.ts:
  {"fileName":"/a/bar.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a:
  {"directoryName":"/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/foo.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});



fileExists:: {
 "/a/bar.ts": 1,
 "/a/bar.tsx": 1,
 "/a/bar.d.ts": 1
} 

directoryExists:: {
 "/a": 1,
 "/node_modules/@types": 1
} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Change:: Delete imported file

Input::
//// [/a/bar.d.ts] deleted

fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Output::
>> Screen clear
[[90m12:00:18 AM[0m] File change detected. Starting incremental compilation...

[96ma/foo.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS2792: [0mCannot find module 'bar'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m1[0m import {x} from "bar"
[7m [0m [91m                ~~~~~[0m

[[90m12:00:22 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a/foo.ts"]
Program options: {"module":2}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/foo.ts

Semantic diagnostics in builder refreshed for::
/a/foo.ts

Shape signatures in builder refreshed for::
/a/foo.ts (computed .d.ts)

WatchedFiles::
/a/foo.ts:
  {"fileName":"/a/foo.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::
/:
  {"directoryName":"","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/a:
  {"directoryName":"/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/node_modules:
  {"directoryName":"/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/foo.js] file written with same contents

fileExists:: {
 "/a/bar.ts": 1,
 "/a/bar.tsx": 1,
 "/bar.ts": 1,
 "/bar.tsx": 1,
 "/bar.d.ts": 1,
 "/a/bar.js": 1,
 "/a/bar.jsx": 1,
 "/bar.js": 1,
 "/bar.jsx": 1
} 

directoryExists:: {
 "/a": 2,
 "/": 2,
 "/a/node_modules": 1,
 "/node_modules": 1,
 "/node_modules/@types": 1
} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Change:: Create imported file

Input::
//// [/a/bar.d.ts]
export const y = 1;export const x = 10;


fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Output::
>> Screen clear
[[90m12:00:25 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:29 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/foo.ts"]
Program options: {"module":2}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/a/bar.d.ts
/a/foo.ts

Semantic diagnostics in builder refreshed for::
/a/bar.d.ts
/a/foo.ts

Shape signatures in builder refreshed for::
/a/bar.d.ts (used version)
/a/foo.ts (computed .d.ts)

WatchedFiles::
/a/foo.ts:
  {"fileName":"/a/foo.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/a/bar.d.ts:
  {"fileName":"/a/bar.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a:
  {"directoryName":"/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/foo.js] file written with same contents

fileExists:: {
 "/a/bar.ts": 1,
 "/a/bar.tsx": 1,
 "/a/bar.d.ts": 1
} 

directoryExists:: {
 "/a": 1,
 "/node_modules/@types": 1
} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

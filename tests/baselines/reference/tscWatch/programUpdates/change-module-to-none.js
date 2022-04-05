Input::
//// [/a/b/f1.ts]
export {}
declare global {}

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

//// [/a/b/tsconfig.json]
{}


/a/lib/tsc.js -w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...

[[90m12:00:18 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/f1.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/f1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/f1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/f1.ts (used version)

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/f1.ts:
  {"fileName":"/a/b/f1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/b/f1.js]
"use strict";
exports.__esModule = true;



Change:: change `module` to 'none'

Input::
//// [/a/b/tsconfig.json]
{"compilerOptions":{"module":"none"}}


Output::
>> Screen clear
[[90m12:00:22 AM[0m] File change detected. Starting incremental compilation...

[96ma/b/f1.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS1148: [0mCannot use imports, exports, or module augmentations when '--module' is 'none'.

[7m1[0m export {}
[7m [0m [91m~~~~~~~~~[0m

[[90m12:00:26 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a/b/f1.ts"]
Program options: {"module":0,"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/f1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/f1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/f1.ts (used version)

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/f1.ts:
  {"fileName":"/a/b/f1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/b/f1.js] file written with same contents

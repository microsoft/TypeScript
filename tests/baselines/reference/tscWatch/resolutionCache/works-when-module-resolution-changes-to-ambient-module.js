Input::
//// [/a/b/foo.ts]
import * as fs from "fs";

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


/a/lib/tsc.js -w /a/b/foo.ts
Output::
>> Screen clear
[[90m12:00:13 AM[0m] Starting compilation in watch mode...


[96mfoo.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS2307: [0mCannot find module 'fs' or its corresponding type declarations.

[7m1[0m import * as fs from "fs";
[7m [0m [91m                    ~~~~[0m


[[90m12:00:16 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a/b/foo.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/a/b/foo.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/foo.ts

WatchedFiles::
/a/b/foo.ts:
  {"fileName":"/a/b/foo.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules:
  {"directoryName":"/a/b/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/b/foo.js]
"use strict";
exports.__esModule = true;



Change:: npm install node types

Input::
//// [/a/b/node_modules/@types/node/package.json]

{
  "main": ""
}


//// [/a/b/node_modules/@types/node/index.d.ts]

declare module "fs" {
    export interface Stats {
        isFile(): boolean;
    }
}


Output::
>> Screen clear
[[90m12:00:27 AM[0m] File change detected. Starting incremental compilation...


[[90m12:00:31 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/foo.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/a/b/foo.ts
/a/b/node_modules/@types/node/index.d.ts

Semantic diagnostics in builder refreshed for::
/a/b/foo.ts
/a/b/node_modules/@types/node/index.d.ts

WatchedFiles::
/a/b/foo.ts:
  {"fileName":"/a/b/foo.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/a/b/node_modules/@types/node/index.d.ts:
  {"fileName":"/a/b/node_modules/@types/node/index.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/b/foo.js] file written with same contents

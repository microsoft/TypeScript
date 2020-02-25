/a/lib/tsc.js -w /a/b/foo.ts
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

//// [/a/b/foo.js]
"use strict";
exports.__esModule = true;



Output::
>> Screen clear
12:00:13 AM - Starting compilation in watch mode...


foo.ts(1,21): error TS2307: Cannot find module 'fs'.


12:00:16 AM - Found 1 error. Watching for file changes.


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

Change:: npm install node types

//// [/a/b/foo.js] file written with same contents
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
12:00:27 AM - File change detected. Starting incremental compilation...



12:00:31 AM - Found 0 errors. Watching for file changes.


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

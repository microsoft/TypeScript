/a/lib/tsc.js --w /a/b/foo.ts /a/b/bar.d.ts
//// [/a/b/foo.ts]

import * as fs from "fs";
import * as u from "url";


//// [/a/b/bar.d.ts]

declare module "url" {
    export interface Url {
        href?: string;
    }
}


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
12:00:15 AM - Starting compilation in watch mode...


foo.ts(2,21): error TS2307: Cannot find module 'fs'.


12:00:18 AM - Found 1 error. Watching for file changes.


Program root files: ["/a/b/foo.ts","/a/b/bar.d.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/a/b/foo.ts
/a/b/bar.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/foo.ts
/a/b/bar.d.ts

WatchedFiles::
/a/b/foo.ts:
  {"pollingInterval":250}
/a/b/bar.d.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Add fs definition

//// [/a/b/bar.d.ts]

declare module "url" {
    export interface Url {
        href?: string;
    }
}

declare module "fs" {
    export interface Stats {
        isFile(): boolean;
    }
}


//// [/a/b/foo.js] file written with same contents

Output::
>> Screen clear
12:00:21 AM - File change detected. Starting incremental compilation...



12:00:25 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/foo.ts","/a/b/bar.d.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/a/b/foo.ts
/a/b/bar.d.ts

Semantic diagnostics in builder refreshed for::
/a/b/foo.ts
/a/b/bar.d.ts

WatchedFiles::
/a/b/foo.ts:
  {"pollingInterval":250}
/a/b/bar.d.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

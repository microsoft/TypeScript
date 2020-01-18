/a/lib/tsc.js -w
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

//// [/a.ts]

                        let v: keyof any;
                        v.charAt(0);
                        export const e = v;
                    

//// [/tsconfig.json]
{"compilerOptions":{"declaration":true}}

//// [/a.js]
"use strict";
exports.__esModule = true;
var v;
v.charAt(0);
exports.e = v;


//// [/a.d.ts]
export declare const e: string | number | symbol;



Output::
>> Screen clear
12:00:13 AM - Starting compilation in watch mode...


a.ts(3,27): error TS2339: Property 'charAt' does not exist on type 'string | number | symbol'.
  Property 'charAt' does not exist on type 'number'.


12:00:18 AM - Found 1 error. Watching for file changes.


Program root files: ["/a.ts","/a/lib/lib.d.ts"]
Program options: {"declaration":true,"watch":true,"configFilePath":"/tsconfig.json"}
Program files::
/a.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::
/a.ts
/a/lib/lib.d.ts

WatchedFiles::
/tsconfig.json:
  {"pollingInterval":250}
/a.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Enable keyofStringsOnly

//// [/tsconfig.json]
{"compilerOptions":{"declaration":true,"keyofStringsOnly":true}}

//// [/a.js] file written with same contents
//// [/a.d.ts]
export declare const e: string;



Output::
>> Screen clear
12:00:21 AM - File change detected. Starting incremental compilation...



12:00:28 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a.ts","/a/lib/lib.d.ts"]
Program options: {"declaration":true,"keyofStringsOnly":true,"watch":true,"configFilePath":"/tsconfig.json"}
Program files::
/a.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::
/a.ts
/a/lib/lib.d.ts

WatchedFiles::
/tsconfig.json:
  {"pollingInterval":250}
/a.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

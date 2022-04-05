Input::
//// [/a/b/file.ts]
function one() {}
function two() {
    return function three() {
        one();
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


/a/lib/tsc.js -w /a/b/file.ts --noUnusedLocals
Output::
>> Screen clear
[[90m12:00:13 AM[0m] Starting compilation in watch mode...

[[90m12:00:16 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/file.ts"]
Program options: {"watch":true,"noUnusedLocals":true}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/file.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/file.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/file.ts (used version)

WatchedFiles::
/a/b/file.ts:
  {"fileName":"/a/b/file.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/a/b/file.js]
function one() { }
function two() {
    return function three() {
        one();
    };
}



Change:: Change file to module

Input::
//// [/a/b/file.ts]
function one() {}
export function two() {
    return function three() {
        one();
    }
}


Output::
>> Screen clear
[[90m12:00:20 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:24 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/file.ts"]
Program options: {"watch":true,"noUnusedLocals":true}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/b/file.ts

Semantic diagnostics in builder refreshed for::
/a/b/file.ts

Shape signatures in builder refreshed for::
/a/b/file.ts (computed .d.ts)

WatchedFiles::
/a/b/file.ts:
  {"fileName":"/a/b/file.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/a/b/file.js]
"use strict";
exports.__esModule = true;
exports.two = void 0;
function one() { }
function two() {
    return function three() {
        one();
    };
}
exports.two = two;



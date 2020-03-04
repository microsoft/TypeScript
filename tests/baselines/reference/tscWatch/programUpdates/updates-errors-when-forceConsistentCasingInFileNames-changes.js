/a/lib/tsc.js -w
//// [/a.ts]
export class C {}

//// [/b.ts]
import {C} from './a'; import * as A from './A';

//// [/tsconfig.json]
{"compilerOptions":{}}

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

//// [/a.js]
"use strict";
exports.__esModule = true;
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;


//// [/b.js]
"use strict";
exports.__esModule = true;



Output::
>> Screen clear
12:00:15 AM - Starting compilation in watch mode...



12:00:20 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a.ts","/b.ts","/a/lib/lib.d.ts"]
Program options: {"watch":true,"configFilePath":"/tsconfig.json"}
Program files::
/a.ts
/b.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::
/a.ts
/b.ts
/a/lib/lib.d.ts

WatchedFiles::
/tsconfig.json:
  {"fileName":"/tsconfig.json","pollingInterval":250}
/a.ts:
  {"fileName":"/a.ts","pollingInterval":250}
/b.ts:
  {"fileName":"/b.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/:
  {"directoryName":"","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Enable forceConsistentCasingInFileNames

//// [/tsconfig.json]
{"compilerOptions":{"forceConsistentCasingInFileNames":true}}


Output::
>> Screen clear
12:00:24 AM - File change detected. Starting incremental compilation...


b.ts(1,43): error TS1149: File name '/A.ts' differs from already included file name '/a.ts' only in casing.


12:00:25 AM - Found 1 error. Watching for file changes.


Program root files: ["/a.ts","/b.ts","/a/lib/lib.d.ts"]
Program options: {"forceConsistentCasingInFileNames":true,"watch":true,"configFilePath":"/tsconfig.json"}
Program files::
/a.ts
/b.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::

WatchedFiles::
/tsconfig.json:
  {"fileName":"/tsconfig.json","pollingInterval":250}
/a.ts:
  {"fileName":"/a.ts","pollingInterval":250}
/b.ts:
  {"fileName":"/b.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/:
  {"directoryName":"","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

currentDirectory:: /home/src/projects/a/b useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/a/b/file1.ts]
/// <reference path="./file2.ts" />
export var t1 = 10;

//// [/home/src/projects/a/b/file2.ts]
/// <reference path="./file1.ts" />
export var t2 = 10;

//// [/home/src/projects/a/b/tsconfig.json]
{}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/a/b/file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t2 = void 0;
/// <reference path="./file1.ts" />
exports.t2 = 10;


//// [/home/src/projects/a/b/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t1 = void 0;
/// <reference path="./file2.ts" />
exports.t1 = 10;



PolledWatches::
/home/src/projects/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/a/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/b/file1.ts: *new*
  {}
/home/src/projects/a/b/file2.ts: *new*
  {}
/home/src/projects/a/b/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/a/b: *new*
  {}

Program root files: [
  "/home/src/projects/a/b/file1.ts",
  "/home/src/projects/a/b/file2.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/home/src/projects/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/file2.ts
/home/src/projects/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/file2.ts
/home/src/projects/a/b/file1.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/a/b/file2.ts (used version)
/home/src/projects/a/b/file1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: change file1

Input::
//// [/home/src/projects/a/b/file1.ts]
/// <reference path="./file2.ts" />
export var t1 = 10;export var t3 = 10;


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/a/b/file2.js] file written with same contents
//// [/home/src/projects/a/b/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t3 = exports.t1 = void 0;
/// <reference path="./file2.ts" />
exports.t1 = 10;
exports.t3 = 10;




Program root files: [
  "/home/src/projects/a/b/file1.ts",
  "/home/src/projects/a/b/file2.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/home/src/projects/a/b/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/file2.ts
/home/src/projects/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/a/b/file2.ts
/home/src/projects/a/b/file1.ts

Shape signatures in builder refreshed for::
/home/src/projects/a/b/file1.ts (computed .d.ts)
/home/src/projects/a/b/file2.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

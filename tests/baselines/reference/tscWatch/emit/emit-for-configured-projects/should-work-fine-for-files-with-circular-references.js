currentDirectory:: / useCaseSensitiveFileNames: false
Input::
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

//// [/a/b/file1.ts]
/// <reference path="./file2.ts" />
export var t1 = 10;

//// [/a/b/file2.ts]
/// <reference path="./file1.ts" />
export var t2 = 10;

//// [/a/b/tsconfig.json]
{}


/a/lib/tsc.js --w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:17 AM[0m] Starting compilation in watch mode...

[[90m12:00:22 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t2 = void 0;
/// <reference path="./file1.ts" />
exports.t2 = 10;


//// [/a/b/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t1 = void 0;
/// <reference path="./file2.ts" />
exports.t1 = 10;



FsWatches::
/a/b/file1.ts: *new*
  {}
/a/b/file2.ts: *new*
  {}
/a/b/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Program root files: [
  "/a/b/file1.ts",
  "/a/b/file2.ts"
]
Program options: {
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/file2.ts
/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/file2.ts
/a/b/file1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/file2.ts (used version)
/a/b/file1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: change file1

Input::
//// [/a/b/file1.ts]
/// <reference path="./file2.ts" />
export var t1 = 10;export var t3 = 10;


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:25 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:32 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/file2.js] file written with same contents
//// [/a/b/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t3 = exports.t1 = void 0;
/// <reference path="./file2.ts" />
exports.t1 = 10;
exports.t3 = 10;




Program root files: [
  "/a/b/file1.ts",
  "/a/b/file2.ts"
]
Program options: {
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/b/file2.ts
/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/a/b/file2.ts
/a/b/file1.ts

Shape signatures in builder refreshed for::
/a/b/file1.ts (computed .d.ts)
/a/b/file2.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

currentDirectory:: /user/username/projects/myproject/Project useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/Project/file1.ts]
export const x = 10;

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

//// [/user/username/projects/myproject/Project/tsconfig.json]
{
  "include": [
    ".",
    "./**/*.json"
  ]
}


/a/lib/tsc.js -w -p .
Output::
>> Screen clear
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

[[90m12:00:26 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/Project/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;



PolledWatches::
/user/username/projects/myproject/Project/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/Project/file1.ts: *new*
  {}
/user/username/projects/myproject/Project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/Project: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/Project/file1.ts"
]
Program options: {
  "watch": true,
  "project": "/user/username/projects/myproject/Project",
  "configFilePath": "/user/username/projects/myproject/Project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/Project/file1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/Project/file1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/project/file1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Write file2

Input::
//// [/user/username/projects/myproject/Project/file2.ts]
export const y = 10;


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:29 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:32 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/Project/file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 10;



PolledWatches::
/user/username/projects/myproject/Project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/Project/file1.ts:
  {}
/user/username/projects/myproject/Project/file2.ts: *new*
  {}
/user/username/projects/myproject/Project/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/Project:
  {}


Program root files: [
  "/user/username/projects/myproject/Project/file1.ts",
  "/user/username/projects/myproject/Project/file2.ts"
]
Program options: {
  "watch": true,
  "project": "/user/username/projects/myproject/Project",
  "configFilePath": "/user/username/projects/myproject/Project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/Project/file1.ts
/user/username/projects/myproject/Project/file2.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/Project/file2.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/project/file2.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

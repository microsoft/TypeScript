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

//// [/user/username/projects/myproject/src/file1.ts]
import { x } from "file2";

//// [/user/username/projects/myproject/node_modules/file2/index.d.ts]
export const x = 10;

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true
  }
}


/a/lib/tsc.js --w -p /user/username/projects/myproject/tsconfig.json
Output::
>> Screen clear
[[90m12:00:29 AM[0m] Starting compilation in watch mode...

[[90m12:00:37 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/dist/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/dist/file1.d.ts]
export {};



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/dist: *new*
  {}
/user/username/projects/myproject/node_modules: *new*
  {}
/user/username/projects/myproject/node_modules/file2: *new*
  {}
/user/username/projects/myproject/node_modules/file2/index.d.ts: *new*
  {}
/user/username/projects/myproject/src: *new*
  {}
/user/username/projects/myproject/src/file1.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/src/file1.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/dist",
  "declaration": true,
  "watch": true,
  "project": "/user/username/projects/myproject/tsconfig.json",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/node_modules/file2/index.d.ts
/user/username/projects/myproject/src/file1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/node_modules/file2/index.d.ts
/user/username/projects/myproject/src/file1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/node_modules/file2/index.d.ts (used version)
/user/username/projects/myproject/src/file1.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined

Change:: Add new file, should schedule and run timeout to update directory watcher

Input::
//// [/user/username/projects/myproject/src/file3.ts]
export const y = 10;


Timeout callback:: count: 1
1: timerToUpdateChildWatches *new*

Before running Timeout callback:: count: 1
1: timerToUpdateChildWatches

After running Timeout callback:: count: 2

Timeout callback:: count: 2
2: timerToInvalidateFailedLookupResolutions *new*
3: timerToUpdateProgram *new*


exitCode:: ExitStatus.undefined

Change:: Actual program update to include new file

Input::

Before running Timeout callback:: count: 2
2: timerToInvalidateFailedLookupResolutions
3: timerToUpdateProgram

After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90m12:00:41 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:46 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/dist/file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 10;


//// [/user/username/projects/myproject/dist/file3.d.ts]
export declare const y = 10;



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/dist:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/node_modules/file2:
  {}
/user/username/projects/myproject/node_modules/file2/index.d.ts:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/user/username/projects/myproject/src/file3.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

Timeout callback:: count: 1
5: timerToUpdateChildWatches *new*


Program root files: [
  "/user/username/projects/myproject/src/file1.ts",
  "/user/username/projects/myproject/src/file3.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/dist",
  "declaration": true,
  "watch": true,
  "project": "/user/username/projects/myproject/tsconfig.json",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/node_modules/file2/index.d.ts
/user/username/projects/myproject/src/file1.ts
/user/username/projects/myproject/src/file3.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/file3.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/src/file3.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: After program emit with new file, should schedule and run timeout to update directory watcher

Input::

Before running Timeout callback:: count: 1
5: timerToUpdateChildWatches

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined

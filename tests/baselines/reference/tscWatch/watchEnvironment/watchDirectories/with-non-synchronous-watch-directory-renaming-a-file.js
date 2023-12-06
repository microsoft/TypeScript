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
import { x } from "./file2";

//// [/user/username/projects/myproject/src/file2.ts]
export const x = 10;

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "dist"
  }
}


/a/lib/tsc.js --w -p /user/username/projects/myproject/tsconfig.json
Output::
>> Screen clear
[[90m12:00:25 AM[0m] Starting compilation in watch mode...

[[90m12:00:33 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/dist/file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/user/username/projects/myproject/dist/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



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
/user/username/projects/myproject/src: *new*
  {}
/user/username/projects/myproject/src/file1.ts: *new*
  {}
/user/username/projects/myproject/src/file2.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/src/file1.ts",
  "/user/username/projects/myproject/src/file2.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/dist",
  "watch": true,
  "project": "/user/username/projects/myproject/tsconfig.json",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/file2.ts
/user/username/projects/myproject/src/file1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/file2.ts
/user/username/projects/myproject/src/file1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/src/file2.ts (used version)
/user/username/projects/myproject/src/file1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined

Change:: rename the file

Input::
//// [/user/username/projects/myproject/src/renamed.ts]
export const x = 10;

//// [/user/username/projects/myproject/src/file2.ts] deleted

Timeout callback:: count: 2
1: timerToUpdateProgram *new*
3: timerToUpdateChildWatches *new*

Before running Timeout callback:: count: 2
1: timerToUpdateProgram
3: timerToUpdateChildWatches

Invoking Timeout callback:: timeoutId:: 1:: timerToUpdateProgram
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90m12:00:37 AM[0m] File change detected. Starting incremental compilation...

[91merror[0m[90m TS6053: [0mFile '/user/username/projects/myproject/src/file2.ts' not found.
  The file is in the program because:
    Matched by default include pattern '**/*'

[[90m12:00:41 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/dist/file1.js] file written with same contents

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/src/file2.ts: *new*
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
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/src/file2.ts:
  {}


Program root files: [
  "/user/username/projects/myproject/src/file1.ts",
  "/user/username/projects/myproject/src/file2.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/dist",
  "watch": true,
  "project": "/user/username/projects/myproject/tsconfig.json",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/file1.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/file1.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/src/file1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Pending directory watchers and program update

Input::

Before running Timeout callback:: count: 1
3: timerToUpdateChildWatches

After running Timeout callback:: count: 2

Timeout callback:: count: 2
5: timerToUpdateProgram *new*
7: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
5: timerToUpdateProgram
7: timerToInvalidateFailedLookupResolutions

After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90m12:00:42 AM[0m] File change detected. Starting incremental compilation...

[96muser/username/projects/myproject/src/file1.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2307: [0mCannot find module './file2' or its corresponding type declarations.

[7m1[0m import { x } from "./file2";
[7m [0m [91m                  ~~~~~~~~~[0m

[[90m12:00:45 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/dist/renamed.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/src/file2.ts:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/dist:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/user/username/projects/myproject/src/renamed.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

Timeout callback:: count: 1
7: timerToInvalidateFailedLookupResolutions *deleted*
8: timerToUpdateChildWatches *new*

Before running Timeout callback:: count: 1
8: timerToUpdateChildWatches

After running Timeout callback:: count: 0


Program root files: [
  "/user/username/projects/myproject/src/file1.ts",
  "/user/username/projects/myproject/src/renamed.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/dist",
  "watch": true,
  "project": "/user/username/projects/myproject/tsconfig.json",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/file1.ts
/user/username/projects/myproject/src/renamed.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/file1.ts
/user/username/projects/myproject/src/renamed.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/src/renamed.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

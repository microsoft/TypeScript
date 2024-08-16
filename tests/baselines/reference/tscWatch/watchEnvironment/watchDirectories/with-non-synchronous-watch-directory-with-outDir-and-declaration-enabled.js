currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/lib/lib.d.ts] Inode:: 3
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

//// [/user/username/projects/myproject/src/file1.ts] Inode:: 9
import { x } from "file2";

//// [/user/username/projects/myproject/node_modules/file2/index.d.ts] Inode:: 12
export const x = 10;

//// [/user/username/projects/myproject/tsconfig.json] Inode:: 13
{
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true
  }
}


/a/lib/tsc.js --w -p /user/username/projects/myproject/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/dist/file1.js] Inode:: 15
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/dist/file1.d.ts] Inode:: 16
export {};



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/file2/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts: *new*
  {"inode":3}
/user/username/projects/myproject: *new*
  {"inode":7}
/user/username/projects/myproject/dist: *new*
  {"inode":14}
/user/username/projects/myproject/node_modules: *new*
  {"inode":10}
/user/username/projects/myproject/node_modules/file2: *new*
  {"inode":11}
/user/username/projects/myproject/node_modules/file2/index.d.ts: *new*
  {"inode":12}
/user/username/projects/myproject/src: *new*
  {"inode":8}
/user/username/projects/myproject/src/file1.ts: *new*
  {"inode":9}
/user/username/projects/myproject/tsconfig.json: *new*
  {"inode":13}

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
//// [/user/username/projects/myproject/src/file3.ts] Inode:: 17
export const y = 10;


Timeout callback:: count: 1
1: timerToUpdateChildWatches *new*

Before running Timeout callback:: count: 1
1: timerToUpdateChildWatches

Host is moving to new time
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

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/dist/file3.js] Inode:: 18
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 10;


//// [/user/username/projects/myproject/dist/file3.d.ts] Inode:: 19
export declare const y = 10;



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/file2/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/package.json:
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {"inode":3}
/user/username/projects/myproject:
  {"inode":7}
/user/username/projects/myproject/dist:
  {"inode":14}
/user/username/projects/myproject/node_modules:
  {"inode":10}
/user/username/projects/myproject/node_modules/file2:
  {"inode":11}
/user/username/projects/myproject/node_modules/file2/index.d.ts:
  {"inode":12}
/user/username/projects/myproject/src:
  {"inode":8}
/user/username/projects/myproject/src/file1.ts:
  {"inode":9}
/user/username/projects/myproject/src/file3.ts: *new*
  {"inode":17}
/user/username/projects/myproject/tsconfig.json:
  {"inode":13}

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

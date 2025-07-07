currentDirectory:: /users/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/users/username/projects/project/foo.ts]
import * as fs from "fs";

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


/home/src/tslibs/TS/Lib/tsc.js -w /users/username/projects/project/foo.ts
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mfoo.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS2307: [0mCannot find module 'fs' or its corresponding type declarations.

[7m1[0m import * as fs from "fs";
[7m [0m [91m                    ~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/users/username/projects/project/foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



PolledWatches::
/users/username/projects/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/users/username/projects/project/foo.ts: *new*
  {}

Program root files: [
  "/users/username/projects/project/foo.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/foo.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/foo.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/users/username/projects/project/foo.ts (used version)

exitCode:: ExitStatus.undefined

Change:: npm install node types

Input::
//// [/users/username/projects/project/node_modules/@types/node/package.json]

{
  "main": ""
}


//// [/users/username/projects/project/node_modules/@types/node/index.d.ts]

declare module "fs" {
    export interface Stats {
        isFile(): boolean;
    }
}


Output::
sysLog:: /users/username/projects/project/node_modules:: Changing watcher to PresentFileSystemEntryWatcher
sysLog:: /users/username/projects/project/node_modules/@types:: Changing watcher to PresentFileSystemEntryWatcher


PolledWatches::
/users/username/projects/node_modules:
  {"pollingInterval":500}
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/users/username/projects/project/node_modules:
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/projects/project/foo.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project/node_modules: *new*
  {}
/users/username/projects/project/node_modules/@types: *new*
  {}

Timeout callback:: count: 2
14: timerToUpdateProgram *new*
16: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
14: timerToUpdateProgram
16: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/users/username/projects/project/foo.js] file written with same contents

PolledWatches::
/users/username/projects/node_modules:
  {"pollingInterval":500}
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/projects/project/foo.ts:
  {}
/users/username/projects/project/node_modules/@types/node/index.d.ts: *new*
  {}
/users/username/projects/project/node_modules/@types/node/package.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project/node_modules:
  {}
/users/username/projects/project/node_modules/@types:
  {}

Timeout callback:: count: 0
16: timerToInvalidateFailedLookupResolutions *deleted*


Program root files: [
  "/users/username/projects/project/foo.ts"
]
Program options: {
  "watch": true
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/foo.ts
/users/username/projects/project/node_modules/@types/node/index.d.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/foo.ts
/users/username/projects/project/node_modules/@types/node/index.d.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/foo.ts (computed .d.ts)
/users/username/projects/project/node_modules/@types/node/index.d.ts (used version)

exitCode:: ExitStatus.undefined

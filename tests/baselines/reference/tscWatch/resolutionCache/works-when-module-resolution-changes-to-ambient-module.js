currentDirectory:: /users/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/users/username/projects/project/foo.ts]
import * as fs from "fs";

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js -w /users/username/projects/project/foo.ts -types node
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[91merror[0m[90m TS2688: [0mCannot find type definition file for 'node'.
  The file is in the program because:
    Entry point of type library 'node' specified in compilerOptions

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/users/username/projects/project/foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



PolledWatches::
/users/username/projects/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/users/username/projects: *new*
  {}
/users/username/projects/project: *new*
  {}
/users/username/projects/project/foo.ts: *new*
  {}

Program root files: [
  "/users/username/projects/project/foo.ts"
]
Program options: {
  "watch": true,
  "types": [
    "node"
  ]
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/foo.ts

No cached semantic diagnostics in the builder::

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


PolledWatches::
/users/username/projects/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/users/username/projects/project/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/projects:
  {}
/users/username/projects/project:
  {}
/users/username/projects/project/foo.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project/node_modules: *new*
  {}

Timeout callback:: count: 1
7: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
7: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
8: timerToUpdateProgram *new*


exitCode:: ExitStatus.undefined

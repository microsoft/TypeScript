currentDirectory:: /user/username/workspace/solution/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/a.ts]
import {} from './b.css'

//// [/user/username/workspace/solution/projects/project/b.d.css.ts]
declare const style: string;

//// [/user/username/workspace/solution/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "allowArbitraryExtensions": true
  },
  "files": [
    "a.ts"
  ]
}

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


/home/src/tslibs/TS/Lib/tsc.js -w -p /user/username/workspace/solution/projects/project/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96ma.ts[0m:[93m1[0m:[93m16[0m - [91merror[0m[90m TS2306: [0mFile '/user/username/workspace/solution/projects/project/b.d.css.ts' is not a module.

[7m1[0m import {} from './b.css'
[7m [0m [91m               ~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



PolledWatches::
/user/username/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/workspace/solution/projects/project/a.ts: *new*
  {}
/user/username/workspace/solution/projects/project/b.d.css.ts: *new*
  {}
/user/username/workspace/solution/projects/project/tsconfig.json: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/project/a.ts"
]
Program options: {
  "allowArbitraryExtensions": true,
  "watch": true,
  "project": "/user/username/workspace/solution/projects/project/tsconfig.json",
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/b.d.css.ts
/user/username/workspace/solution/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/b.d.css.ts
/user/username/workspace/solution/projects/project/a.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/workspace/solution/projects/project/b.d.css.ts (used version)
/user/username/workspace/solution/projects/project/a.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Disable  allowArbitraryExtensions

Input::
//// [/user/username/workspace/solution/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "allowArbitraryExtensions": false
  },
  "files": [
    "a.ts"
  ]
}


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m1[0m:[93m16[0m - [91merror[0m[90m TS6263: [0mModule './b.css' was resolved to '/user/username/workspace/solution/projects/project/b.d.css.ts', but '--allowArbitraryExtensions' is not set.

[7m1[0m import {} from './b.css'
[7m [0m [91m               ~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/a.js] file written with same contents

PolledWatches::
/user/username/workspace/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/workspace/solution/projects/project/a.ts:
  {}
/user/username/workspace/solution/projects/project/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/workspace/solution/projects/project/b.d.css.ts:
  {}


Program root files: [
  "/user/username/workspace/solution/projects/project/a.ts"
]
Program options: {
  "allowArbitraryExtensions": false,
  "watch": true,
  "project": "/user/username/workspace/solution/projects/project/tsconfig.json",
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/workspace/solution/projects/project/a.ts

Shape signatures in builder refreshed for::
/user/username/workspace/solution/projects/project/a.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Enable  allowArbitraryExtensions

Input::
//// [/user/username/workspace/solution/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "allowArbitraryExtensions": true
  },
  "files": [
    "a.ts"
  ]
}


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m1[0m:[93m16[0m - [91merror[0m[90m TS2306: [0mFile '/user/username/workspace/solution/projects/project/b.d.css.ts' is not a module.

[7m1[0m import {} from './b.css'
[7m [0m [91m               ~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/a.js] file written with same contents

PolledWatches::
/user/username/workspace/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/workspace/solution/projects/project/a.ts:
  {}
/user/username/workspace/solution/projects/project/b.d.css.ts: *new*
  {}
/user/username/workspace/solution/projects/project/tsconfig.json:
  {}


Program root files: [
  "/user/username/workspace/solution/projects/project/a.ts"
]
Program options: {
  "allowArbitraryExtensions": true,
  "watch": true,
  "project": "/user/username/workspace/solution/projects/project/tsconfig.json",
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/b.d.css.ts
/user/username/workspace/solution/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/b.d.css.ts
/user/username/workspace/solution/projects/project/a.ts

Shape signatures in builder refreshed for::
/user/username/workspace/solution/projects/project/b.d.css.ts (used version)
/user/username/workspace/solution/projects/project/a.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

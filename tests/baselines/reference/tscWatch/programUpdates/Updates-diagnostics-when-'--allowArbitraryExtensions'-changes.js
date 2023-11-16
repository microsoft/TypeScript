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

//// [/a.ts]
import {} from './b.css'

//// [/b.d.css.ts]
declare const style: string;

//// [/tsconfig.json]
{
  "compilerOptions": {
    "allowArbitraryExtensions": true
  },
  "files": [
    "/a.ts"
  ]
}


/a/lib/tsc.js -w -p /tsconfig.json
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...

[96ma.ts[0m:[93m1[0m:[93m16[0m - [91merror[0m[90m TS2306: [0mFile '/b.d.css.ts' is not a module.

[7m1[0m import {} from './b.css'
[7m [0m [91m               ~~~~~~~~~[0m

[[90m12:00:18 AM[0m] Found 1 error. Watching for file changes.



//// [/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



FsWatches::
/a.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}
/b.d.css.ts: *new*
  {}
/tsconfig.json: *new*
  {}

Program root files: [
  "/a.ts"
]
Program options: {
  "allowArbitraryExtensions": true,
  "watch": true,
  "project": "/tsconfig.json",
  "configFilePath": "/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/b.d.css.ts
/a.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/b.d.css.ts
/a.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/b.d.css.ts (used version)
/a.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Disable  allowArbitraryExtensions

Input::
//// [/tsconfig.json]
{
  "compilerOptions": {
    "allowArbitraryExtensions": false
  },
  "files": [
    "/a.ts"
  ]
}


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:21 AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m1[0m:[93m16[0m - [91merror[0m[90m TS6263: [0mModule './b.css' was resolved to '/b.d.css.ts', but '--allowArbitraryExtensions' is not set.

[7m1[0m import {} from './b.css'
[7m [0m [91m               ~~~~~~~~~[0m

[[90m12:00:25 AM[0m] Found 1 error. Watching for file changes.



//// [/a.js] file written with same contents

FsWatches::
/a.ts:
  {}
/a/lib/lib.d.ts:
  {}
/tsconfig.json:
  {}

FsWatches *deleted*::
/b.d.css.ts:
  {}


Program root files: [
  "/a.ts"
]
Program options: {
  "allowArbitraryExtensions": false,
  "watch": true,
  "project": "/tsconfig.json",
  "configFilePath": "/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/a.ts

Semantic diagnostics in builder refreshed for::
/a.ts

Shape signatures in builder refreshed for::
/a.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Enable  allowArbitraryExtensions

Input::
//// [/tsconfig.json]
{
  "compilerOptions": {
    "allowArbitraryExtensions": true
  },
  "files": [
    "/a.ts"
  ]
}


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:28 AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m1[0m:[93m16[0m - [91merror[0m[90m TS2306: [0mFile '/b.d.css.ts' is not a module.

[7m1[0m import {} from './b.css'
[7m [0m [91m               ~~~~~~~~~[0m

[[90m12:00:32 AM[0m] Found 1 error. Watching for file changes.



//// [/a.js] file written with same contents

FsWatches::
/a.ts:
  {}
/a/lib/lib.d.ts:
  {}
/b.d.css.ts: *new*
  {}
/tsconfig.json:
  {}


Program root files: [
  "/a.ts"
]
Program options: {
  "allowArbitraryExtensions": true,
  "watch": true,
  "project": "/tsconfig.json",
  "configFilePath": "/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/b.d.css.ts
/a.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/b.d.css.ts
/a.ts

Shape signatures in builder refreshed for::
/b.d.css.ts (used version)
/a.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

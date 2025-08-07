currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/a.ts]
import {B} from './b';
declare var console: any;
let b = new B();
console.log(b.c.d);

//// [/user/username/projects/myproject/b.d.ts]
import {C} from './c';
export class B
{
    c: C;
}

//// [/user/username/projects/myproject/c.d.ts]
export class C
{
    d: number;
}

//// [/user/username/projects/myproject/tsconfig.json]
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


/home/src/tslibs/TS/Lib/tsc.js --w --assumeChangesOnlyAffectDirectDependencies --d
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("./b");
var b = new b_1.B();
console.log(b.c.d);


//// [/user/username/projects/myproject/a.d.ts]
export {};



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/a.ts: *new*
  {}
/user/username/projects/myproject/b.d.ts: *new*
  {}
/user/username/projects/myproject/c.d.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.d.ts",
  "/user/username/projects/myproject/c.d.ts"
]
Program options: {
  "watch": true,
  "assumeChangesOnlyAffectDirectDependencies": true,
  "declaration": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/c.d.ts
/user/username/projects/myproject/b.d.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/c.d.ts
/user/username/projects/myproject/b.d.ts
/user/username/projects/myproject/a.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/c.d.ts (used version)
/user/username/projects/myproject/b.d.ts (used version)
/user/username/projects/myproject/a.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: Rename property d to d2 of class C to initialize signatures

Input::
//// [/user/username/projects/myproject/c.d.ts]
export class C
{
    d2: number;
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

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.d.ts",
  "/user/username/projects/myproject/c.d.ts"
]
Program options: {
  "watch": true,
  "assumeChangesOnlyAffectDirectDependencies": true,
  "declaration": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/c.d.ts
/user/username/projects/myproject/b.d.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/c.d.ts
/user/username/projects/myproject/b.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/c.d.ts (used version)
/user/username/projects/myproject/b.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Rename property d2 to d of class C to revert back to original text

Input::
//// [/user/username/projects/myproject/c.d.ts]
export class C
{
    d: number;
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

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.d.ts",
  "/user/username/projects/myproject/c.d.ts"
]
Program options: {
  "watch": true,
  "assumeChangesOnlyAffectDirectDependencies": true,
  "declaration": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/c.d.ts
/user/username/projects/myproject/b.d.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/c.d.ts
/user/username/projects/myproject/b.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/c.d.ts (used version)
/user/username/projects/myproject/b.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Rename property d to d2 of class C

Input::
//// [/user/username/projects/myproject/c.d.ts]
export class C
{
    d2: number;
}


Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.d.ts",
  "/user/username/projects/myproject/c.d.ts"
]
Program options: {
  "watch": true,
  "assumeChangesOnlyAffectDirectDependencies": true,
  "declaration": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/c.d.ts
/user/username/projects/myproject/b.d.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/c.d.ts
/user/username/projects/myproject/b.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/c.d.ts (used version)
/user/username/projects/myproject/b.d.ts (used version)

exitCode:: ExitStatus.undefined

currentDirectory:: /user/username/workspace/solution/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/file.ts]
function one() {}
function two() {
    return function three() {
        one();
    }
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


/home/src/tslibs/TS/Lib/tsc.js -w /user/username/workspace/solution/projects/project/file.ts --noUnusedLocals
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/file.js]
function one() { }
function two() {
    return function three() {
        one();
    };
}



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
/user/username/workspace/solution/projects/project/file.ts: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/project/file.ts"
]
Program options: {
  "watch": true,
  "noUnusedLocals": true
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/file.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/file.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/workspace/solution/projects/project/file.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Change file to module

Input::
//// [/user/username/workspace/solution/projects/project/file.ts]
function one() {}
export function two() {
    return function three() {
        one();
    }
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



//// [/user/username/workspace/solution/projects/project/file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.two = two;
function one() { }
function two() {
    return function three() {
        one();
    };
}




Program root files: [
  "/user/username/workspace/solution/projects/project/file.ts"
]
Program options: {
  "watch": true,
  "noUnusedLocals": true
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/file.ts

Semantic diagnostics in builder refreshed for::
/user/username/workspace/solution/projects/project/file.ts

Shape signatures in builder refreshed for::
/user/username/workspace/solution/projects/project/file.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

currentDirectory:: /user/username/workspace/solution/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/commonFile1.ts]
/// <reference path="commonFile2.ts"/>
                    let x = y

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


/home/src/tslibs/TS/Lib/tsc.js -w /user/username/workspace/solution/projects/project/commonFile1.ts
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mcommonFile1.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/user/username/workspace/solution/projects/project/commonFile2.ts' not found.

[7m1[0m /// <reference path="commonFile2.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~[0m

[96mcommonFile1.ts[0m:[93m2[0m:[93m29[0m - [91merror[0m[90m TS2304: [0mCannot find name 'y'.

[7m2[0m                     let x = y
[7m [0m [91m                            ~[0m

[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/commonFile1.js]
/// <reference path="commonFile2.ts"/>
var x = y;



PolledWatches::
/user/username/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/project/commonFile2.ts: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/workspace/solution/projects/project/commonFile1.ts: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/project/commonFile1.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/commonFile1.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/commonFile1.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/workspace/solution/projects/project/commonfile1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: create file2

Input::
//// [/user/username/workspace/solution/projects/project/commonFile2.ts]
let y = 1


PolledWatches::
/user/username/workspace/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/workspace/solution/projects/project/commonFile2.ts:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/workspace/solution/projects/project/commonFile1.ts:
  {}

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



//// [/user/username/workspace/solution/projects/project/commonFile1.js] file written with same contents
//// [/user/username/workspace/solution/projects/project/commonFile2.js]
var y = 1;



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
/user/username/workspace/solution/projects/project/commonFile1.ts:
  {}
/user/username/workspace/solution/projects/project/commonFile2.ts: *new*
  {}


Program root files: [
  "/user/username/workspace/solution/projects/project/commonFile1.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/commonFile2.ts
/user/username/workspace/solution/projects/project/commonFile1.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/commonFile2.ts
/user/username/workspace/solution/projects/project/commonFile1.ts

Shape signatures in builder refreshed for::
/user/username/workspace/solution/projects/project/commonfile2.ts (computed .d.ts)
/user/username/workspace/solution/projects/project/commonfile1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

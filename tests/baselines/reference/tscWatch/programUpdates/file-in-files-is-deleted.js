currentDirectory:: /user/username/workspace/solution/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/f1.ts]
let x = 1

//// [/user/username/workspace/solution/projects/project/f2.ts]
let y = 1

//// [/user/username/workspace/solution/projects/project/tsconfig.json]
{
  "compilerOptions": {},
  "files": [
    "f1.ts",
    "f2.ts"
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


/home/src/tslibs/TS/Lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/f1.js]
var x = 1;


//// [/user/username/workspace/solution/projects/project/f2.js]
var y = 1;



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
/user/username/workspace/solution/projects/project/f1.ts: *new*
  {}
/user/username/workspace/solution/projects/project/f2.ts: *new*
  {}
/user/username/workspace/solution/projects/project/tsconfig.json: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/project/f1.ts",
  "/user/username/workspace/solution/projects/project/f2.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/f1.ts
/user/username/workspace/solution/projects/project/f2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/f1.ts
/user/username/workspace/solution/projects/project/f2.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/workspace/solution/projects/project/f1.ts (used version)
/user/username/workspace/solution/projects/project/f2.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Delete f2

Input::
//// [/user/username/workspace/solution/projects/project/f2.ts] deleted

Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[91merror[0m[90m TS6053: [0mFile '/user/username/workspace/solution/projects/project/f2.ts' not found.
  The file is in the program because:
    Part of 'files' list in tsconfig.json

  [96mtsconfig.json[0m:[93m5[0m:[93m5[0m
    [7m5[0m     "f2.ts"
    [7m [0m [96m    ~~~~~~~[0m
    File is matched by 'files' list specified here.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/f1.js] file written with same contents

PolledWatches::
/user/username/workspace/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/projects/project/f2.ts: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/workspace/solution/projects/project/f1.ts:
  {}
/user/username/workspace/solution/projects/project/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/workspace/solution/projects/project/f2.ts:
  {}


Program root files: [
  "/user/username/workspace/solution/projects/project/f1.ts",
  "/user/username/workspace/solution/projects/project/f2.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/f1.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/user/username/workspace/solution/projects/project/f1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

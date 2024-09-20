currentDirectory:: /user/username/workspace/solution/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/a.ts]
label: while (1) {}

//// [/user/username/workspace/solution/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "allowUnusedLabels": true
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


/home/src/tslibs/TS/Lib/tsc.js -w -p /user/username/workspace/solution/projects/project/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/a.js]
label: while (1) { }



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
/user/username/workspace/solution/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/workspace/solution/projects/project: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/project/a.ts"
]
Program options: {
  "allowUnusedLabels": true,
  "watch": true,
  "project": "/user/username/workspace/solution/projects/project/tsconfig.json",
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/a.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/workspace/solution/projects/project/a.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Disable  allowUnsusedLabels

Input::
//// [/user/username/workspace/solution/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "allowUnusedLabels": false
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

[96ma.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS7028: [0mUnused label.

[7m1[0m label: while (1) {}
[7m [0m [91m~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/user/username/workspace/solution/projects/project/a.ts"
]
Program options: {
  "allowUnusedLabels": false,
  "watch": true,
  "project": "/user/username/workspace/solution/projects/project/tsconfig.json",
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/a.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Enable  allowUnsusedLabels

Input::
//// [/user/username/workspace/solution/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "allowUnusedLabels": true
  }
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
  "/user/username/workspace/solution/projects/project/a.ts"
]
Program options: {
  "allowUnusedLabels": true,
  "watch": true,
  "project": "/user/username/workspace/solution/projects/project/tsconfig.json",
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/a.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

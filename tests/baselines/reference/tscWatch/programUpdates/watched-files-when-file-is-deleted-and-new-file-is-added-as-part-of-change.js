currentDirectory:: /home/username/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/username/workspaces/project/src/file1.ts]
var a = 10;

//// [/home/username/workspaces/project/tsconfig.json]
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


/home/src/tslibs/TS/Lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/username/workspaces/project/src/file1.js]
var a = 10;



PolledWatches::
/home/username/workspaces/node_modules/@types: *new*
  {"pollingInterval":500}
/home/username/workspaces/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/home/username/workspaces/project/src/file1.ts: *new*
  {}
/home/username/workspaces/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/username/workspaces/project: *new*
  {}

Program root files: [
  "/home/username/workspaces/project/src/file1.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/home/username/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/username/workspaces/project/src/file1.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/username/workspaces/project/src/file1.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/username/workspaces/project/src/file1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Rename file1 to file2

Input::
//// [/home/username/workspaces/project/src/file2.ts]
var a = 10;

//// [/home/username/workspaces/project/src/file1.ts] deleted

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



//// [/home/username/workspaces/project/src/file2.js]
var a = 10;



PolledWatches::
/home/username/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/username/workspaces/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/home/username/workspaces/project/src/file2.ts: *new*
  {}
/home/username/workspaces/project/tsconfig.json:
  {}

FsWatches *deleted*::
/home/username/workspaces/project/src/file1.ts:
  {}

FsWatchesRecursive::
/home/username/workspaces/project:
  {}


Program root files: [
  "/home/username/workspaces/project/src/file2.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/home/username/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/username/workspaces/project/src/file2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/username/workspaces/project/src/file2.ts

Shape signatures in builder refreshed for::
/home/username/workspaces/project/src/file2.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

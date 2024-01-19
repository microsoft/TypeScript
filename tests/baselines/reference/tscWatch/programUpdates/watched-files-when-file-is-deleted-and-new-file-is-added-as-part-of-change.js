currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/home/username/project/src/file1.ts]
var a = 10;

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

//// [/home/username/project/tsconfig.json]
{}


/a/lib/tsc.js -w -p /home/username/project/tsconfig.json
Output::
>> Screen clear
[[90m12:00:21 AM[0m] Starting compilation in watch mode...

[[90m12:00:24 AM[0m] Found 0 errors. Watching for file changes.



//// [/home/username/project/src/file1.js]
var a = 10;



PolledWatches::
/home/username/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/home/username/project/src/file1.ts: *new*
  {}
/home/username/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/username/project: *new*
  {}

Program root files: [
  "/home/username/project/src/file1.ts"
]
Program options: {
  "watch": true,
  "project": "/home/username/project/tsconfig.json",
  "configFilePath": "/home/username/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/home/username/project/src/file1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/home/username/project/src/file1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/home/username/project/src/file1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Rename file1 to file2

Input::
//// [/home/username/project/src/file2.ts]
var a = 10;

//// [/home/username/project/src/file1.ts] deleted

Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:28 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:31 AM[0m] Found 0 errors. Watching for file changes.



//// [/home/username/project/src/file2.js]
var a = 10;



PolledWatches::
/home/username/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/home/username/project/src/file2.ts: *new*
  {}
/home/username/project/tsconfig.json:
  {}

FsWatches *deleted*::
/home/username/project/src/file1.ts:
  {}

FsWatchesRecursive::
/home/username/project:
  {}


Program root files: [
  "/home/username/project/src/file2.ts"
]
Program options: {
  "watch": true,
  "project": "/home/username/project/tsconfig.json",
  "configFilePath": "/home/username/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/home/username/project/src/file2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/home/username/project/src/file2.ts

Shape signatures in builder refreshed for::
/home/username/project/src/file2.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

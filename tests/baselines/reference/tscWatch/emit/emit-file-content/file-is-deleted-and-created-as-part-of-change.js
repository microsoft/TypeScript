currentDirectory:: /home/username/project useCaseSensitiveFileNames: true
Input::
//// [/home/username/project/app/file.ts]
var a = 10;

//// [/home/username/project/tsconfig.json]
{
  "include": [
    "app/**/*.ts"
  ]
}

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


/a/lib/tsc.js -w
Output::
>> Screen clear
[[90m12:00:21 AM[0m] Starting compilation in watch mode...

[[90m12:00:24 AM[0m] Found 0 errors. Watching for file changes.



//// [/home/username/project/app/file.js]
var a = 10;



PolledWatches::
/home/username/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/home/username/project/app/file.ts: *new*
  {}
/home/username/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/username/project/app: *new*
  {}

Program root files: [
  "/home/username/project/app/file.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/home/username/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/home/username/project/app/file.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/home/username/project/app/file.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/home/username/project/app/file.ts (used version)

exitCode:: ExitStatus.undefined

Change:: file is deleted and then created to modify content

Input::
//// [/home/username/project/app/file.ts]
var a = 10;
var b = 10;


Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:28 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:32 AM[0m] Found 0 errors. Watching for file changes.



//// [/home/username/project/app/file.js]
var a = 10;
var b = 10;




Program root files: [
  "/home/username/project/app/file.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/home/username/project/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/home/username/project/app/file.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/home/username/project/app/file.ts

Shape signatures in builder refreshed for::
/home/username/project/app/file.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

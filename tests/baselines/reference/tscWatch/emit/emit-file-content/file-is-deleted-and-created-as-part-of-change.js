currentDirectory:: /home/username/projects/project useCaseSensitiveFileNames:: true
Input::
//// [/home/username/projects/project/app/file.ts]
var a = 10;

//// [/home/username/projects/project/tsconfig.json]
{
  "include": [
    "app/**/*.ts"
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



//// [/home/username/projects/project/app/file.js]
var a = 10;



PolledWatches::
/home/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/home/username/projects/project/app/file.ts: *new*
  {}
/home/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/username/projects/project/app: *new*
  {}

Program root files: [
  "/home/username/projects/project/app/file.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/home/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/username/projects/project/app/file.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/username/projects/project/app/file.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts (used version)
/home/username/projects/project/app/file.ts (used version)

exitCode:: ExitStatus.undefined

Change:: file is deleted and then created to modify content

Input::
//// [/home/username/projects/project/app/file.ts]
var a = 10;
var b = 10;


Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/username/projects/project/app/file.js]
var a = 10;
var b = 10;




Program root files: [
  "/home/username/projects/project/app/file.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/home/username/projects/project/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/username/projects/project/app/file.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/username/projects/project/app/file.ts

Shape signatures in builder refreshed for::
/home/username/projects/project/app/file.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/tsconfig.json]
{}

//// [/user/username/projects/myproject/main.ts]
export const x = 10;

//// [/user/username/projects/myproject/other.ts]
export const y = 10;

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


/home/src/tslibs/TS/Lib/tsc.js --w --p /user/username/projects/myproject/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.




PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/main.ts: *new*
  {}
/user/username/projects/myproject/other.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/main.ts",
  "/user/username/projects/myproject/other.ts"
]
Program options: {
  "noEmit": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/main.ts (used version)
/user/username/projects/myproject/other.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Modify a file

Input::
//// [/user/username/projects/myproject/main.ts]
export const x = 10;
// SomeComment


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
  "/user/username/projects/myproject/main.ts",
  "/user/username/projects/myproject/other.ts"
]
Program options: {
  "noEmit": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/main.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/main.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

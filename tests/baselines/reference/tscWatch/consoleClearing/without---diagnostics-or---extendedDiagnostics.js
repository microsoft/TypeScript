currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/f.ts]


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


/home/src/tslibs/TS/Lib/tsc.js --w /user/username/projects/myproject/f.ts
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/f.js]



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/f.ts: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/f.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/f.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/f.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/f.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Comment added to file f

Input::
//// [/user/username/projects/myproject/f.ts]
//


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



//// [/user/username/projects/myproject/f.js]
//




Program root files: [
  "/user/username/projects/myproject/f.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/f.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/f.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/f.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

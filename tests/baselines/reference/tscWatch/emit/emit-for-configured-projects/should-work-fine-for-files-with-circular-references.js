currentDirectory:: /home/src/projects/a/b useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/a/b/file1.ts]
/// <reference path="./file2.ts" />
export var t1 = 10;

//// [/home/src/projects/a/b/file2.ts]
/// <reference path="./file1.ts" />
export var t2 = 10;

//// [/home/src/projects/a/b/tsconfig.json]
{}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/home/src/projects/a/b/file2.js]
/// <reference path="./file1.ts" />
export var t2 = 10;


//// [/home/src/projects/a/b/file1.js]
/// <reference path="./file2.ts" />
export var t1 = 10;



FsWatches::
/home/src/projects/a/b/file1.ts: *new*
  {}
/home/src/projects/a/b/file2.ts: *new*
  {}
/home/src/projects/a/b/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/a/b: *new*
  {}

Program root files: [
  "/home/src/projects/a/b/file1.ts",
  "/home/src/projects/a/b/file2.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/home/src/projects/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/projects/a/b/file2.ts
/home/src/projects/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/projects/a/b/file2.ts
/home/src/projects/a/b/file1.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/home/src/projects/a/b/file2.ts (used version)
/home/src/projects/a/b/file1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: change file1

Input::
//// [/home/src/projects/a/b/file1.ts]
/// <reference path="./file2.ts" />
export var t1 = 10;export var t3 = 10;


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



//// [/home/src/projects/a/b/file2.js] file written with same contents
//// [/home/src/projects/a/b/file1.js]
/// <reference path="./file2.ts" />
export var t1 = 10;
export var t3 = 10;




Program root files: [
  "/home/src/projects/a/b/file1.ts",
  "/home/src/projects/a/b/file2.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/home/src/projects/a/b/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/projects/a/b/file2.ts
/home/src/projects/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/a/b/file2.ts
/home/src/projects/a/b/file1.ts

Shape signatures in builder refreshed for::
/home/src/projects/a/b/file1.ts (computed .d.ts)
/home/src/projects/a/b/file2.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

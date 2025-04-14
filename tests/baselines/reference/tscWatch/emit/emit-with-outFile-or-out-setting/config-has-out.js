currentDirectory:: /home/src/projects/a useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/a/a.ts]
let x = 1

//// [/home/src/projects/a/b.ts]
let y = 1

//// [/home/src/projects/a/tsconfig.json]
{
  "compilerOptions": {
    "out": "/home/src/projects/a/out.js"
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


/home/src/tslibs/TS/Lib/tsc.js --w -p /home/src/projects/a/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5102: [0mOption 'out' has been removed. Please remove it from your configuration.
  Use 'outFile' instead.

[7m3[0m     "out": "/home/src/projects/a/out.js"
[7m [0m [91m    ~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/a/a.js]
var x = 1;


//// [/home/src/projects/a/b.js]
var y = 1;



PolledWatches::
/home/src/projects/a/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/a.ts: *new*
  {}
/home/src/projects/a/b.ts: *new*
  {}
/home/src/projects/a/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/a: *new*
  {}

Program root files: [
  "/home/src/projects/a/a.ts",
  "/home/src/projects/a/b.ts"
]
Program options: {
  "out": "/home/src/projects/a/out.js",
  "watch": true,
  "project": "/home/src/projects/a/tsconfig.json",
  "configFilePath": "/home/src/projects/a/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/a.ts
/home/src/projects/a/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/a/a.ts (used version)
/home/src/projects/a/b.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Make change in the file

Input::
//// [/home/src/projects/a/a.ts]
let x = 11


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5102: [0mOption 'out' has been removed. Please remove it from your configuration.
  Use 'outFile' instead.

[7m3[0m     "out": "/home/src/projects/a/out.js"
[7m [0m [91m    ~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/a/a.js]
var x = 11;


//// [/home/src/projects/a/b.js] file written with same contents


Program root files: [
  "/home/src/projects/a/a.ts",
  "/home/src/projects/a/b.ts"
]
Program options: {
  "out": "/home/src/projects/a/out.js",
  "watch": true,
  "project": "/home/src/projects/a/tsconfig.json",
  "configFilePath": "/home/src/projects/a/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/a.ts
/home/src/projects/a/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/projects/a/a.ts (computed .d.ts)
/home/src/projects/a/b.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Make change in the file again

Input::
//// [/home/src/projects/a/a.ts]
let xy = 11


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5102: [0mOption 'out' has been removed. Please remove it from your configuration.
  Use 'outFile' instead.

[7m3[0m     "out": "/home/src/projects/a/out.js"
[7m [0m [91m    ~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/a/a.js]
var xy = 11;


//// [/home/src/projects/a/b.js] file written with same contents


Program root files: [
  "/home/src/projects/a/a.ts",
  "/home/src/projects/a/b.ts"
]
Program options: {
  "out": "/home/src/projects/a/out.js",
  "watch": true,
  "project": "/home/src/projects/a/tsconfig.json",
  "configFilePath": "/home/src/projects/a/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/a.ts
/home/src/projects/a/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/projects/a/a.ts (computed .d.ts)
/home/src/projects/a/b.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

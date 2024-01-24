currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/a.ts]
let x = 1

//// [/a/b.ts]
let y = 1

//// [/a/tsconfig.json]
{
  "compilerOptions": {
    "outFile": "/a/out.js"
  }
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


/a/lib/tsc.js --w -p /a/tsconfig.json
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...

[[90m12:00:18 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/out.js]
var x = 1;
var y = 1;



FsWatches::
/a/a.ts: *new*
  {}
/a/b.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}
/a/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

Program root files: [
  "/a/a.ts",
  "/a/b.ts",
  "/a/lib/lib.d.ts"
]
Program options: {
  "outFile": "/a/out.js",
  "watch": true,
  "project": "/a/tsconfig.json",
  "configFilePath": "/a/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/a.ts
/a/b.ts
/a/lib/lib.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Make change in the file

Input::
//// [/a/a.ts]
let x = 11


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:22 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:26 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/out.js]
var x = 11;
var y = 1;




Program root files: [
  "/a/a.ts",
  "/a/b.ts",
  "/a/lib/lib.d.ts"
]
Program options: {
  "outFile": "/a/out.js",
  "watch": true,
  "project": "/a/tsconfig.json",
  "configFilePath": "/a/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/a.ts
/a/b.ts
/a/lib/lib.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Make change in the file again

Input::
//// [/a/a.ts]
let xy = 11


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:30 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:34 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/out.js]
var xy = 11;
var y = 1;




Program root files: [
  "/a/a.ts",
  "/a/b.ts",
  "/a/lib/lib.d.ts"
]
Program options: {
  "outFile": "/a/out.js",
  "watch": true,
  "project": "/a/tsconfig.json",
  "configFilePath": "/a/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/a.ts
/a/b.ts
/a/lib/lib.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

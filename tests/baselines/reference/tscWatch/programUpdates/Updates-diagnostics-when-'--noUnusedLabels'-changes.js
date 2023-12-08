currentDirectory:: / useCaseSensitiveFileNames: false
Input::
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

//// [/a.ts]
label: while (1) {}

//// [/tsconfig.json]
{
  "compilerOptions": {
    "allowUnusedLabels": true
  }
}


/a/lib/tsc.js -w -p /tsconfig.json
Output::
>> Screen clear
[[90m12:00:13 AM[0m] Starting compilation in watch mode...

[[90m12:00:16 AM[0m] Found 0 errors. Watching for file changes.



//// [/a.js]
label: while (1) { }



FsWatches::
/a.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}
/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}

Program root files: [
  "/a.ts",
  "/a/lib/lib.d.ts"
]
Program options: {
  "allowUnusedLabels": true,
  "watch": true,
  "project": "/tsconfig.json",
  "configFilePath": "/tsconfig.json"
}
Program structureReused: Not
Program files::
/a.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::
/a.ts
/a/lib/lib.d.ts

Shape signatures in builder refreshed for::
/a.ts (used version)
/a/lib/lib.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Disable  allowUnsusedLabels

Input::
//// [/tsconfig.json]
{
  "compilerOptions": {
    "allowUnusedLabels": false
  }
}


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:19 AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS7028: [0mUnused label.

[7m1[0m label: while (1) {}
[7m [0m [91m~~~~~[0m

[[90m12:00:20 AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/a.ts",
  "/a/lib/lib.d.ts"
]
Program options: {
  "allowUnusedLabels": false,
  "watch": true,
  "project": "/tsconfig.json",
  "configFilePath": "/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::
/a.ts
/a/lib/lib.d.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Enable  allowUnsusedLabels

Input::
//// [/tsconfig.json]
{
  "compilerOptions": {
    "allowUnusedLabels": true
  }
}


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:23 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:24 AM[0m] Found 0 errors. Watching for file changes.





Program root files: [
  "/a.ts",
  "/a/lib/lib.d.ts"
]
Program options: {
  "allowUnusedLabels": true,
  "watch": true,
  "project": "/tsconfig.json",
  "configFilePath": "/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::
/a.ts
/a/lib/lib.d.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

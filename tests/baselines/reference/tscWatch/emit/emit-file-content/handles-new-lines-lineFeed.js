currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/app.ts]
var x = 1;
var y = 2;

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


/a/lib/tsc.js --w /a/app.ts
Output::
>> Screen clear
[[90m12:00:11 AM[0m] Starting compilation in watch mode...

[[90m12:00:14 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/app.js]
var x = 1;
var y = 2;



FsWatches::
/a/app.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Program root files: [
  "/a/app.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/app.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/app.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/app.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Append a line

Input::
//// [/a/app.ts]
var x = 1;
var y = 2;
var z = 3;


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:17 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:21 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/app.js]
var x = 1;
var y = 2;
var z = 3;




Program root files: [
  "/a/app.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/app.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/app.ts

Shape signatures in builder refreshed for::
/a/app.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

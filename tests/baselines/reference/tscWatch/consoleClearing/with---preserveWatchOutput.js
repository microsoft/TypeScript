currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/f.ts]


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


/a/lib/tsc.js --w /f.ts --preserveWatchOutput
Output::
[[90m12:00:11 AM[0m] Starting compilation in watch mode...

[[90m12:00:14 AM[0m] Found 0 errors. Watching for file changes.



//// [/f.js]



FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/f.ts: *new*
  {}

Program root files: [
  "/f.ts"
]
Program options: {
  "watch": true,
  "preserveWatchOutput": true
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/f.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/f.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/f.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Comment added to file f

Input::
//// [/f.ts]
//


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
[[90m12:00:17 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:21 AM[0m] Found 0 errors. Watching for file changes.



//// [/f.js]
//




Program root files: [
  "/f.ts"
]
Program options: {
  "watch": true,
  "preserveWatchOutput": true
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/f.ts

Semantic diagnostics in builder refreshed for::
/f.ts

Shape signatures in builder refreshed for::
/f.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

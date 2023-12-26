currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/b/f1.ts]
let x = 1;

//// [/a/b/f2.ts]
let y = 2;

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

//// [/a/b/tsconfig.json]
{}


/a/lib/tsc.js -w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:17 AM[0m] Starting compilation in watch mode...

[[90m12:00:22 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/f1.js]
var x = 1;


//// [/a/b/f2.js]
var y = 2;



FsWatches::
/a/b/f1.ts: *new*
  {}
/a/b/f2.ts: *new*
  {}
/a/b/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Program root files: [
  "/a/b/f1.ts",
  "/a/b/f2.ts"
]
Program options: {
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/f1.ts
/a/b/f2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/f1.ts
/a/b/f2.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/f1.ts (used version)
/a/b/f2.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Delete config file

Input::
//// [/a/b/tsconfig.json] deleted

Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
[91merror[0m[90m TS5083: [0mCannot read file '/a/b/tsconfig.json'.





exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

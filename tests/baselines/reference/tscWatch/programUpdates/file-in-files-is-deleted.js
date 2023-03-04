Input::
//// [/a/b/f1.ts]
let x = 1

//// [/a/b/f2.ts]
let y = 1

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
{"compilerOptions":{},"files":["f1.ts","f2.ts"]}


/a/lib/tsc.js -w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:17 AM[0m] Starting compilation in watch mode...

[[90m12:00:22 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/f1.ts","/a/b/f2.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
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

PolledWatches::
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}
/a/b/f1.ts: *new*
  {}
/a/b/f2.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

exitCode:: ExitStatus.undefined

//// [/a/b/f1.js]
var x = 1;


//// [/a/b/f2.js]
var y = 1;



Change:: Delete f2

Input::
//// [/a/b/f2.ts] deleted

Output::
>> Screen clear
[[90m12:00:24 AM[0m] File change detected. Starting incremental compilation...

[91merror[0m[90m TS6053: [0mFile '/a/b/f2.ts' not found.
  The file is in the program because:
    Part of 'files' list in tsconfig.json

  [96ma/b/tsconfig.json[0m:[93m1[0m:[93m40[0m
    [7m1[0m {"compilerOptions":{},"files":["f1.ts","f2.ts"]}
    [7m [0m [96m                                       ~~~~~~~[0m
    File is matched by 'files' list specified here.

[[90m12:00:28 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a/b/f1.ts","/a/b/f2.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/f1.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/a/b/f1.ts (computed .d.ts)

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/f2.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/f1.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/a/b/f2.ts:
  {}

exitCode:: ExitStatus.undefined

//// [/a/b/f1.js] file written with same contents

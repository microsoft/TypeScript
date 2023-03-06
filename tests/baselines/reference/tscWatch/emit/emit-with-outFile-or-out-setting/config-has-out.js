Input::
//// [/a/a.ts]
let x = 1

//// [/a/b.ts]
let y = 1

//// [/a/tsconfig.json]
{"compilerOptions":{"out":"/a/out.js"}}

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

[96ma/tsconfig.json[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS5101: [0mFlag 'out' is deprecated and will stop functioning in TypeScript 5.5. Specify compilerOption '"ignoreDeprecations": "5.0"' to silence this error.

[7m1[0m {"compilerOptions":{"out":"/a/out.js"}}
[7m [0m [91m                    ~~~~~[0m

[[90m12:00:18 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a/a.ts","/a/b.ts","/a/lib/lib.d.ts"]
Program options: {"out":"/a/out.js","watch":true,"project":"/a/tsconfig.json","configFilePath":"/a/tsconfig.json"}
Program structureReused: Not
Program files::
/a/a.ts
/a/b.ts
/a/lib/lib.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

PolledWatches::
/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json: *new*
  {}
/a/a.ts: *new*
  {}
/a/b.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

exitCode:: ExitStatus.undefined

//// [/a/out.js]
var x = 1;
var y = 1;



Change:: Make change in the file

Input::
//// [/a/a.ts]
let x = 11


Output::
>> Screen clear
[[90m12:00:22 AM[0m] File change detected. Starting incremental compilation...

[96ma/tsconfig.json[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS5101: [0mFlag 'out' is deprecated and will stop functioning in TypeScript 5.5. Specify compilerOption '"ignoreDeprecations": "5.0"' to silence this error.

[7m1[0m {"compilerOptions":{"out":"/a/out.js"}}
[7m [0m [91m                    ~~~~~[0m

[[90m12:00:26 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a/a.ts","/a/b.ts","/a/lib/lib.d.ts"]
Program options: {"out":"/a/out.js","watch":true,"project":"/a/tsconfig.json","configFilePath":"/a/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/a.ts
/a/b.ts
/a/lib/lib.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

//// [/a/out.js]
var x = 11;
var y = 1;



Change:: Make change in the file again

Input::
//// [/a/a.ts]
let xy = 11


Output::
>> Screen clear
[[90m12:00:30 AM[0m] File change detected. Starting incremental compilation...

[96ma/tsconfig.json[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS5101: [0mFlag 'out' is deprecated and will stop functioning in TypeScript 5.5. Specify compilerOption '"ignoreDeprecations": "5.0"' to silence this error.

[7m1[0m {"compilerOptions":{"out":"/a/out.js"}}
[7m [0m [91m                    ~~~~~[0m

[[90m12:00:34 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a/a.ts","/a/b.ts","/a/lib/lib.d.ts"]
Program options: {"out":"/a/out.js","watch":true,"project":"/a/tsconfig.json","configFilePath":"/a/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/a.ts
/a/b.ts
/a/lib/lib.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

//// [/a/out.js]
var xy = 11;
var y = 1;



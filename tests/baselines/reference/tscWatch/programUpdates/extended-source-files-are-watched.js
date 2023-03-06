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

//// [/a/b/commonFile1.ts]
let x = 1

//// [/a/b/commonFile2.ts]
let y = 1

//// [/a/b/tsconfig.json]
{"compilerOptions":{},"files":["/a/b/commonFile1.ts","/a/b/commonFile2.ts"]}

//// [/a/b/first.tsconfig.json]
{"compilerOptions":{"strict":true}}

//// [/a/b/second.tsconfig.json]
{"extends":"./first.tsconfig.json"}


/a/lib/tsc.js -w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:21 AM[0m] Starting compilation in watch mode...

[[90m12:00:26 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/commonFile1.ts","/a/b/commonFile2.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/commonfile1.ts (used version)
/a/b/commonfile2.ts (used version)

PolledWatches::
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}
/a/b/commonfile1.ts: *new*
  {}
/a/b/commonfile2.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

exitCode:: ExitStatus.undefined

//// [/a/b/commonFile1.js]
var x = 1;


//// [/a/b/commonFile2.js]
var y = 1;



Change:: Change config to extend another config

Input::
//// [/a/b/tsconfig.json]
{"extends":"./second.tsconfig.json","compilerOptions":{},"files":["/a/b/commonFile1.ts","/a/b/commonFile2.ts"]}


Output::
>> Screen clear
[[90m12:00:29 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:36 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/commonFile1.ts","/a/b/commonFile2.ts"]
Program options: {"strict":true,"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

No shapes updated in the builder::

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/commonfile1.ts:
  {}
/a/b/commonfile2.ts:
  {}
/a/lib/lib.d.ts:
  {}
/a/b/second.tsconfig.json: *new*
  {}
/a/b/first.tsconfig.json: *new*
  {}

exitCode:: ExitStatus.undefined

//// [/a/b/commonFile1.js]
"use strict";
var x = 1;


//// [/a/b/commonFile2.js]
"use strict";
var y = 1;



Change:: Change first extended config

Input::
//// [/a/b/first.tsconfig.json]
{"compilerOptions":{"strict":false}}


Output::
>> Screen clear
[[90m12:00:39 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:46 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/commonFile1.ts","/a/b/commonFile2.ts"]
Program options: {"strict":false,"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

//// [/a/b/commonFile1.js]
var x = 1;


//// [/a/b/commonFile2.js]
var y = 1;



Change:: Change second extended config

Input::
//// [/a/b/second.tsconfig.json]
{"extends":"./first.tsconfig.json","compilerOptions":{"strictNullChecks":true}}


Output::
>> Screen clear
[[90m12:00:49 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:50 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/commonFile1.ts","/a/b/commonFile2.ts"]
Program options: {"strict":false,"strictNullChecks":true,"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined


Change:: Change config to stop extending another config

Input::
//// [/a/b/tsconfig.json]
{"compilerOptions":{},"files":["/a/b/commonFile1.ts","/a/b/commonFile2.ts"]}


Output::
>> Screen clear
[[90m12:00:54 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:55 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/commonFile1.ts","/a/b/commonFile2.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

No shapes updated in the builder::

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/commonfile1.ts:
  {}
/a/b/commonfile2.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/a/b/second.tsconfig.json:
  {}
/a/b/first.tsconfig.json:
  {}

exitCode:: ExitStatus.undefined


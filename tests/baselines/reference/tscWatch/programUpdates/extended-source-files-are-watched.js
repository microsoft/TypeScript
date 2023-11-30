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

//// [/a/b/commonFile1.ts]
let x = 1

//// [/a/b/commonFile2.ts]
let y = 1

//// [/a/b/tsconfig.json]
{
  "compilerOptions": {},
  "files": [
    "/a/b/commonFile1.ts",
    "/a/b/commonFile2.ts"
  ]
}

//// [/a/b/first.tsconfig.json]
{
  "compilerOptions": {
    "strict": true
  }
}

//// [/a/b/second.tsconfig.json]
{
  "extends": "./first.tsconfig.json"
}


/a/lib/tsc.js -w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:21 AM[0m] Starting compilation in watch mode...

[[90m12:00:26 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/commonFile1.js]
var x = 1;


//// [/a/b/commonFile2.js]
var y = 1;



FsWatches::
/a/b/commonFile1.ts: *new*
  {}
/a/b/commonFile2.ts: *new*
  {}
/a/b/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Program root files: [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
]
Program options: {
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
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

exitCode:: ExitStatus.undefined

Change:: Change config to extend another config

Input::
//// [/a/b/tsconfig.json]
{
  "extends": "./second.tsconfig.json",
  "compilerOptions": {},
  "files": [
    "/a/b/commonFile1.ts",
    "/a/b/commonFile2.ts"
  ]
}


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:29 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:36 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/commonFile1.js]
"use strict";
var x = 1;


//// [/a/b/commonFile2.js]
"use strict";
var y = 1;



FsWatches::
/a/b/commonFile1.ts:
  {}
/a/b/commonFile2.ts:
  {}
/a/b/first.tsconfig.json: *new*
  {}
/a/b/second.tsconfig.json: *new*
  {}
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}


Program root files: [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
]
Program options: {
  "strict": true,
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
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

Change:: Change first extended config

Input::
//// [/a/b/first.tsconfig.json]
{
  "compilerOptions": {
    "strict": false
  }
}


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:39 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:46 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/commonFile1.js]
var x = 1;


//// [/a/b/commonFile2.js]
var y = 1;




Program root files: [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
]
Program options: {
  "strict": false,
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
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

Change:: Change second extended config

Input::
//// [/a/b/second.tsconfig.json]
{
  "extends": "./first.tsconfig.json",
  "compilerOptions": {
    "strictNullChecks": true
  }
}


Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:49 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:50 AM[0m] Found 0 errors. Watching for file changes.





Program root files: [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
]
Program options: {
  "strict": false,
  "strictNullChecks": true,
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
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
{
  "compilerOptions": {},
  "files": [
    "/a/b/commonFile1.ts",
    "/a/b/commonFile2.ts"
  ]
}


Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:54 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:55 AM[0m] Found 0 errors. Watching for file changes.




FsWatches::
/a/b/commonFile1.ts:
  {}
/a/b/commonFile2.ts:
  {}
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/a/b/first.tsconfig.json:
  {}
/a/b/second.tsconfig.json:
  {}


Program root files: [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
]
Program options: {
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
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

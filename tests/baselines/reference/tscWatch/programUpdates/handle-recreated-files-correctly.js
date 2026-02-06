currentDirectory:: /user/username/workspace/solution/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/commonFile1.ts]
let x = 1

//// [/user/username/workspace/solution/projects/project/commonFile2.ts]
let y = 1

//// [/user/username/workspace/solution/projects/project/tsconfig.json]
{}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js -w --explainFiles
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

../../../../../../home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
  Default library for target 'es2025'
commonFile1.ts
  Matched by default include pattern '**/*'
commonFile2.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/user/username/workspace/solution/projects/project/commonFile1.js]
"use strict";
let x = 1;


//// [/user/username/workspace/solution/projects/project/commonFile2.js]
"use strict";
let y = 1;



FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {}
/user/username/workspace/solution/projects/project/commonFile1.ts: *new*
  {}
/user/username/workspace/solution/projects/project/commonFile2.ts: *new*
  {}
/user/username/workspace/solution/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/workspace/solution/projects/project: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/project/commonFile1.ts",
  "/user/username/workspace/solution/projects/project/commonFile2.ts"
]
Program options: {
  "watch": true,
  "explainFiles": true,
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/project/commonFile1.ts
/user/username/workspace/solution/projects/project/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/project/commonFile1.ts
/user/username/workspace/solution/projects/project/commonFile2.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/user/username/workspace/solution/projects/project/commonfile1.ts (used version)
/user/username/workspace/solution/projects/project/commonfile2.ts (used version)

exitCode:: ExitStatus.undefined

Change:: change file to ensure signatures are updated

Input::
//// [/user/username/workspace/solution/projects/project/commonFile2.ts]
let y = 1;let xy = 10;


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

../../../../../../home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
  Default library for target 'es2025'
commonFile1.ts
  Matched by default include pattern '**/*'
commonFile2.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/commonFile1.js] file written with same contents
//// [/user/username/workspace/solution/projects/project/commonFile2.js]
"use strict";
let y = 1;
let xy = 10;




Program root files: [
  "/user/username/workspace/solution/projects/project/commonFile1.ts",
  "/user/username/workspace/solution/projects/project/commonFile2.ts"
]
Program options: {
  "watch": true,
  "explainFiles": true,
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/project/commonFile1.ts
/user/username/workspace/solution/projects/project/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/project/commonFile1.ts
/user/username/workspace/solution/projects/project/commonFile2.ts

Shape signatures in builder refreshed for::
/user/username/workspace/solution/projects/project/commonfile2.ts (computed .d.ts)
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/user/username/workspace/solution/projects/project/commonfile1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: delete file2

Input::
//// [/user/username/workspace/solution/projects/project/commonFile2.ts] deleted

Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

../../../../../../home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
  Default library for target 'es2025'
commonFile1.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/commonFile1.js] file written with same contents

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts:
  {}
/user/username/workspace/solution/projects/project/commonFile1.ts:
  {}
/user/username/workspace/solution/projects/project/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/workspace/solution/projects/project/commonFile2.ts:
  {}

FsWatchesRecursive::
/user/username/workspace/solution/projects/project:
  {}


Program root files: [
  "/user/username/workspace/solution/projects/project/commonFile1.ts"
]
Program options: {
  "watch": true,
  "explainFiles": true,
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/project/commonFile1.ts

Semantic diagnostics in builder refreshed for::
/user/username/workspace/solution/projects/project/commonFile1.ts

Shape signatures in builder refreshed for::
/user/username/workspace/solution/projects/project/commonfile1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: recreate file2

Input::
//// [/user/username/workspace/solution/projects/project/commonFile2.ts]
let y = 1


Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

../../../../../../home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
  Default library for target 'es2025'
commonFile1.ts
  Matched by default include pattern '**/*'
commonFile2.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/commonFile1.js] file written with same contents
//// [/user/username/workspace/solution/projects/project/commonFile2.js]
"use strict";
let y = 1;



FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts:
  {}
/user/username/workspace/solution/projects/project/commonFile1.ts:
  {}
/user/username/workspace/solution/projects/project/commonFile2.ts: *new*
  {}
/user/username/workspace/solution/projects/project/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/workspace/solution/projects/project:
  {}


Program root files: [
  "/user/username/workspace/solution/projects/project/commonFile1.ts",
  "/user/username/workspace/solution/projects/project/commonFile2.ts"
]
Program options: {
  "watch": true,
  "explainFiles": true,
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/project/commonFile1.ts
/user/username/workspace/solution/projects/project/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/project/commonFile1.ts
/user/username/workspace/solution/projects/project/commonFile2.ts

Shape signatures in builder refreshed for::
/user/username/workspace/solution/projects/project/commonfile2.ts (computed .d.ts)
/user/username/workspace/solution/projects/project/commonfile1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

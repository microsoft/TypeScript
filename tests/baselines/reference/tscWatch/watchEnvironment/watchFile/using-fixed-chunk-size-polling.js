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
  "watchOptions": {
    "watchFile": "FixedChunkSizePolling"
  }
}


/a/lib/tsc.js -w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:17 AM[0m] Starting compilation in watch mode...

[[90m12:00:22 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/commonFile1.js]
var x = 1;


//// [/a/b/commonFile2.js]
var y = 1;



FsWatchesRecursive::
/a/b: *new*
  {}

Timeout callback:: count: 1
1: pollQueue *new*

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

Change:: The timeout is to check the status of all files

Input::

Before running Timeout callback:: count: 1
1: pollQueue

After running Timeout callback:: count: 1

Timeout callback:: count: 1
2: pollQueue *new*

Before running Timeout callback:: count: 1
2: pollQueue

After running Timeout callback:: count: 1

Timeout callback:: count: 1
3: pollQueue *new*

Before running Timeout callback:: count: 1
3: pollQueue

After running Timeout callback:: count: 1

Timeout callback:: count: 1
4: pollQueue *new*

Before running Timeout callback:: count: 1
4: pollQueue

After running Timeout callback:: count: 1

Timeout callback:: count: 1
5: pollQueue *new*


exitCode:: ExitStatus.undefined

Change:: Make change to file but should detect as changed and schedule program update

Input::
//// [/a/b/commonFile1.ts]
var zz30 = 100;


Before running Timeout callback:: count: 1
5: pollQueue

After running Timeout callback:: count: 2

Timeout callback:: count: 2
6: timerToUpdateProgram *new*
7: pollQueue *new*


exitCode:: ExitStatus.undefined

Change:: Callbacks: queue and scheduled program update

Input::

Before running Timeout callback:: count: 2
6: timerToUpdateProgram
7: pollQueue

After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90m12:00:32 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:39 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/commonFile1.js]
var zz30 = 100;


//// [/a/b/commonFile2.js] file written with same contents

Timeout callback:: count: 1
8: pollQueue *new*


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

Shape signatures in builder refreshed for::
/a/b/commonfile1.ts (computed .d.ts)
/a/b/commonfile2.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: The timeout is to check the status of all files

Input::

Before running Timeout callback:: count: 1
8: pollQueue

After running Timeout callback:: count: 1

Timeout callback:: count: 1
9: pollQueue *new*


exitCode:: ExitStatus.undefined

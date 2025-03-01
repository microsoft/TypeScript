currentDirectory:: /user/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/project/commonFile1.ts]
let x = 1

//// [/user/username/projects/project/commonFile2.ts]
let y = 1

//// [/user/username/projects/project/tsconfig.json]
{
  "watchOptions": {
    "watchFile": "FixedChunkSizePolling"
  }
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/project/commonFile1.js]
var x = 1;


//// [/user/username/projects/project/commonFile2.js]
var y = 1;



PolledWatches::
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatchesRecursive::
/user/username/projects/project: *new*
  {}

Timeout callback:: count: 1
1: pollQueue *new*

Program root files: [
  "/user/username/projects/project/commonFile1.ts",
  "/user/username/projects/project/commonFile2.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/user/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/project/commonfile1.ts (used version)
/user/username/projects/project/commonfile2.ts (used version)

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

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
3: pollQueue *new*

Before running Timeout callback:: count: 1
3: pollQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
4: pollQueue *new*

Before running Timeout callback:: count: 1
4: pollQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
5: pollQueue *new*


exitCode:: ExitStatus.undefined

Change:: Make change to file but should detect as changed and schedule program update

Input::
//// [/user/username/projects/project/commonFile1.ts]
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

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/project/commonFile1.js]
var zz30 = 100;


//// [/user/username/projects/project/commonFile2.js] file written with same contents

Timeout callback:: count: 1
8: pollQueue *new*


Program root files: [
  "/user/username/projects/project/commonFile1.ts",
  "/user/username/projects/project/commonFile2.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/user/username/projects/project/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts

Shape signatures in builder refreshed for::
/user/username/projects/project/commonfile1.ts (computed .d.ts)
/user/username/projects/project/commonfile2.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: The timeout is to check the status of all files

Input::

Before running Timeout callback:: count: 1
8: pollQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
9: pollQueue *new*


exitCode:: ExitStatus.undefined

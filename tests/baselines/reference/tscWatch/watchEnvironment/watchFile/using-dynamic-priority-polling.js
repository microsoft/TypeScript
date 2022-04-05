Input::
//// [/a/username/project/typescript.ts]
var z = 10;

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


fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

/a/lib/tsc.js --w /a/username/project/typescript.ts
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...

[[90m12:00:18 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/username/project/typescript.ts"]
Program options: {"watch":true}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/username/project/typescript.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/username/project/typescript.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/username/project/typescript.ts (used version)

WatchedFiles::

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/a/username/project/typescript.js]
var z = 10;



fileExists:: {} 

directoryExists:: {
 "/node_modules/@types": 1
} 

getModifiedTimes:: {
 "/a/username/project/typescript.ts": 1,
 "/a/lib/lib.d.ts": 1
} 

setModifiedTimes:: {} 

Change:: Time spent to Transition libFile and file1 to low priority queue

Input::

fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Output::

WatchedFiles::

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {
 "/a/username/project/typescript.ts": 64,
 "/a/lib/lib.d.ts": 64
} 

setModifiedTimes:: {} 

Change:: Make change to file

Input::
//// [/a/username/project/typescript.ts]
var zz30 = 100;


fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Output::

WatchedFiles::

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {
 "/a/username/project/typescript.ts": 1,
 "/a/lib/lib.d.ts": 1
} 

setModifiedTimes:: {} 

Change:: Callbacks: medium priority + high priority queue and scheduled program update

Input::

fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Output::
>> Screen clear
[[90m12:00:22 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:26 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/username/project/typescript.ts"]
Program options: {"watch":true}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/username/project/typescript.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/username/project/typescript.ts

Shape signatures in builder refreshed for::
/a/username/project/typescript.ts (computed .d.ts)

WatchedFiles::

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/a/username/project/typescript.js]
var zz30 = 100;



fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {
 "/a/username/project/typescript.ts": 1,
 "/a/lib/lib.d.ts": 1
} 

setModifiedTimes:: {} 

Change:: Polling queues polled and everything is in the high polling queue

Input::

fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Output::

WatchedFiles::

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {
 "/a/username/project/typescript.ts": 98,
 "/a/lib/lib.d.ts": 96
} 

setModifiedTimes:: {} 

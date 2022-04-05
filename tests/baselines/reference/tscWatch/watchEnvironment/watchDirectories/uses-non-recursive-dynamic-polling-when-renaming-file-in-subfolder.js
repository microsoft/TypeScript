Input::
//// [/a/username/project/src/file1.ts]


//// [/a/username/project/tsconfig.json]
{"watchOptions":{"synchronousWatchDirectory":true}}

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

/a/lib/tsc.js --w -p /a/username/project/tsconfig.json
Output::
>> Screen clear
[[90m12:00:19 AM[0m] Starting compilation in watch mode...

[[90m12:00:22 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/username/project/src/file1.ts"]
Program options: {"watch":true,"project":"/a/username/project/tsconfig.json","configFilePath":"/a/username/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/username/project/src/file1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/username/project/src/file1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/username/project/src/file1.ts (used version)

WatchedFiles::
/a/username/project/tsconfig.json:
  {"fileName":"/a/username/project/tsconfig.json","pollingInterval":250}
/a/username/project/src/file1.ts:
  {"fileName":"/a/username/project/src/file1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/a/username/project/src/file1.js]



fileExists:: {
 "/a/username/project/tsconfig.json": 1
} 

directoryExists:: {
 "/a/username/project/tsconfig.json": 1,
 "/a/username/project/node_modules/@types": 2,
 "/a/username/node_modules/@types": 1,
 "/a/node_modules/@types": 1,
 "/node_modules/@types": 1,
 "/a/username/project": 1,
 "/a/username/project/src": 1
} 

getModifiedTimes:: {
 "/a/username/project/node_modules/@types": 1,
 "/a/username/project": 1,
 "/a/username/project/src": 1
} 

setModifiedTimes:: {} 

Change:: Rename file1 to file2

Input::
//// [/a/username/project/src/file2.ts]


//// [/a/username/project/src/file1.ts] deleted

fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Output::
>> Screen clear
[[90m12:00:26 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:29 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/username/project/src/file2.ts"]
Program options: {"watch":true,"project":"/a/username/project/tsconfig.json","configFilePath":"/a/username/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/username/project/src/file2.ts

Semantic diagnostics in builder refreshed for::
/a/username/project/src/file2.ts

Shape signatures in builder refreshed for::
/a/username/project/src/file2.ts (used version)

WatchedFiles::
/a/username/project/tsconfig.json:
  {"fileName":"/a/username/project/tsconfig.json","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/a/username/project/src/file2.ts:
  {"fileName":"/a/username/project/src/file2.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/a/username/project/src/file2.js]



fileExists:: {} 

directoryExists:: {
 "/a/username/project/src": 2,
 "/a/username/project/node_modules/@types": 1,
 "/a/username/node_modules/@types": 1,
 "/a/node_modules/@types": 1,
 "/node_modules/@types": 1
} 

getModifiedTimes:: {
 "/a/username/project/node_modules/@types": 2,
 "/a/username/project": 2,
 "/a/username/project/src": 2
} 

setModifiedTimes:: {} 

/a/lib/tsc.js -w -p /home/username/project/tsconfig.json
//// [/home/username/project/src/file1.ts]
var a = 10;

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

//// [/home/username/project/tsconfig.json]
{}

//// [/home/username/project/src/file1.js]
var a = 10;



Output::
>> Screen clear
12:00:21 AM - Starting compilation in watch mode...



12:00:24 AM - Found 0 errors. Watching for file changes.


Program root files: ["/home/username/project/src/file1.ts"]
Program options: {"watch":true,"project":"/home/username/project/tsconfig.json","configFilePath":"/home/username/project/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/home/username/project/src/file1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/home/username/project/src/file1.ts

WatchedFiles::
/home/username/project/tsconfig.json:
  {"fileName":"/home/username/project/tsconfig.json","pollingInterval":250}
/home/username/project/src/file1.ts:
  {"fileName":"/home/username/project/src/file1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/home/username/project/node_modules/@types:
  {"directoryName":"/home/username/project/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/home/username/project:
  {"directoryName":"/home/username/project","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Rename file1 to file2

//// [/home/username/project/src/file2.ts]
var a = 10;

//// [/home/username/project/src/file2.js]
var a = 10;


//// [/home/username/project/src/file1.ts] deleted

Output::
>> Screen clear
12:00:28 AM - File change detected. Starting incremental compilation...



12:00:31 AM - Found 0 errors. Watching for file changes.


Program root files: ["/home/username/project/src/file2.ts"]
Program options: {"watch":true,"project":"/home/username/project/tsconfig.json","configFilePath":"/home/username/project/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/home/username/project/src/file2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/home/username/project/src/file2.ts

WatchedFiles::
/home/username/project/tsconfig.json:
  {"fileName":"/home/username/project/tsconfig.json","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/home/username/project/src/file2.ts:
  {"fileName":"/home/username/project/src/file2.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/home/username/project/node_modules/@types:
  {"directoryName":"/home/username/project/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/home/username/project:
  {"directoryName":"/home/username/project","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

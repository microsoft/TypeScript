/a/lib/tsc.js --w -p /a/username/project/tsconfig.json
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

//// [/a/username/project/src/file1.js]



Output::
>> Screen clear
12:00:19 AM - Starting compilation in watch mode...



12:00:22 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/username/project/src/file1.ts"]
Program options: {"watch":true,"project":"/a/username/project/tsconfig.json","configFilePath":"/a/username/project/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/username/project/src/file1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/username/project/src/file1.ts

WatchedFiles::
/a/username/project/tsconfig.json:
  {"pollingInterval":250}
/a/username/project/src/file1.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::
/a/username/project/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/username/project:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/username/project/src:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

Change:: Rename file1 to file2

//// [/a/username/project/src/file2.ts]


//// [/a/username/project/src/file2.js]


//// [/a/username/project/src/file1.ts] deleted

Output::
>> Screen clear
12:00:26 AM - File change detected. Starting incremental compilation...



12:00:29 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/username/project/src/file2.ts"]
Program options: {"watch":true,"project":"/a/username/project/tsconfig.json","configFilePath":"/a/username/project/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/username/project/src/file2.ts

Semantic diagnostics in builder refreshed for::
/a/username/project/src/file2.ts

WatchedFiles::
/a/username/project/tsconfig.json:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}
/a/username/project/src/file2.ts:
  {"pollingInterval":250}

FsWatches::
/a/username/project/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/username/project:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/username/project/src:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

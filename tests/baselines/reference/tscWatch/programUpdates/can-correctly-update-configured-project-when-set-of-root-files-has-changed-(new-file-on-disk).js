/a/lib/tsc.js -w -p /a/b/tsconfig.json
//// [/a/b/f1.ts]
let x = 1

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

//// [/a/b/tsconfig.json]
{}

//// [/a/b/f1.js]
var x = 1;



Output::
>> Screen clear
12:00:15 AM - Starting compilation in watch mode...



12:00:18 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/f1.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/f1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/f1.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/f1.ts:
  {"fileName":"/a/b/f1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Write f2

//// [/a/b/f1.js] file written with same contents
//// [/a/b/f2.ts]
let y = 1

//// [/a/b/f2.js]
var y = 1;



Output::
>> Screen clear
12:00:21 AM - File change detected. Starting incremental compilation...



12:00:27 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/f1.ts","/a/b/f2.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/f1.ts
/a/b/f2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/f1.ts
/a/b/f2.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/f1.ts:
  {"fileName":"/a/b/f1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/a/b/f2.ts:
  {"fileName":"/a/b/f2.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

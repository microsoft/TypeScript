Input::
//// [/a/a.ts]
let x = 1

//// [/a/b.ts]
let y = 1

//// [/a/tsconfig.json]
{"compilerOptions":{}}

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


/a/lib/tsc.js --w -p /a/tsconfig.json
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...


[[90m12:00:20 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/a.ts","/a/b.ts","/a/lib/lib.d.ts"]
Program options: {"watch":true,"project":"/a/tsconfig.json","configFilePath":"/a/tsconfig.json"}
Program files::
/a/a.ts
/a/b.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::
/a/a.ts
/a/b.ts
/a/lib/lib.d.ts

WatchedFiles::
/a/tsconfig.json:
  {"fileName":"/a/tsconfig.json","pollingInterval":250}
/a/a.ts:
  {"fileName":"/a/a.ts","pollingInterval":250}
/a/b.ts:
  {"fileName":"/a/b.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/node_modules/@types:
  {"directoryName":"/a/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a:
  {"directoryName":"/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/a.js]
var x = 1;


//// [/a/b.js]
var y = 1;



Change:: Make change in the file

Input::
//// [/a/a.ts]
let x = 11


Output::
>> Screen clear
[[90m12:00:24 AM[0m] File change detected. Starting incremental compilation...


[[90m12:00:28 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/a.ts","/a/b.ts","/a/lib/lib.d.ts"]
Program options: {"watch":true,"project":"/a/tsconfig.json","configFilePath":"/a/tsconfig.json"}
Program files::
/a/a.ts
/a/b.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::
/a/a.ts

WatchedFiles::
/a/tsconfig.json:
  {"fileName":"/a/tsconfig.json","pollingInterval":250}
/a/a.ts:
  {"fileName":"/a/a.ts","pollingInterval":250}
/a/b.ts:
  {"fileName":"/a/b.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/node_modules/@types:
  {"directoryName":"/a/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a:
  {"directoryName":"/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/a.js]
var x = 11;



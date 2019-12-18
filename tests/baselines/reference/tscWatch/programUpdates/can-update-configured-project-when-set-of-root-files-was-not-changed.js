/a/lib/tsc.js -w -p /a/b/tsconfig.json
//// [/a/b/f1.ts]
let x = 1

//// [/a/b/f2.ts]
let y = 1

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
{"compilerOptions":{},"files":["f1.ts","f2.ts"]}

//// [/a/b/f1.js]
var x = 1;


//// [/a/b/f2.js]
var y = 1;



Output::
>> Screen clear
12:00:17 AM - Starting compilation in watch mode...



12:00:22 AM - Found 0 errors. Watching for file changes.


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
  {"pollingInterval":250}
/a/b/f1.ts:
  {"pollingInterval":250}
/a/b/f2.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Modify config to set outFile option

//// [/a/b/tsconfig.json]
{"compilerOptions":{"outFile":"out.js"},"files":["f1.ts","f2.ts"]}

//// [/a/b/out.js]
var x = 1;
var y = 1;



Output::
>> Screen clear
12:00:26 AM - File change detected. Starting incremental compilation...



12:00:29 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/f1.ts","/a/b/f2.ts"]
Program options: {"outFile":"/a/b/out.js","watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/f1.ts
/a/b/f2.ts

No cached semantic diagnostics in the builder::

WatchedFiles::
/a/b/tsconfig.json:
  {"pollingInterval":250}
/a/b/f1.ts:
  {"pollingInterval":250}
/a/b/f2.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

/a/lib/tsc.js --w -p /a/b/tsconfig.json
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

//// [/a/b/file1.ts]
/// <reference path="./file2.ts" />
export var t1 = 10;

//// [/a/b/file2.ts]
/// <reference path="./file1.ts" />
export var t2 = 10;

//// [/a/b/tsconfig.json]
{}

//// [/a/b/file2.js]
"use strict";
exports.__esModule = true;
/// <reference path="./file1.ts" />
exports.t2 = 10;


//// [/a/b/file1.js]
"use strict";
exports.__esModule = true;
/// <reference path="./file2.ts" />
exports.t1 = 10;



Output::
>> Screen clear
12:00:17 AM - Starting compilation in watch mode...



12:00:22 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/file1.ts","/a/b/file2.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/file2.ts
/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/file2.ts
/a/b/file1.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/file1.ts:
  {"fileName":"/a/b/file1.ts","pollingInterval":250}
/a/b/file2.ts:
  {"fileName":"/a/b/file2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: change file1

//// [/a/b/file1.ts]
/// <reference path="./file2.ts" />
export var t1 = 10;export var t3 = 10;

//// [/a/b/file2.js] file written with same contents
//// [/a/b/file1.js]
"use strict";
exports.__esModule = true;
/// <reference path="./file2.ts" />
exports.t1 = 10;
exports.t3 = 10;



Output::
>> Screen clear
12:00:25 AM - File change detected. Starting incremental compilation...



12:00:32 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/file1.ts","/a/b/file2.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/file2.ts
/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/a/b/file2.ts
/a/b/file1.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/file1.ts:
  {"fileName":"/a/b/file1.ts","pollingInterval":250}
/a/b/file2.ts:
  {"fileName":"/a/b/file2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

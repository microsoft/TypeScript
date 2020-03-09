/a/lib/tsc.js -w /user/username/projects/myproject/a.ts --skipLibCheck
//// [/user/username/projects/myproject/a.ts]
export {}
declare global {
interface Document {
    fullscreen: boolean;
}
var y: number;
}

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
interface Document {
    readonly fullscreen: boolean;
}

//// [/user/username/projects/myproject/a.js]
"use strict";
exports.__esModule = true;



Output::
>> Screen clear
12:00:19 AM - Starting compilation in watch mode...


a.ts(4,5): error TS2687: All declarations of 'fullscreen' must have identical modifiers.


12:00:22 AM - Found 1 error. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts"]
Program options: {"watch":true,"skipLibCheck":true}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts

WatchedFiles::
/user/username/projects/myproject/a.ts:
  {"fileName":"/user/username/projects/myproject/a.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Remove document declaration from file

//// [/user/username/projects/myproject/a.ts]
export {}
declare global {
var x: string;
var y: number;
}

//// [/user/username/projects/myproject/a.js] file written with same contents

Output::
>> Screen clear
12:00:26 AM - File change detected. Starting incremental compilation...



12:00:30 AM - Found 0 errors. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts"]
Program options: {"watch":true,"skipLibCheck":true}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/a.ts

WatchedFiles::
/user/username/projects/myproject/a.ts:
  {"fileName":"/user/username/projects/myproject/a.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Rever the file to contain document declaration

//// [/user/username/projects/myproject/a.ts]
export {}
declare global {
interface Document {
    fullscreen: boolean;
}
var y: number;
}

//// [/user/username/projects/myproject/a.js] file written with same contents

Output::
>> Screen clear
12:00:34 AM - File change detected. Starting incremental compilation...


a.ts(4,5): error TS2687: All declarations of 'fullscreen' must have identical modifiers.


12:00:38 AM - Found 1 error. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts"]
Program options: {"watch":true,"skipLibCheck":true}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/a.ts

WatchedFiles::
/user/username/projects/myproject/a.ts:
  {"fileName":"/user/username/projects/myproject/a.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

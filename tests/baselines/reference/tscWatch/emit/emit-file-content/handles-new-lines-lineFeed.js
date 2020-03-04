/a/lib/tsc.js --w /a/app.ts
//// [/a/app.ts]
var x = 1;
var y = 2;

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

//// [/a/app.js]
var x = 1;
var y = 2;



Output::
>> Screen clear
12:00:11 AM - Starting compilation in watch mode...



12:00:14 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/app.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/a/app.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/app.ts

WatchedFiles::
/a/app.ts:
  {"fileName":"/a/app.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

Change:: Append a line

//// [/a/app.ts]
var x = 1;
var y = 2;
var z = 3;

//// [/a/app.js]
var x = 1;
var y = 2;
var z = 3;



Output::
>> Screen clear
12:00:17 AM - File change detected. Starting incremental compilation...



12:00:21 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/app.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/a/app.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/app.ts

WatchedFiles::
/a/app.ts:
  {"fileName":"/a/app.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

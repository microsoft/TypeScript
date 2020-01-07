/a/lib/tsc.js -w /a/b/commonFile1.ts
//// [/a/b/commonFile1.ts]
/// <reference path="commonFile2.ts"/>
                    let x = y

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

//// [/a/b/commonFile1.js]
/// <reference path="commonFile2.ts"/>
var x = y;



Output::
>> Screen clear
12:00:13 AM - Starting compilation in watch mode...


a/b/commonFile1.ts(1,22): error TS6053: File '/a/b/commonFile2.ts' not found.

a/b/commonFile1.ts(2,29): error TS2304: Cannot find name 'y'.


12:00:16 AM - Found 2 errors. Watching for file changes.


Program root files: ["/a/b/commonFile1.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/a/b/commonFile1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/commonFile1.ts

WatchedFiles::
/a/b/commonfile1.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}
/a/b/commonfile2.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

Change:: create file2

//// [/a/b/commonFile1.js] file written with same contents
//// [/a/b/commonFile2.ts]
let y = 1

//// [/a/b/commonFile2.js]
var y = 1;



Output::
>> Screen clear
12:00:19 AM - File change detected. Starting incremental compilation...



12:00:25 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/commonFile1.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/a/b/commonFile2.ts
/a/b/commonFile1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/commonFile2.ts
/a/b/commonFile1.ts

WatchedFiles::
/a/b/commonfile1.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}
/a/b/commonfile2.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

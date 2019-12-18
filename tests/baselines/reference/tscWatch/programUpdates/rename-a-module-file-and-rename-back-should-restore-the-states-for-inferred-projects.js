/a/lib/tsc.js -w /a/b/file1.ts
//// [/a/b/moduleFile.ts]
export function bar() { };

//// [/a/b/file1.ts]
import * as T from "./moduleFile"; T.bar();

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

//// [/a/b/moduleFile.js]
"use strict";
exports.__esModule = true;
function bar() { }
exports.bar = bar;
;


//// [/a/b/file1.js]
"use strict";
exports.__esModule = true;
var T = require("./moduleFile");
T.bar();



Output::
>> Screen clear
12:00:15 AM - Starting compilation in watch mode...



12:00:20 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/file1.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/a/b/moduleFile.ts
/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/moduleFile.ts
/a/b/file1.ts

WatchedFiles::
/a/b/file1.ts:
  {"pollingInterval":250}
/a/b/modulefile.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

Change:: Rename moduleFile to moduleFile1

//// [/a/b/file1.js] file written with same contents
//// [/a/b/moduleFile1.ts]
export function bar() { };

//// [/a/b/moduleFile.ts] deleted
//// [/a/b/moduleFile.js] deleted

Output::
>> Screen clear
12:00:25 AM - File change detected. Starting incremental compilation...


a/b/file1.ts(1,20): error TS2307: Cannot find module './moduleFile'.


12:00:29 AM - Found 1 error. Watching for file changes.


Program root files: ["/a/b/file1.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/a/b/file1.ts

WatchedFiles::
/a/b/file1.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}
/a/b/modulefile.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

Change:: Rename moduleFile1 back to moduleFile

//// [/a/b/file1.js] file written with same contents
//// [/a/b/moduleFile.ts]
export function bar() { };

//// [/a/b/moduleFile.js]
"use strict";
exports.__esModule = true;
function bar() { }
exports.bar = bar;
;


//// [/a/b/moduleFile1.ts] deleted

Output::
>> Screen clear
12:00:33 AM - File change detected. Starting incremental compilation...



12:00:39 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/file1.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/a/b/moduleFile.ts
/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/a/b/moduleFile.ts
/a/b/file1.ts

WatchedFiles::
/a/b/file1.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}
/a/b/modulefile.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

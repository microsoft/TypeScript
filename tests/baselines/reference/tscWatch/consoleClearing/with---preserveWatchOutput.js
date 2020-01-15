/a/lib/tsc.js --w /f.ts --preserveWatchOutput
//// [/f.ts]


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

//// [/f.js]



Output::

12:00:11 AM - Starting compilation in watch mode...



12:00:14 AM - Found 0 errors. Watching for file changes.


Program root files: ["/f.ts"]
Program options: {"watch":true,"preserveWatchOutput":true}
Program files::
/a/lib/lib.d.ts
/f.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/f.ts

WatchedFiles::
/f.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

Change:: Comment added to file f

//// [/f.ts]
//

//// [/f.js]
//



Output::

12:00:17 AM - File change detected. Starting incremental compilation...



12:00:21 AM - Found 0 errors. Watching for file changes.


Program root files: ["/f.ts"]
Program options: {"watch":true,"preserveWatchOutput":true}
Program files::
/a/lib/lib.d.ts
/f.ts

Semantic diagnostics in builder refreshed for::
/f.ts

WatchedFiles::
/f.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

/a/lib/tsc.js --w /f.ts --extendedDiagnostics
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


Current directory: / CaseSensitiveFileNames: false

Synchronizing program

CreatingProgramWith::

  roots: ["/f.ts"]

  options: {"watch":true,"extendedDiagnostics":true}

FileWatcher:: Added:: WatchInfo: /f.ts 250 undefined Source file

FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 undefined Source file


12:00:14 AM - Found 0 errors. Watching for file changes.


Program root files: ["/f.ts"]
Program options: {"watch":true,"extendedDiagnostics":true}
Program files::
/a/lib/lib.d.ts
/f.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/f.ts

WatchedFiles::
/f.ts:
  {"fileName":"/f.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

Change:: Comment added to file f

//// [/f.ts]
//

//// [/f.js]
//



Output::
FileWatcher:: Triggered with /f.ts 1:: WatchInfo: /f.ts 250 undefined Source file

Scheduling update

Elapsed:: *ms FileWatcher:: Triggered with /f.ts 1:: WatchInfo: /f.ts 250 undefined Source file


12:00:17 AM - File change detected. Starting incremental compilation...


Synchronizing program

CreatingProgramWith::

  roots: ["/f.ts"]

  options: {"watch":true,"extendedDiagnostics":true}


12:00:21 AM - Found 0 errors. Watching for file changes.


Program root files: ["/f.ts"]
Program options: {"watch":true,"extendedDiagnostics":true}
Program files::
/a/lib/lib.d.ts
/f.ts

Semantic diagnostics in builder refreshed for::
/f.ts

WatchedFiles::
/f.ts:
  {"fileName":"/f.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

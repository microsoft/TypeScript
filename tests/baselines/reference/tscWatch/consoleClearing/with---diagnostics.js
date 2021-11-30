Input::
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


/a/lib/tsc.js --w /f.ts --diagnostics
Output::
[[90m12:00:11 AM[0m] Starting compilation in watch mode...

Current directory: / CaseSensitiveFileNames: false
Synchronizing program
CreatingProgramWith::
  roots: ["/f.ts"]
  options: {"watch":true,"diagnostics":true}
[[90m12:00:14 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/f.ts"]
Program options: {"watch":true,"diagnostics":true}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/f.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/f.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/f.ts (used version)

WatchedFiles::
/f.ts:
  {"fileName":"/f.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/f.js]



Change:: Comment added to file f

Input::
//// [/f.ts]
//


Output::
FileWatcher:: Triggered with /f.ts 1:: WatchInfo: /f.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /f.ts 1:: WatchInfo: /f.ts 250 undefined Source file
[[90m12:00:17 AM[0m] File change detected. Starting incremental compilation...

Synchronizing program
CreatingProgramWith::
  roots: ["/f.ts"]
  options: {"watch":true,"diagnostics":true}
[[90m12:00:21 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/f.ts"]
Program options: {"watch":true,"diagnostics":true}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/f.ts

Semantic diagnostics in builder refreshed for::
/f.ts

Shape signatures in builder refreshed for::
/f.ts (computed .d.ts)

WatchedFiles::
/f.ts:
  {"fileName":"/f.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/f.js]
//



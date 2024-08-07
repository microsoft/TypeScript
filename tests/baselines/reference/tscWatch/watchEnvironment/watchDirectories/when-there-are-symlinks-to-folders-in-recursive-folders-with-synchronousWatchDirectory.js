currentDirectory:: /home/user/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/a/lib/lib.d.ts] Inode:: 3
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

//// [/home/user/projects/myproject/src/file.ts] Inode:: 9
import * as a from "a"

//// [/home/user/projects/myproject/tsconfig.json] Inode:: 10
{
  "compilerOptions": {
    "extendedDiagnostics": true,
    "traceResolution": true
  },
  "watchOptions": {
    "synchronousWatchDirectory": true
  }
}

//// [/home/user/projects/myproject/node_modules/reala/index.d.ts] Inode:: 13
export {}

//// [/home/user/projects/myproject/node_modules/realb/index.d.ts] Inode:: 15
export {}

//// [/home/user/projects/myproject/node_modules/a] symlink(/home/user/projects/myproject/node_modules/reala) Inode:: 16
//// [/home/user/projects/myproject/node_modules/b] symlink(/home/user/projects/myproject/node_modules/realb) Inode:: 17
//// [/home/user/projects/myproject/node_modules/reala/node_modules/b] symlink(/home/user/projects/myproject/node_modules/b) Inode:: 19
//// [/home/user/projects/myproject/node_modules/realb/node_modules/a] symlink(/home/user/projects/myproject/node_modules/a) Inode:: 21

/a/lib/tsc.js --w
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /home/user/projects/myproject CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /home/user/projects/myproject/tsconfig.json 2000 {"synchronousWatchDirectory":true} Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/home/user/projects/myproject/src/file.ts"]
  options: {"extendedDiagnostics":true,"traceResolution":true,"watch":true,"configFilePath":"/home/user/projects/myproject/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /home/user/projects/myproject/src/file.ts 250 {"synchronousWatchDirectory":true} Source file
======== Resolving module 'a' from '/home/user/projects/myproject/src/file.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'a' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/user/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.
File '/home/user/projects/myproject/node_modules/a/package.json' does not exist.
File '/home/user/projects/myproject/node_modules/a.ts' does not exist.
File '/home/user/projects/myproject/node_modules/a.tsx' does not exist.
File '/home/user/projects/myproject/node_modules/a.d.ts' does not exist.
File '/home/user/projects/myproject/node_modules/a/index.ts' does not exist.
File '/home/user/projects/myproject/node_modules/a/index.tsx' does not exist.
File '/home/user/projects/myproject/node_modules/a/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/user/projects/myproject/node_modules/a/index.d.ts', result '/home/user/projects/myproject/node_modules/reala/index.d.ts'.
======== Module name 'a' was successfully resolved to '/home/user/projects/myproject/node_modules/reala/index.d.ts'. ========
File '/home/user/projects/myproject/node_modules/reala/package.json' does not exist.
File '/home/user/projects/myproject/node_modules/package.json' does not exist.
File '/home/user/projects/myproject/package.json' does not exist.
File '/home/user/projects/package.json' does not exist.
File '/home/user/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
FileWatcher:: Added:: WatchInfo: /home/user/projects/myproject/node_modules/reala/index.d.ts 250 {"synchronousWatchDirectory":true} Source file
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 {"synchronousWatchDirectory":true} Source file
DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject/src 1 {"synchronousWatchDirectory":true} Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject/src 1 {"synchronousWatchDirectory":true} Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject/node_modules/a 1 {"synchronousWatchDirectory":true} Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject/node_modules/a 1 {"synchronousWatchDirectory":true} Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject/node_modules 1 {"synchronousWatchDirectory":true} Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject/node_modules 1 {"synchronousWatchDirectory":true} Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /home/user/projects/myproject/node_modules/reala/package.json 2000 {"synchronousWatchDirectory":true} File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/user/projects/myproject/node_modules/package.json 2000 {"synchronousWatchDirectory":true} File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/user/projects/myproject/package.json 2000 {"synchronousWatchDirectory":true} File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/user/projects/package.json 2000 {"synchronousWatchDirectory":true} File location affecting resolution
DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject/node_modules/@types 1 {"synchronousWatchDirectory":true} Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject/node_modules/@types 1 {"synchronousWatchDirectory":true} Type roots
DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/node_modules/@types 1 {"synchronousWatchDirectory":true} Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/node_modules/@types 1 {"synchronousWatchDirectory":true} Type roots
DirectoryWatcher:: Triggered with /home/user/projects/myproject/src/file.js :: WatchInfo: /home/user/projects/myproject/src 1 {"synchronousWatchDirectory":true} Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/user/projects/myproject/src/file.js :: WatchInfo: /home/user/projects/myproject/src 1 {"synchronousWatchDirectory":true} Failed Lookup Locations
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject 1 {"synchronousWatchDirectory":true} Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject 1 {"synchronousWatchDirectory":true} Wild card directory


//// [/home/user/projects/myproject/src/file.js] Inode:: 22
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



PolledWatches::
/home/user/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/home/user/projects/myproject/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/user/projects/myproject/node_modules/reala/package.json: *new*
  {"pollingInterval":2000}
/home/user/projects/myproject/package.json: *new*
  {"pollingInterval":2000}
/home/user/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/user/projects/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts: *new*
  {"inode":3}
/home/user/projects/myproject: *new*
  {"inode":7}
/home/user/projects/myproject/node_modules: *new*
  {"inode":11}
/home/user/projects/myproject/node_modules/a: *new*
  {"inode":12}
/home/user/projects/myproject/node_modules/reala: *new*
  {"inode":12}
/home/user/projects/myproject/node_modules/reala/index.d.ts: *new*
  {"inode":13}
/home/user/projects/myproject/node_modules/reala/node_modules: *new*
  {"inode":18}
/home/user/projects/myproject/node_modules/realb: *new*
  {"inode":14}
/home/user/projects/myproject/node_modules/realb/node_modules: *new*
  {"inode":20}
/home/user/projects/myproject/src: *new*
  {"inode":8}
/home/user/projects/myproject/src/file.ts: *new*
  {"inode":9}
/home/user/projects/myproject/tsconfig.json: *new*
  {"inode":10}

Program root files: [
  "/home/user/projects/myproject/src/file.ts"
]
Program options: {
  "extendedDiagnostics": true,
  "traceResolution": true,
  "watch": true,
  "configFilePath": "/home/user/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/home/user/projects/myproject/node_modules/reala/index.d.ts
/home/user/projects/myproject/src/file.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/home/user/projects/myproject/node_modules/reala/index.d.ts
/home/user/projects/myproject/src/file.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/home/user/projects/myproject/node_modules/reala/index.d.ts (used version)
/home/user/projects/myproject/src/file.ts (used version)

exitCode:: ExitStatus.undefined

Change:: delete reala/index.d.ts

Input::
//// [/home/user/projects/myproject/node_modules/reala/index.d.ts] deleted

Output::
FileWatcher:: Triggered with /home/user/projects/myproject/node_modules/reala/index.d.ts 2:: WatchInfo: /home/user/projects/myproject/node_modules/reala/index.d.ts 250 {"synchronousWatchDirectory":true} Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/user/projects/myproject/node_modules/reala/index.d.ts 2:: WatchInfo: /home/user/projects/myproject/node_modules/reala/index.d.ts 250 {"synchronousWatchDirectory":true} Source file
sysLog:: /home/user/projects/myproject/node_modules/reala/index.d.ts:: Changing watcher to MissingFileSystemEntryWatcher
DirectoryWatcher:: Triggered with /home/user/projects/myproject/node_modules/reala/index.d.ts :: WatchInfo: /home/user/projects/myproject/node_modules 1 {"synchronousWatchDirectory":true} Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/user/projects/myproject/node_modules/reala/index.d.ts :: WatchInfo: /home/user/projects/myproject/node_modules 1 {"synchronousWatchDirectory":true} Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/user/projects/myproject/node_modules/reala/index.d.ts :: WatchInfo: /home/user/projects/myproject 1 {"synchronousWatchDirectory":true} Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/user/projects/myproject/node_modules/reala/index.d.ts :: WatchInfo: /home/user/projects/myproject 1 {"synchronousWatchDirectory":true} Wild card directory
DirectoryWatcher:: Triggered with /home/user/projects/myproject/node_modules/a/index.d.ts :: WatchInfo: /home/user/projects/myproject/node_modules/a 1 {"synchronousWatchDirectory":true} Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/user/projects/myproject/node_modules/a/index.d.ts :: WatchInfo: /home/user/projects/myproject/node_modules/a 1 {"synchronousWatchDirectory":true} Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/user/projects/myproject/node_modules/a/index.d.ts :: WatchInfo: /home/user/projects/myproject/node_modules 1 {"synchronousWatchDirectory":true} Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/user/projects/myproject/node_modules/a/index.d.ts :: WatchInfo: /home/user/projects/myproject/node_modules 1 {"synchronousWatchDirectory":true} Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/user/projects/myproject/node_modules/a/index.d.ts :: WatchInfo: /home/user/projects/myproject 1 {"synchronousWatchDirectory":true} Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/user/projects/myproject/node_modules/a/index.d.ts :: WatchInfo: /home/user/projects/myproject 1 {"synchronousWatchDirectory":true} Wild card directory


PolledWatches::
/home/user/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/home/user/projects/myproject/node_modules/package.json:
  {"pollingInterval":2000}
/home/user/projects/myproject/node_modules/reala/index.d.ts: *new*
  {"pollingInterval":250}
/home/user/projects/myproject/node_modules/reala/package.json:
  {"pollingInterval":2000}
/home/user/projects/myproject/package.json:
  {"pollingInterval":2000}
/home/user/projects/node_modules/@types:
  {"pollingInterval":500}
/home/user/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {"inode":3}
/home/user/projects/myproject:
  {"inode":7}
/home/user/projects/myproject/node_modules:
  {"inode":11}
/home/user/projects/myproject/node_modules/a:
  {"inode":12}
/home/user/projects/myproject/node_modules/reala:
  {"inode":12}
/home/user/projects/myproject/node_modules/reala/node_modules:
  {"inode":18}
/home/user/projects/myproject/node_modules/realb:
  {"inode":14}
/home/user/projects/myproject/node_modules/realb/node_modules:
  {"inode":20}
/home/user/projects/myproject/src:
  {"inode":8}
/home/user/projects/myproject/src/file.ts:
  {"inode":9}
/home/user/projects/myproject/tsconfig.json:
  {"inode":10}

FsWatches *deleted*::
/home/user/projects/myproject/node_modules/reala/index.d.ts:
  {"inode":13}

Timeout callback:: count: 2
5: timerToInvalidateFailedLookupResolutions *new*
6: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
5: timerToInvalidateFailedLookupResolutions
6: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Reloading new file names and options
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/user/projects/myproject/src/file.ts"]
  options: {"extendedDiagnostics":true,"traceResolution":true,"watch":true,"configFilePath":"/home/user/projects/myproject/tsconfig.json"}
File '/home/user/projects/myproject/node_modules/reala/package.json' does not exist.
File '/home/user/projects/myproject/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/user/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/home/user/projects/package.json' does not exist according to earlier cached lookups.
File '/home/user/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/user/projects/myproject/node_modules/reala/index.d.ts 250 {"synchronousWatchDirectory":true} Source file
======== Resolving module 'a' from '/home/user/projects/myproject/src/file.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'a' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/user/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.
File '/home/user/projects/myproject/node_modules/a/package.json' does not exist.
File '/home/user/projects/myproject/node_modules/a.ts' does not exist.
File '/home/user/projects/myproject/node_modules/a.tsx' does not exist.
File '/home/user/projects/myproject/node_modules/a.d.ts' does not exist.
File '/home/user/projects/myproject/node_modules/a/index.ts' does not exist.
File '/home/user/projects/myproject/node_modules/a/index.tsx' does not exist.
File '/home/user/projects/myproject/node_modules/a/index.d.ts' does not exist.
Directory '/home/user/projects/myproject/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/user/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/user/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'a' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/home/user/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.
File '/home/user/projects/myproject/node_modules/a/package.json' does not exist according to earlier cached lookups.
File '/home/user/projects/myproject/node_modules/a.js' does not exist.
File '/home/user/projects/myproject/node_modules/a.jsx' does not exist.
File '/home/user/projects/myproject/node_modules/a/index.js' does not exist.
File '/home/user/projects/myproject/node_modules/a/index.jsx' does not exist.
Directory '/home/user/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/user/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'a' was not resolved. ========
DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/node_modules 1 {"synchronousWatchDirectory":true} Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/node_modules 1 {"synchronousWatchDirectory":true} Failed Lookup Locations
FileWatcher:: Close:: WatchInfo: /home/user/projects/myproject/node_modules/reala/package.json 2000 {"synchronousWatchDirectory":true} File location affecting resolution
FileWatcher:: Close:: WatchInfo: /home/user/projects/myproject/node_modules/package.json 2000 {"synchronousWatchDirectory":true} File location affecting resolution
FileWatcher:: Close:: WatchInfo: /home/user/projects/myproject/package.json 2000 {"synchronousWatchDirectory":true} File location affecting resolution
FileWatcher:: Close:: WatchInfo: /home/user/projects/package.json 2000 {"synchronousWatchDirectory":true} File location affecting resolution
[96msrc/file.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS2307: [0mCannot find module 'a' or its corresponding type declarations.

[7m1[0m import * as a from "a"
[7m [0m [91m                   ~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/user/projects/myproject/src/file.js] file written with same contents Inode:: 22

PolledWatches::
/home/user/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/home/user/projects/node_modules: *new*
  {"pollingInterval":500}
/home/user/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/user/projects/myproject/node_modules/package.json:
  {"pollingInterval":2000}
/home/user/projects/myproject/node_modules/reala/index.d.ts:
  {"pollingInterval":250}
/home/user/projects/myproject/node_modules/reala/package.json:
  {"pollingInterval":2000}
/home/user/projects/myproject/package.json:
  {"pollingInterval":2000}
/home/user/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {"inode":3}
/home/user/projects/myproject:
  {"inode":7}
/home/user/projects/myproject/node_modules:
  {"inode":11}
/home/user/projects/myproject/node_modules/a:
  {"inode":12}
/home/user/projects/myproject/node_modules/reala:
  {"inode":12}
/home/user/projects/myproject/node_modules/reala/node_modules:
  {"inode":18}
/home/user/projects/myproject/node_modules/realb:
  {"inode":14}
/home/user/projects/myproject/node_modules/realb/node_modules:
  {"inode":20}
/home/user/projects/myproject/src:
  {"inode":8}
/home/user/projects/myproject/src/file.ts:
  {"inode":9}
/home/user/projects/myproject/tsconfig.json:
  {"inode":10}


Program root files: [
  "/home/user/projects/myproject/src/file.ts"
]
Program options: {
  "extendedDiagnostics": true,
  "traceResolution": true,
  "watch": true,
  "configFilePath": "/home/user/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/home/user/projects/myproject/src/file.ts

Semantic diagnostics in builder refreshed for::
/home/user/projects/myproject/src/file.ts

Shape signatures in builder refreshed for::
/home/user/projects/myproject/src/file.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: timeouts if any

Input::

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: timeouts if any

Input::

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/main.ts] Inode:: 5
import { foo } from "./foo"; foo();

//// [/user/username/projects/myproject/foo.d.ts] Inode:: 6
export function foo(): string;

//// [/user/username/projects/myproject/tsconfig.json] Inode:: 7
{
  "watchOptions": {
    "watchFile": "useFsEvents"
  },
  "files": [
    "foo.d.ts",
    "main.ts"
  ]
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts] Inode:: 13
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js -w --extendedDiagnostics
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /user/username/projects/myproject CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 {"watchFile":4} Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/foo.d.ts","/user/username/projects/myproject/main.ts"]
  options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo.d.ts 250 {"watchFile":4} Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main.ts 250 {"watchFile":4} Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 {"watchFile":4} Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 {"watchFile":4} Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 250 {"watchFile":4} Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"watchFile":4} Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"watchFile":4} Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 {"watchFile":4} Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 {"watchFile":4} Type roots
DirectoryWatcher:: Triggered with /user/username/projects/myproject/main.js :: WatchInfo: /user/username/projects/myproject 0 {"watchFile":4} Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/main.js :: WatchInfo: /user/username/projects/myproject 0 {"watchFile":4} Failed Lookup Locations
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/main.js] Inode:: 111
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo_1 = require("./foo");
(0, foo_1.foo)();



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {"inode":13}
/user/username/projects/myproject: *new*
  {"inode":4}
/user/username/projects/myproject/foo.d.ts: *new*
  {"inode":6}
/user/username/projects/myproject/main.ts: *new*
  {"inode":5}
/user/username/projects/myproject/tsconfig.json: *new*
  {"inode":7}

Program root files: [
  "/user/username/projects/myproject/foo.d.ts",
  "/user/username/projects/myproject/main.ts"
]
Program options: {
  "watch": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/foo.d.ts
/user/username/projects/myproject/main.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/foo.d.ts
/user/username/projects/myproject/main.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/foo.d.ts (used version)
/user/username/projects/myproject/main.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Replace file with rename event that introduces error

Input::
//// [/user/username/projects/myproject/foo.d.ts] Inode:: 112
export function foo2(): string;


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts 2:: WatchInfo: /user/username/projects/myproject/foo.d.ts 250 {"watchFile":4} Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts 2:: WatchInfo: /user/username/projects/myproject/foo.d.ts 250 {"watchFile":4} Source file
sysLog:: /user/username/projects/myproject/foo.d.ts:: Changing watcher to MissingFileSystemEntryWatcher
DirectoryWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts :: WatchInfo: /user/username/projects/myproject 0 {"watchFile":4} Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts :: WatchInfo: /user/username/projects/myproject 0 {"watchFile":4} Failed Lookup Locations
FileWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts 0:: WatchInfo: /user/username/projects/myproject/foo.d.ts 250 {"watchFile":4} Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts 0:: WatchInfo: /user/username/projects/myproject/foo.d.ts 250 {"watchFile":4} Source file
sysLog:: /user/username/projects/myproject/foo.d.ts:: Changing watcher to PresentFileSystemEntryWatcher
FileWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts 0:: WatchInfo: /user/username/projects/myproject/foo.d.ts 250 {"watchFile":4} Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts 0:: WatchInfo: /user/username/projects/myproject/foo.d.ts 250 {"watchFile":4} Source file
sysLog:: /user/username/projects/myproject/foo.d.ts:: Changing watcher to PresentFileSystemEntryWatcher
DirectoryWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts :: WatchInfo: /user/username/projects/myproject 0 {"watchFile":4} Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts :: WatchInfo: /user/username/projects/myproject 0 {"watchFile":4} Failed Lookup Locations


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":13}
/user/username/projects/myproject:
  {"inode":4}
/user/username/projects/myproject/foo.d.ts:
  {"inode":112} *new*
/user/username/projects/myproject/main.ts:
  {"inode":5}
/user/username/projects/myproject/tsconfig.json:
  {"inode":7}

FsWatches *deleted*::
/user/username/projects/myproject/foo.d.ts:
  {"inode":6}

Timeout callback:: count: 2
4: timerToUpdateProgram *new*
5: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
4: timerToUpdateProgram
5: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/foo.d.ts","/user/username/projects/myproject/main.ts"]
  options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
[96mmain.ts[0m:[93m1[0m:[93m10[0m - [91merror[0m[90m TS2724: [0m'"./foo"' has no exported member named 'foo'. Did you mean 'foo2'?

[7m1[0m import { foo } from "./foo"; foo();
[7m [0m [91m         ~~~[0m

  [96mfoo.d.ts[0m:[93m1[0m:[93m17[0m
    [7m1[0m export function foo2(): string;
    [7m [0m [96m                ~~~~[0m
    'foo2' is declared here.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/main.js] file written with same contents Inode:: 111

Timeout callback:: count: 0
5: timerToInvalidateFailedLookupResolutions *deleted*


Program root files: [
  "/user/username/projects/myproject/foo.d.ts",
  "/user/username/projects/myproject/main.ts"
]
Program options: {
  "watch": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/foo.d.ts
/user/username/projects/myproject/main.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/foo.d.ts
/user/username/projects/myproject/main.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/foo.d.ts (used version)
/user/username/projects/myproject/main.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Replace file with rename event that fixes error

Input::
//// [/user/username/projects/myproject/foo.d.ts] Inode:: 113
export function foo(): string;


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts 2:: WatchInfo: /user/username/projects/myproject/foo.d.ts 250 {"watchFile":4} Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts 2:: WatchInfo: /user/username/projects/myproject/foo.d.ts 250 {"watchFile":4} Source file
sysLog:: /user/username/projects/myproject/foo.d.ts:: Changing watcher to MissingFileSystemEntryWatcher
DirectoryWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts :: WatchInfo: /user/username/projects/myproject 0 {"watchFile":4} Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts :: WatchInfo: /user/username/projects/myproject 0 {"watchFile":4} Failed Lookup Locations
FileWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts 0:: WatchInfo: /user/username/projects/myproject/foo.d.ts 250 {"watchFile":4} Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts 0:: WatchInfo: /user/username/projects/myproject/foo.d.ts 250 {"watchFile":4} Source file
sysLog:: /user/username/projects/myproject/foo.d.ts:: Changing watcher to PresentFileSystemEntryWatcher
FileWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts 0:: WatchInfo: /user/username/projects/myproject/foo.d.ts 250 {"watchFile":4} Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts 0:: WatchInfo: /user/username/projects/myproject/foo.d.ts 250 {"watchFile":4} Source file
sysLog:: /user/username/projects/myproject/foo.d.ts:: Changing watcher to PresentFileSystemEntryWatcher
DirectoryWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts :: WatchInfo: /user/username/projects/myproject 0 {"watchFile":4} Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/foo.d.ts :: WatchInfo: /user/username/projects/myproject 0 {"watchFile":4} Failed Lookup Locations


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":13}
/user/username/projects/myproject:
  {"inode":4}
/user/username/projects/myproject/foo.d.ts:
  {"inode":113} *new*
/user/username/projects/myproject/main.ts:
  {"inode":5}
/user/username/projects/myproject/tsconfig.json:
  {"inode":7}

FsWatches *deleted*::
/user/username/projects/myproject/foo.d.ts:
  {"inode":112}

Timeout callback:: count: 2
9: timerToUpdateProgram *new*
10: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
9: timerToUpdateProgram
10: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/foo.d.ts","/user/username/projects/myproject/main.ts"]
  options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/main.js] file written with same contents Inode:: 111

Timeout callback:: count: 0
10: timerToInvalidateFailedLookupResolutions *deleted*


Program root files: [
  "/user/username/projects/myproject/foo.d.ts",
  "/user/username/projects/myproject/main.ts"
]
Program options: {
  "watch": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/foo.d.ts
/user/username/projects/myproject/main.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/foo.d.ts
/user/username/projects/myproject/main.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/foo.d.ts (used version)
/user/username/projects/myproject/main.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

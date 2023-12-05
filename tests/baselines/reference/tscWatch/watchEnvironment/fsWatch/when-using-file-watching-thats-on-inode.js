currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
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

//// [/user/username/projects/myproject/main.ts] Inode:: 8
import { foo } from "./foo"; foo();

//// [/user/username/projects/myproject/foo.d.ts] Inode:: 9
export function foo(): string;

//// [/user/username/projects/myproject/tsconfig.json] Inode:: 10
{
  "watchOptions": {
    "watchFile": "useFsEvents"
  },
  "files": [
    "foo.d.ts",
    "main.ts"
  ]
}


/a/lib/tsc.js -w --extendedDiagnostics
Output::
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

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
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 {"watchFile":4} Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"watchFile":4} Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"watchFile":4} Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 {"watchFile":4} Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 {"watchFile":4} Type roots
DirectoryWatcher:: Triggered with /user/username/projects/myproject/main.js :: WatchInfo: /user/username/projects/myproject 0 {"watchFile":4} Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/main.js :: WatchInfo: /user/username/projects/myproject 0 {"watchFile":4} Failed Lookup Locations
[[90m12:00:26 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/main.js] Inode:: 11
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
/a/lib/lib.d.ts: *new*
  {"inode":3}
/user/username/projects/myproject: *new*
  {"inode":7}
/user/username/projects/myproject/foo.d.ts: *new*
  {"inode":9}
/user/username/projects/myproject/main.ts: *new*
  {"inode":8}
/user/username/projects/myproject/tsconfig.json: *new*
  {"inode":10}

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
/a/lib/lib.d.ts
/user/username/projects/myproject/foo.d.ts
/user/username/projects/myproject/main.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/foo.d.ts
/user/username/projects/myproject/main.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/foo.d.ts (used version)
/user/username/projects/myproject/main.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Replace file with rename event that introduces error

Input::
//// [/user/username/projects/myproject/foo.d.ts] Inode:: 12
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
/a/lib/lib.d.ts:
  {"inode":3}
/user/username/projects/myproject:
  {"inode":7}
/user/username/projects/myproject/foo.d.ts:
  {"inode":12} *new*
/user/username/projects/myproject/main.ts:
  {"inode":8}
/user/username/projects/myproject/tsconfig.json:
  {"inode":10}

FsWatches *deleted*::
/user/username/projects/myproject/foo.d.ts:
  {"inode":9}

Timeout callback:: count: 2
4: timerToUpdateProgram *new*
5: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
4: timerToUpdateProgram
5: timerToInvalidateFailedLookupResolutions

After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90m12:00:30 AM[0m] File change detected. Starting incremental compilation...

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

[[90m12:00:34 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/main.js] file written with same contents Inode:: 11

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
/a/lib/lib.d.ts
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
//// [/user/username/projects/myproject/foo.d.ts] Inode:: 13
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
/a/lib/lib.d.ts:
  {"inode":3}
/user/username/projects/myproject:
  {"inode":7}
/user/username/projects/myproject/foo.d.ts:
  {"inode":13} *new*
/user/username/projects/myproject/main.ts:
  {"inode":8}
/user/username/projects/myproject/tsconfig.json:
  {"inode":10}

FsWatches *deleted*::
/user/username/projects/myproject/foo.d.ts:
  {"inode":12}

Timeout callback:: count: 2
9: timerToUpdateProgram *new*
10: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
9: timerToUpdateProgram
10: timerToInvalidateFailedLookupResolutions

After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90m12:00:38 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/foo.d.ts","/user/username/projects/myproject/main.ts"]
  options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
[[90m12:00:42 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/main.js] file written with same contents Inode:: 11

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
/a/lib/lib.d.ts
/user/username/projects/myproject/foo.d.ts
/user/username/projects/myproject/main.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/foo.d.ts
/user/username/projects/myproject/main.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/foo.d.ts (used version)
/user/username/projects/myproject/main.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

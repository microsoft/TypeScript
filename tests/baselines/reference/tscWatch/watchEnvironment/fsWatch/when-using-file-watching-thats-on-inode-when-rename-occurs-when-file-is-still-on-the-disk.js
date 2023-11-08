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

//// [/user/username/projects/myproject/foo.ts] Inode:: 9
export declare function foo(): string;

//// [/user/username/projects/myproject/tsconfig.json] Inode:: 10
{
  "watchOptions": {
    "watchFile": "useFsEvents"
  },
  "files": [
    "foo.ts",
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
  roots: ["/user/username/projects/myproject/foo.ts","/user/username/projects/myproject/main.ts"]
  options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo.ts 250 {"watchFile":4} Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main.ts 250 {"watchFile":4} Source file
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 {"watchFile":4} Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"watchFile":4} Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"watchFile":4} Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 {"watchFile":4} Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 {"watchFile":4} Type roots
[[90m12:00:28 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/foo.js] Inode:: 11
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/main.js] Inode:: 12
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
/user/username/projects/myproject/foo.ts: *new*
  {"inode":9}
/user/username/projects/myproject/main.ts: *new*
  {"inode":8}
/user/username/projects/myproject/tsconfig.json: *new*
  {"inode":10}

Program root files: [
  "/user/username/projects/myproject/foo.ts",
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
/user/username/projects/myproject/foo.ts
/user/username/projects/myproject/main.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/foo.ts
/user/username/projects/myproject/main.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/foo.ts (used version)
/user/username/projects/myproject/main.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Introduce error such that when callback happens file is already appeared

Input::
//// [/user/username/projects/myproject/foo.ts] Inode:: 13
export declare function foo2(): string;


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/foo.ts 0:: WatchInfo: /user/username/projects/myproject/foo.ts 250 {"watchFile":4} Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/foo.ts 0:: WatchInfo: /user/username/projects/myproject/foo.ts 250 {"watchFile":4} Source file
sysLog:: /user/username/projects/myproject/foo.ts:: Changing watcher to PresentFileSystemEntryWatcher


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {"inode":3}
/user/username/projects/myproject/foo.ts:
  {"inode":13} *new*
/user/username/projects/myproject/main.ts:
  {"inode":8}
/user/username/projects/myproject/tsconfig.json:
  {"inode":10}

FsWatches *deleted*::
/user/username/projects/myproject/foo.ts:
  {"inode":9}

Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90m12:00:32 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/foo.ts","/user/username/projects/myproject/main.ts"]
  options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
[96mmain.ts[0m:[93m1[0m:[93m10[0m - [91merror[0m[90m TS2724: [0m'"./foo"' has no exported member named 'foo'. Did you mean 'foo2'?

[7m1[0m import { foo } from "./foo"; foo();
[7m [0m [91m         ~~~[0m

  [96mfoo.ts[0m:[93m1[0m:[93m25[0m
    [7m1[0m export declare function foo2(): string;
    [7m [0m [96m                        ~~~~[0m
    'foo2' is declared here.

[[90m12:00:39 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/foo.js] file written with same contents Inode:: 11
//// [/user/username/projects/myproject/main.js] file written with same contents Inode:: 12


Program root files: [
  "/user/username/projects/myproject/foo.ts",
  "/user/username/projects/myproject/main.ts"
]
Program options: {
  "watch": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/foo.ts
/user/username/projects/myproject/main.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/foo.ts
/user/username/projects/myproject/main.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/foo.ts (computed .d.ts)
/user/username/projects/myproject/main.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Replace file with rename event that fixes error

Input::
//// [/user/username/projects/myproject/foo.ts] Inode:: 14
export declare function foo(): string;


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/foo.ts 2:: WatchInfo: /user/username/projects/myproject/foo.ts 250 {"watchFile":4} Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/foo.ts 2:: WatchInfo: /user/username/projects/myproject/foo.ts 250 {"watchFile":4} Source file
sysLog:: /user/username/projects/myproject/foo.ts:: Changing watcher to MissingFileSystemEntryWatcher
FileWatcher:: Triggered with /user/username/projects/myproject/foo.ts 0:: WatchInfo: /user/username/projects/myproject/foo.ts 250 {"watchFile":4} Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/foo.ts 0:: WatchInfo: /user/username/projects/myproject/foo.ts 250 {"watchFile":4} Source file
sysLog:: /user/username/projects/myproject/foo.ts:: Changing watcher to PresentFileSystemEntryWatcher
FileWatcher:: Triggered with /user/username/projects/myproject/foo.ts 0:: WatchInfo: /user/username/projects/myproject/foo.ts 250 {"watchFile":4} Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/foo.ts 0:: WatchInfo: /user/username/projects/myproject/foo.ts 250 {"watchFile":4} Source file
sysLog:: /user/username/projects/myproject/foo.ts:: Changing watcher to PresentFileSystemEntryWatcher


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {"inode":3}
/user/username/projects/myproject/foo.ts:
  {"inode":14} *new*
/user/username/projects/myproject/main.ts:
  {"inode":8}
/user/username/projects/myproject/tsconfig.json:
  {"inode":10}

FsWatches *deleted*::
/user/username/projects/myproject/foo.ts:
  {"inode":13}

Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90m12:00:43 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/foo.ts","/user/username/projects/myproject/main.ts"]
  options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
[[90m12:00:50 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/foo.js] file written with same contents Inode:: 11
//// [/user/username/projects/myproject/main.js] file written with same contents Inode:: 12


Program root files: [
  "/user/username/projects/myproject/foo.ts",
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
/user/username/projects/myproject/foo.ts
/user/username/projects/myproject/main.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/foo.ts
/user/username/projects/myproject/main.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/foo.ts (computed .d.ts)
/user/username/projects/myproject/main.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

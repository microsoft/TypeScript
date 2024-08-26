currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/lib/app.ts]
import { myapp } from "@myapp/ts-types";
const x: 10 = myapp;


//// [/user/username/projects/myproject/tsconfig.json]
{}

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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/a/lib/tsc.js --w -p . --traceResolution --extendedDiagnostics
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /user/username/projects/myproject CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/lib/app.ts"]
  options: {"watch":true,"project":"/user/username/projects/myproject","traceResolution":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/app.ts 250 undefined Source file
======== Resolving module '@myapp/ts-types' from '/user/username/projects/myproject/lib/app.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module '@myapp/ts-types' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/user/username/projects/myproject/lib/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Directory '/user/username/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Directory '/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Loading module '@myapp/ts-types' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/user/username/projects/myproject/lib/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@myapp/ts-types' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Triggered with /user/username/projects/myproject/lib/app.js :: WatchInfo: /user/username/projects/myproject/lib 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/lib/app.js :: WatchInfo: /user/username/projects/myproject/lib 1 undefined Failed Lookup Locations
[96mlib/app.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS2307: [0mCannot find module '@myapp/ts-types' or its corresponding type declarations.

[7m1[0m import { myapp } from "@myapp/ts-types";
[7m [0m [91m                      ~~~~~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory


//// [/user/username/projects/myproject/lib/app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_types_1 = require("@myapp/ts-types");
var x = ts_types_1.myapp;



PolledWatches::
/user/username/projects/myproject/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/lib/app.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/lib: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/lib/app.ts"
]
Program options: {
  "watch": true,
  "project": "/user/username/projects/myproject",
  "traceResolution": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib/app.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib/app.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/lib/app.ts (used version)

exitCode:: ExitStatus.undefined

Change:: npm install unrelated non scoped

Input::
//// [/user/username/projects/myproject/node_modules/unrelated/index.d.ts]
export const unrelated = 10;


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
sysLog:: /user/username/projects/myproject/node_modules:: Changing watcher to PresentFileSystemEntryWatcher
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/unrelated :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/unrelated :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/unrelated :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/unrelated :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/unrelated/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/unrelated/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/unrelated/index.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/unrelated/index.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/lib/app.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/lib:
  {}
/user/username/projects/myproject/node_modules: *new*
  {}

Timeout callback:: count: 2
6: timerToInvalidateFailedLookupResolutions *new*
7: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
6: timerToInvalidateFailedLookupResolutions
7: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
7: timerToUpdateProgram *deleted*
8: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
8: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Reloading new file names and options
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/lib/app.ts"]
  options: {"watch":true,"project":"/user/username/projects/myproject","traceResolution":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
======== Resolving module '@myapp/ts-types' from '/user/username/projects/myproject/lib/app.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module '@myapp/ts-types' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/user/username/projects/myproject/lib/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Directory '/user/username/projects/myproject/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Directory '/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Loading module '@myapp/ts-types' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/user/username/projects/myproject/lib/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@myapp/ts-types' was not resolved. ========
[96mlib/app.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS2307: [0mCannot find module '@myapp/ts-types' or its corresponding type declarations.

[7m1[0m import { myapp } from "@myapp/ts-types";
[7m [0m [91m                      ~~~~~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/lib/app.ts"
]
Program options: {
  "watch": true,
  "project": "/user/username/projects/myproject",
  "traceResolution": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib/app.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: npm install unrelated scoped in myapp

Input::
//// [/user/username/projects/myproject/node_modules/@myapp/unrelated/index.d.ts]
export const myappUnrelated = 10;


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/unrelated :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/unrelated :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/unrelated :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/unrelated :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/unrelated/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/unrelated/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/unrelated/index.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/unrelated/index.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory


Timeout callback:: count: 2
13: timerToInvalidateFailedLookupResolutions *new*
14: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
13: timerToInvalidateFailedLookupResolutions
14: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
14: timerToUpdateProgram *deleted*
15: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
15: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Reloading new file names and options
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/lib/app.ts"]
  options: {"watch":true,"project":"/user/username/projects/myproject","traceResolution":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
======== Resolving module '@myapp/ts-types' from '/user/username/projects/myproject/lib/app.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module '@myapp/ts-types' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/user/username/projects/myproject/lib/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
File '/user/username/projects/myproject/node_modules/@myapp/ts-types.ts' does not exist.
File '/user/username/projects/myproject/node_modules/@myapp/ts-types.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/@myapp/ts-types.d.ts' does not exist.
Directory '/user/username/projects/myproject/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Directory '/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
Loading module '@myapp/ts-types' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/user/username/projects/myproject/lib/node_modules' does not exist, skipping all lookups in it.
File '/user/username/projects/myproject/node_modules/@myapp/ts-types.js' does not exist.
File '/user/username/projects/myproject/node_modules/@myapp/ts-types.jsx' does not exist.
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@myapp/ts-types' was not resolved. ========
[96mlib/app.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS2307: [0mCannot find module '@myapp/ts-types' or its corresponding type declarations.

[7m1[0m import { myapp } from "@myapp/ts-types";
[7m [0m [91m                      ~~~~~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/lib/app.ts"
]
Program options: {
  "watch": true,
  "project": "/user/username/projects/myproject",
  "traceResolution": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib/app.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: npm install unrelated2 scoped in myapp

Input::
//// [/user/username/projects/myproject/node_modules/@myapp/unrelated2/index.d.ts]
export const myappUnrelated2 = 10;


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/unrelated2 :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/unrelated2 :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/unrelated2 :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/unrelated2 :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/unrelated2/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/unrelated2/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/unrelated2/index.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/unrelated2/index.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory


Timeout callback:: count: 2
18: timerToInvalidateFailedLookupResolutions *new*
19: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
18: timerToInvalidateFailedLookupResolutions
19: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Reloading new file names and options
Synchronizing program



Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: npm install ts-types

Input::
//// [/user/username/projects/myproject/node_modules/@myapp/ts-types/index.d.ts]
export const myapp = 10;


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/ts-types :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/ts-types :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/ts-types :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/ts-types :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/ts-types/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/ts-types/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/ts-types/index.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@myapp/ts-types/index.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory


Timeout callback:: count: 2
22: timerToInvalidateFailedLookupResolutions *new*
23: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
22: timerToInvalidateFailedLookupResolutions
23: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
23: timerToUpdateProgram *deleted*
24: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
24: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Reloading new file names and options
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/lib/app.ts"]
  options: {"watch":true,"project":"/user/username/projects/myproject","traceResolution":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
======== Resolving module '@myapp/ts-types' from '/user/username/projects/myproject/lib/app.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module '@myapp/ts-types' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/user/username/projects/myproject/lib/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'myapp__ts-types'
File '/user/username/projects/myproject/node_modules/@myapp/ts-types/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/@myapp/ts-types.ts' does not exist.
File '/user/username/projects/myproject/node_modules/@myapp/ts-types.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/@myapp/ts-types.d.ts' does not exist.
File '/user/username/projects/myproject/node_modules/@myapp/ts-types/index.ts' does not exist.
File '/user/username/projects/myproject/node_modules/@myapp/ts-types/index.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/@myapp/ts-types/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/@myapp/ts-types/index.d.ts', result '/user/username/projects/myproject/node_modules/@myapp/ts-types/index.d.ts'.
======== Module name '@myapp/ts-types' was successfully resolved to '/user/username/projects/myproject/node_modules/@myapp/ts-types/index.d.ts'. ========
File '/user/username/projects/myproject/node_modules/@myapp/ts-types/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/node_modules/@myapp/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/package.json' does not exist.
File '/user/username/projects/myproject/package.json' does not exist.
File '/user/username/projects/package.json' does not exist.
File '/user/username/package.json' does not exist.
File '/user/package.json' does not exist.
File '/package.json' does not exist.
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@myapp/ts-types/index.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@myapp/ts-types/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@myapp/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /user/username/projects/package.json 2000 undefined File location affecting resolution
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules 1 undefined Failed Lookup Locations
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/lib/app.js] file written with same contents

PolledWatches::
/user/username/projects/myproject/node_modules/@myapp/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@myapp/ts-types/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json: *new*
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/lib/app.ts:
  {}
/user/username/projects/myproject/node_modules/@myapp/ts-types/index.d.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/lib:
  {}
/user/username/projects/myproject/node_modules:
  {}


Program root files: [
  "/user/username/projects/myproject/lib/app.ts"
]
Program options: {
  "watch": true,
  "project": "/user/username/projects/myproject",
  "traceResolution": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/node_modules/@myapp/ts-types/index.d.ts
/user/username/projects/myproject/lib/app.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/node_modules/@myapp/ts-types/index.d.ts
/user/username/projects/myproject/lib/app.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/node_modules/@myapp/ts-types/index.d.ts (used version)
/user/username/projects/myproject/lib/app.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

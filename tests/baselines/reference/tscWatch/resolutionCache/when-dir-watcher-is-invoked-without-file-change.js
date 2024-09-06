currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/main.ts]
import { y } from "./app/services/generated";
const x = y;


//// [/home/src/workspaces/project/src/app/services/generated/index.ts]
export const y = 10;

//// [/home/src/workspaces/project/tsconfig.json]
{}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js --w --traceResolution --extendedDiagnostics
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /home/src/workspaces/project CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/home/src/workspaces/project/src/main.ts","/home/src/workspaces/project/src/app/services/generated/index.ts"]
  options: {"watch":true,"traceResolution":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/main.ts 250 undefined Source file
======== Resolving module './app/services/generated' from '/home/src/workspaces/project/src/main.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/app/services/generated', target file types: TypeScript, Declaration.
File '/home/src/workspaces/project/src/app/services/generated.ts' does not exist.
File '/home/src/workspaces/project/src/app/services/generated.tsx' does not exist.
File '/home/src/workspaces/project/src/app/services/generated.d.ts' does not exist.
File '/home/src/workspaces/project/src/app/services/generated/package.json' does not exist.
File '/home/src/workspaces/project/src/app/services/generated/index.ts' exists - use it as a name resolution result.
======== Module name './app/services/generated' was successfully resolved to '/home/src/workspaces/project/src/app/services/generated/index.ts'. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src 1 undefined Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/app/services/generated/index.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated/index.js :: WatchInfo: /home/src/workspaces/project/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated/index.js :: WatchInfo: /home/src/workspaces/project/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/main.js :: WatchInfo: /home/src/workspaces/project/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/main.js :: WatchInfo: /home/src/workspaces/project/src 1 undefined Failed Lookup Locations
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 1 undefined Wild card directory


//// [/home/src/workspaces/project/src/app/services/generated/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 10;


//// [/home/src/workspaces/project/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generated_1 = require("./app/services/generated");
var x = generated_1.y;



PolledWatches::
/home/src/workspaces/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/home/src/workspaces/project/src/app/services/generated/index.ts: *new*
  {}
/home/src/workspaces/project/src/main.ts: *new*
  {}
/home/src/workspaces/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/src/workspaces/project: *new*
  {}
/home/src/workspaces/project/src: *new*
  {}

Program root files: [
  "/home/src/workspaces/project/src/main.ts",
  "/home/src/workspaces/project/src/app/services/generated/index.ts"
]
Program options: {
  "watch": true,
  "traceResolution": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/src/app/services/generated/index.ts
/home/src/workspaces/project/src/main.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/src/app/services/generated/index.ts
/home/src/workspaces/project/src/main.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/src/app/services/generated/index.ts (used version)
/home/src/workspaces/project/src/main.ts (used version)

exitCode:: ExitStatus.undefined

Change:: delete folder

Input::
//// [/home/src/workspaces/project/src/app/services/generated/index.ts] deleted
//// [/home/src/workspaces/project/src/app/services/generated/index.js] deleted

Output::
DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated/index.js :: WatchInfo: /home/src/workspaces/project/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated/index.js :: WatchInfo: /home/src/workspaces/project/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated/index.js :: WatchInfo: /home/src/workspaces/project 1 undefined Wild card directory
Project: /home/src/workspaces/project/tsconfig.json Detected file add/remove of non supported extension: /home/src/workspaces/project/src/app/services/generated/index.js
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated/index.js :: WatchInfo: /home/src/workspaces/project 1 undefined Wild card directory
FileWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated/index.ts 2:: WatchInfo: /home/src/workspaces/project/src/app/services/generated/index.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated/index.ts 2:: WatchInfo: /home/src/workspaces/project/src/app/services/generated/index.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated/index.ts :: WatchInfo: /home/src/workspaces/project/src 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated/index.ts :: WatchInfo: /home/src/workspaces/project/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated/index.ts :: WatchInfo: /home/src/workspaces/project 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated/index.ts :: WatchInfo: /home/src/workspaces/project 1 undefined Wild card directory
DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated :: WatchInfo: /home/src/workspaces/project/src 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated :: WatchInfo: /home/src/workspaces/project/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated :: WatchInfo: /home/src/workspaces/project 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated :: WatchInfo: /home/src/workspaces/project 1 undefined Wild card directory


Timeout callback:: count: 2
4: timerToInvalidateFailedLookupResolutions *new*
5: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
4: timerToInvalidateFailedLookupResolutions
5: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Reloading new file names and options
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/src/main.ts"]
  options: {"watch":true,"traceResolution":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
======== Resolving module './app/services/generated' from '/home/src/workspaces/project/src/main.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/app/services/generated', target file types: TypeScript, Declaration.
File '/home/src/workspaces/project/src/app/services/generated.ts' does not exist.
File '/home/src/workspaces/project/src/app/services/generated.tsx' does not exist.
File '/home/src/workspaces/project/src/app/services/generated.d.ts' does not exist.
Directory '/home/src/workspaces/project/src/app/services/generated' does not exist, skipping all lookups in it.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/app/services/generated', target file types: JavaScript.
File '/home/src/workspaces/project/src/app/services/generated.js' does not exist.
File '/home/src/workspaces/project/src/app/services/generated.jsx' does not exist.
Directory '/home/src/workspaces/project/src/app/services/generated' does not exist, skipping all lookups in it.
======== Module name './app/services/generated' was not resolved. ========
FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/src/app/services/generated/index.ts 250 undefined Source file
[96msrc/main.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2307: [0mCannot find module './app/services/generated' or its corresponding type declarations.

[7m1[0m import { y } from "./app/services/generated";
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/workspaces/project/src/main.js] file written with same contents

PolledWatches::
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/home/src/workspaces/project/src/main.ts:
  {}
/home/src/workspaces/project/tsconfig.json:
  {}

FsWatches *deleted*::
/home/src/workspaces/project/src/app/services/generated/index.ts:
  {}

FsWatchesRecursive::
/home/src/workspaces/project:
  {}
/home/src/workspaces/project/src:
  {}

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


Program root files: [
  "/home/src/workspaces/project/src/main.ts"
]
Program options: {
  "watch": true,
  "traceResolution": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/src/main.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/src/main.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/src/main.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: generate folder

Input::
//// [/home/src/workspaces/project/src/app/services/generated/index.ts]
export const y = 10;


Output::
DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated :: WatchInfo: /home/src/workspaces/project/src 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated :: WatchInfo: /home/src/workspaces/project/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated :: WatchInfo: /home/src/workspaces/project 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated :: WatchInfo: /home/src/workspaces/project 1 undefined Wild card directory


Timeout callback:: count: 2
6: timerToInvalidateFailedLookupResolutions *new*
7: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
6: timerToInvalidateFailedLookupResolutions
7: timerToUpdateProgram

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
  roots: ["/home/src/workspaces/project/src/main.ts","/home/src/workspaces/project/src/app/services/generated/index.ts"]
  options: {"watch":true,"traceResolution":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
======== Resolving module './app/services/generated' from '/home/src/workspaces/project/src/main.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/app/services/generated', target file types: TypeScript, Declaration.
File '/home/src/workspaces/project/src/app/services/generated.ts' does not exist.
File '/home/src/workspaces/project/src/app/services/generated.tsx' does not exist.
File '/home/src/workspaces/project/src/app/services/generated.d.ts' does not exist.
File '/home/src/workspaces/project/src/app/services/generated/package.json' does not exist.
File '/home/src/workspaces/project/src/app/services/generated/index.ts' exists - use it as a name resolution result.
======== Module name './app/services/generated' was successfully resolved to '/home/src/workspaces/project/src/app/services/generated/index.ts'. ========
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/app/services/generated/index.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated/index.js :: WatchInfo: /home/src/workspaces/project/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated/index.js :: WatchInfo: /home/src/workspaces/project/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated/index.js :: WatchInfo: /home/src/workspaces/project 1 undefined Wild card directory
Project: /home/src/workspaces/project/tsconfig.json Detected file add/remove of non supported extension: /home/src/workspaces/project/src/app/services/generated/index.js
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/src/app/services/generated/index.js :: WatchInfo: /home/src/workspaces/project 1 undefined Wild card directory
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/workspaces/project/src/main.js] file written with same contents
//// [/home/src/workspaces/project/src/app/services/generated/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 10;



PolledWatches::
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/home/src/workspaces/project/src/app/services/generated/index.ts: *new*
  {}
/home/src/workspaces/project/src/main.ts:
  {}
/home/src/workspaces/project/tsconfig.json:
  {}

FsWatchesRecursive::
/home/src/workspaces/project:
  {}
/home/src/workspaces/project/src:
  {}


Program root files: [
  "/home/src/workspaces/project/src/main.ts",
  "/home/src/workspaces/project/src/app/services/generated/index.ts"
]
Program options: {
  "watch": true,
  "traceResolution": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/src/app/services/generated/index.ts
/home/src/workspaces/project/src/main.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/src/app/services/generated/index.ts
/home/src/workspaces/project/src/main.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/src/app/services/generated/index.ts (computed .d.ts)
/home/src/workspaces/project/src/main.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/src/tsconfig.json]
{
  "compilerOptions": {
    "target": "es2016",
    "module": "Node16",
    "outDir": "../out"
  }
}

//// [/user/username/projects/myproject/src/fileA.ts]
import { foo } from "./fileB.mjs";
foo();


//// [/user/username/projects/myproject/project/src/fileB.mts]
export function foo() {
}


//// [/user/username/projects/myproject/package.json]
{
  "name": "app",
  "version": "1.0.0",
  "type": "module"
}

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


/home/src/tslibs/TS/Lib/tsc.js --w --p src --extendedDiagnostics -traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /user/username/projects/myproject CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/fileA.ts"]
  options: {"target":3,"module":100,"outDir":"/user/username/projects/myproject/out","watch":true,"project":"/user/username/projects/myproject/src","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/user/username/projects/myproject/src/tsconfig.json"}
File '/user/username/projects/myproject/src/package.json' does not exist.
Found 'package.json' at '/user/username/projects/myproject/package.json'.
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/fileA.ts 250 undefined Source file
======== Resolving module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/user/username/projects/myproject/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/user/username/projects/myproject/src/fileB.mts' does not exist.
File '/user/username/projects/myproject/src/fileB.d.mts' does not exist.
File '/user/username/projects/myproject/src/fileB.mjs' does not exist.
Directory '/user/username/projects/myproject/src/fileB.mjs' does not exist, skipping all lookups in it.
======== Module name './fileB.mjs' was not resolved. ========
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Failed Lookup Locations
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2016.full.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined File location affecting resolution
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Type roots
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS2307: [0mCannot find module './fileB.mjs' or its corresponding type declarations.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../../../home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileA.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'package.json' has field "type" with value "module"
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory


//// [/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts] *Lib*

//// [/user/username/projects/myproject/out/fileA.js]
import { foo } from "./fileB.mjs";
foo();



PolledWatches::
/home/src/tslibs/TS/Lib/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/src/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/src/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts: *new*
  {}
/user/username/projects/myproject/package.json: *new*
  {}
/user/username/projects/myproject/src: *new*
  {}
/user/username/projects/myproject/src/fileA.ts: *new*
  {}
/user/username/projects/myproject/src/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/src/fileA.ts"
]
Program options: {
  "target": 3,
  "module": 100,
  "outDir": "/user/username/projects/myproject/out",
  "watch": true,
  "project": "/user/username/projects/myproject/src",
  "extendedDiagnostics": true,
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/myproject/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
/user/username/projects/myproject/src/fileA.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
/user/username/projects/myproject/src/fileA.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2016.full.d.ts (used version)
/user/username/projects/myproject/src/filea.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Modify package.json file to remove type module

Input::
//// [/user/username/projects/myproject/package.json]
{
  "name": "app",
  "version": "1.0.0"
}


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined File location affecting resolution


Timeout callback:: count: 1
1: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
1: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/fileA.ts"]
  options: {"target":3,"module":100,"outDir":"/user/username/projects/myproject/out","watch":true,"project":"/user/username/projects/myproject/src","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/user/username/projects/myproject/src/tsconfig.json"}
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Found 'package.json' at '/user/username/projects/myproject/package.json'.
File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
======== Resolving module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/user/username/projects/myproject/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/user/username/projects/myproject/src/fileB.mts' does not exist.
File '/user/username/projects/myproject/src/fileB.d.mts' does not exist.
File '/user/username/projects/myproject/src/fileB.mjs' does not exist.
File '/user/username/projects/myproject/src/fileB.mjs.ts' does not exist.
File '/user/username/projects/myproject/src/fileB.mjs.tsx' does not exist.
File '/user/username/projects/myproject/src/fileB.mjs.d.ts' does not exist.
File '/user/username/projects/myproject/src/fileB.mjs.js' does not exist.
File '/user/username/projects/myproject/src/fileB.mjs.jsx' does not exist.
Directory '/user/username/projects/myproject/src/fileB.mjs' does not exist, skipping all lookups in it.
======== Module name './fileB.mjs' was not resolved. ========
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/fileB.mjs 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/fileB.mjs 1 undefined Failed Lookup Locations
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS2307: [0mCannot find module './fileB.mjs' or its corresponding type declarations.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../../../home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileA.ts
  Matched by default include pattern '**/*'
  File is CommonJS module because 'package.json' does not have field "type"
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/out/fileA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileB_mjs_1 = require("./fileB.mjs");
(0, fileB_mjs_1.foo)();



PolledWatches::
/home/src/tslibs/TS/Lib/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/src/fileB.mjs: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/src/fileA.ts:
  {}
/user/username/projects/myproject/src/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}


Program root files: [
  "/user/username/projects/myproject/src/fileA.ts"
]
Program options: {
  "target": 3,
  "module": 100,
  "outDir": "/user/username/projects/myproject/out",
  "watch": true,
  "project": "/user/username/projects/myproject/src",
  "extendedDiagnostics": true,
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/myproject/src/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
/user/username/projects/myproject/src/fileA.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/fileA.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/src/filea.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Modify package json file to add type module

Input::
//// [/user/username/projects/myproject/package.json]
{
  "name": "app",
  "version": "1.0.0",
  "type": "module"
}


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined File location affecting resolution


Timeout callback:: count: 1
3: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
3: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/fileA.ts"]
  options: {"target":3,"module":100,"outDir":"/user/username/projects/myproject/out","watch":true,"project":"/user/username/projects/myproject/src","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/user/username/projects/myproject/src/tsconfig.json"}
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Found 'package.json' at '/user/username/projects/myproject/package.json'.
File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
======== Resolving module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/user/username/projects/myproject/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/user/username/projects/myproject/src/fileB.mts' does not exist.
File '/user/username/projects/myproject/src/fileB.d.mts' does not exist.
File '/user/username/projects/myproject/src/fileB.mjs' does not exist.
Directory '/user/username/projects/myproject/src/fileB.mjs' does not exist, skipping all lookups in it.
======== Module name './fileB.mjs' was not resolved. ========
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/fileB.mjs 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/fileB.mjs 1 undefined Failed Lookup Locations
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS2307: [0mCannot find module './fileB.mjs' or its corresponding type declarations.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../../../home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileA.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'package.json' has field "type" with value "module"
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/out/fileA.js]
import { foo } from "./fileB.mjs";
foo();



PolledWatches::
/home/src/tslibs/TS/Lib/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/src/fileB.mjs:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/src/fileA.ts:
  {}
/user/username/projects/myproject/src/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}


Program root files: [
  "/user/username/projects/myproject/src/fileA.ts"
]
Program options: {
  "target": 3,
  "module": 100,
  "outDir": "/user/username/projects/myproject/out",
  "watch": true,
  "project": "/user/username/projects/myproject/src",
  "extendedDiagnostics": true,
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/myproject/src/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
/user/username/projects/myproject/src/fileA.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/fileA.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/src/filea.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Delete package.json

Input::
//// [/user/username/projects/myproject/package.json] deleted

Output::
FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined File location affecting resolution


Timeout callback:: count: 1
5: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
5: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
6: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
6: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/fileA.ts"]
  options: {"target":3,"module":100,"outDir":"/user/username/projects/myproject/out","watch":true,"project":"/user/username/projects/myproject/src","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/user/username/projects/myproject/src/tsconfig.json"}
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' does not exist.
File '/user/username/projects/package.json' does not exist.
File '/user/username/package.json' does not exist.
File '/user/package.json' does not exist.
File '/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/user/username/projects/myproject/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/user/username/projects/myproject/src/fileB.mts' does not exist.
File '/user/username/projects/myproject/src/fileB.d.mts' does not exist.
File '/user/username/projects/myproject/src/fileB.mjs' does not exist.
File '/user/username/projects/myproject/src/fileB.mjs.ts' does not exist.
File '/user/username/projects/myproject/src/fileB.mjs.tsx' does not exist.
File '/user/username/projects/myproject/src/fileB.mjs.d.ts' does not exist.
File '/user/username/projects/myproject/src/fileB.mjs.js' does not exist.
File '/user/username/projects/myproject/src/fileB.mjs.jsx' does not exist.
Directory '/user/username/projects/myproject/src/fileB.mjs' does not exist, skipping all lookups in it.
======== Module name './fileB.mjs' was not resolved. ========
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/fileB.mjs 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/fileB.mjs 1 undefined Failed Lookup Locations
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /user/username/projects/package.json 2000 undefined File location affecting resolution
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS2307: [0mCannot find module './fileB.mjs' or its corresponding type declarations.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../../../home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileA.ts
  Matched by default include pattern '**/*'
  File is CommonJS module because 'package.json' was not found
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/out/fileA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileB_mjs_1 = require("./fileB.mjs");
(0, fileB_mjs_1.foo)();



PolledWatches::
/home/src/tslibs/TS/Lib/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/src/fileB.mjs: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/src/fileA.ts:
  {}
/user/username/projects/myproject/src/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}


Program root files: [
  "/user/username/projects/myproject/src/fileA.ts"
]
Program options: {
  "target": 3,
  "module": 100,
  "outDir": "/user/username/projects/myproject/out",
  "watch": true,
  "project": "/user/username/projects/myproject/src",
  "extendedDiagnostics": true,
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/myproject/src/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
/user/username/projects/myproject/src/fileA.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/fileA.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/src/filea.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Modify package json file to without type module

Input::
//// [/user/username/projects/myproject/package.json]
{
  "name": "app",
  "version": "1.0.0"
}


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/package.json 0:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 0:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined File location affecting resolution


Timeout callback:: count: 1
7: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
7: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
8: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
8: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/fileA.ts"]
  options: {"target":3,"module":100,"outDir":"/user/username/projects/myproject/out","watch":true,"project":"/user/username/projects/myproject/src","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/user/username/projects/myproject/src/tsconfig.json"}
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Found 'package.json' at '/user/username/projects/myproject/package.json'.
File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
Reusing resolution of module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts' of old program, it was not resolved.
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /user/username/projects/package.json 2000 undefined File location affecting resolution
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS2307: [0mCannot find module './fileB.mjs' or its corresponding type declarations.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../../../home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileA.ts
  Matched by default include pattern '**/*'
  File is CommonJS module because 'package.json' does not have field "type"
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.




PolledWatches::
/home/src/tslibs/TS/Lib/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/src/fileB.mjs:
  {"pollingInterval":500}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/src/fileA.ts:
  {}
/user/username/projects/myproject/src/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}


Program root files: [
  "/user/username/projects/myproject/src/fileA.ts"
]
Program options: {
  "target": 3,
  "module": 100,
  "outDir": "/user/username/projects/myproject/out",
  "watch": true,
  "project": "/user/username/projects/myproject/src",
  "extendedDiagnostics": true,
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/myproject/src/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
/user/username/projects/myproject/src/fileA.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Delete package.json

Input::
//// [/user/username/projects/myproject/package.json] deleted

Output::
FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined File location affecting resolution


Timeout callback:: count: 1
9: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
9: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
10: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
10: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/fileA.ts"]
  options: {"target":3,"module":100,"outDir":"/user/username/projects/myproject/out","watch":true,"project":"/user/username/projects/myproject/src","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/user/username/projects/myproject/src/tsconfig.json"}
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' does not exist.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts' of old program, it was not resolved.
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /user/username/projects/package.json 2000 undefined File location affecting resolution
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS2307: [0mCannot find module './fileB.mjs' or its corresponding type declarations.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../../../home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileA.ts
  Matched by default include pattern '**/*'
  File is CommonJS module because 'package.json' was not found
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.




PolledWatches::
/home/src/tslibs/TS/Lib/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/src/fileB.mjs:
  {"pollingInterval":500}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/src/fileA.ts:
  {}
/user/username/projects/myproject/src/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}


Program root files: [
  "/user/username/projects/myproject/src/fileA.ts"
]
Program options: {
  "target": 3,
  "module": 100,
  "outDir": "/user/username/projects/myproject/out",
  "watch": true,
  "project": "/user/username/projects/myproject/src",
  "extendedDiagnostics": true,
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/myproject/src/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
/user/username/projects/myproject/src/fileA.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

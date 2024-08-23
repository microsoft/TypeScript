currentDirectory:: /home/src/project useCaseSensitiveFileNames: false
Input::
//// [/home/src/project/tsconfig.json]
{
  "compilerOptions": {
    "noEmit": true,
    "traceResolution": true
  },
  "include": [
    "**/*.ts"
  ]
}

//// [/home/src/project/witha/node_modules/mymodule/index.d.ts]
declare module 'mymodule' {
    export function readFile(): void;
}
declare module 'mymoduleutils' {
    export function promisify(): void;
}


//// [/home/src/project/witha/a.ts]
import { readFile } from 'mymodule';
import { promisify, promisify2 } from 'mymoduleutils';
readFile();
promisify();
promisify2();


//// [/home/src/project/withb/node_modules/mymodule/index.d.ts]
declare module 'mymodule' {
    export function readFile(): void;
}
declare module 'mymoduleutils' {
    export function promisify2(): void;
}


//// [/home/src/project/withb/b.ts]
import { readFile } from 'mymodule';
import { promisify, promisify2 } from 'mymoduleutils';
readFile();
promisify();
promisify2();


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


/a/lib/tsc.js -w --extendedDiagnostics --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /home/src/project CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /home/src/project/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/home/src/project/witha/a.ts","/home/src/project/withb/b.ts"]
  options: {"noEmit":true,"traceResolution":true,"watch":true,"extendedDiagnostics":true,"explainFiles":true,"configFilePath":"/home/src/project/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /home/src/project/witha/a.ts 250 undefined Source file
======== Resolving module 'mymodule' from '/home/src/project/witha/a.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'mymodule' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/project/witha/node_modules/mymodule/package.json' does not exist.
File '/home/src/project/witha/node_modules/mymodule.ts' does not exist.
File '/home/src/project/witha/node_modules/mymodule.tsx' does not exist.
File '/home/src/project/witha/node_modules/mymodule.d.ts' does not exist.
File '/home/src/project/witha/node_modules/mymodule/index.ts' does not exist.
File '/home/src/project/witha/node_modules/mymodule/index.tsx' does not exist.
File '/home/src/project/witha/node_modules/mymodule/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/project/witha/node_modules/mymodule/index.d.ts', result '/home/src/project/witha/node_modules/mymodule/index.d.ts'.
======== Module name 'mymodule' was successfully resolved to '/home/src/project/witha/node_modules/mymodule/index.d.ts'. ========
======== Resolving module 'mymoduleutils' from '/home/src/project/witha/a.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'mymoduleutils' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/project/witha/node_modules/mymoduleutils.ts' does not exist.
File '/home/src/project/witha/node_modules/mymoduleutils.tsx' does not exist.
File '/home/src/project/witha/node_modules/mymoduleutils.d.ts' does not exist.
Directory '/home/src/project/witha/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/project/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'mymoduleutils' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/project/witha/node_modules/mymoduleutils.js' does not exist.
File '/home/src/project/witha/node_modules/mymoduleutils.jsx' does not exist.
Directory '/home/src/project/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'mymoduleutils' was not resolved. ========
File '/home/src/project/witha/node_modules/mymodule/package.json' does not exist according to earlier cached lookups.
File '/home/src/project/witha/node_modules/package.json' does not exist.
File '/home/src/project/witha/package.json' does not exist.
File '/home/src/project/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
FileWatcher:: Added:: WatchInfo: /home/src/project/witha/node_modules/mymodule/index.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/project/withb/b.ts 250 undefined Source file
======== Resolving module 'mymodule' from '/home/src/project/withb/b.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'mymodule' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/project/withb/node_modules/mymodule/package.json' does not exist.
File '/home/src/project/withb/node_modules/mymodule.ts' does not exist.
File '/home/src/project/withb/node_modules/mymodule.tsx' does not exist.
File '/home/src/project/withb/node_modules/mymodule.d.ts' does not exist.
File '/home/src/project/withb/node_modules/mymodule/index.ts' does not exist.
File '/home/src/project/withb/node_modules/mymodule/index.tsx' does not exist.
File '/home/src/project/withb/node_modules/mymodule/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/project/withb/node_modules/mymodule/index.d.ts', result '/home/src/project/withb/node_modules/mymodule/index.d.ts'.
======== Module name 'mymodule' was successfully resolved to '/home/src/project/withb/node_modules/mymodule/index.d.ts'. ========
======== Resolving module 'mymoduleutils' from '/home/src/project/withb/b.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'mymoduleutils' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/project/withb/node_modules/mymoduleutils.ts' does not exist.
File '/home/src/project/withb/node_modules/mymoduleutils.tsx' does not exist.
File '/home/src/project/withb/node_modules/mymoduleutils.d.ts' does not exist.
Directory '/home/src/project/withb/node_modules/@types' does not exist, skipping all lookups in it.
Resolution for module 'mymoduleutils' was found in cache from location '/home/src/project'.
======== Module name 'mymoduleutils' was not resolved. ========
File '/home/src/project/withb/node_modules/mymodule/package.json' does not exist according to earlier cached lookups.
File '/home/src/project/withb/node_modules/package.json' does not exist.
File '/home/src/project/withb/package.json' does not exist.
File '/home/src/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/project/withb/node_modules/mymodule/index.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /home/src/project/witha 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/project/witha 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/project/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/project/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/project/withb 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/project/withb 1 undefined Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /home/src/project/witha/node_modules/mymodule/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/project/witha/node_modules/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/project/witha/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/project/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/project/withb/node_modules/mymodule/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/project/withb/node_modules/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/project/withb/package.json 2000 undefined File location affecting resolution
DirectoryWatcher:: Added:: WatchInfo: /home/src/project/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/project/node_modules/@types 1 undefined Type roots
../../../a/lib/lib.d.ts
  Default library for target 'es5'
witha/node_modules/mymodule/index.d.ts
  Imported via 'mymodule' from file 'witha/a.ts'
witha/a.ts
  Matched by include pattern '**/*.ts' in 'tsconfig.json'
withb/node_modules/mymodule/index.d.ts
  Imported via 'mymodule' from file 'withb/b.ts'
withb/b.ts
  Matched by include pattern '**/*.ts' in 'tsconfig.json'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /home/src/project 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/project 1 undefined Wild card directory



PolledWatches::
/home/src/project/node_modules: *new*
  {"pollingInterval":500}
/home/src/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/project/package.json: *new*
  {"pollingInterval":2000}
/home/src/project/witha/node_modules/mymodule/package.json: *new*
  {"pollingInterval":2000}
/home/src/project/witha/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/project/witha/package.json: *new*
  {"pollingInterval":2000}
/home/src/project/withb/node_modules/mymodule/package.json: *new*
  {"pollingInterval":2000}
/home/src/project/withb/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/project/withb/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/home/src/project/tsconfig.json: *new*
  {}
/home/src/project/witha/a.ts: *new*
  {}
/home/src/project/witha/node_modules/mymodule/index.d.ts: *new*
  {}
/home/src/project/withb/b.ts: *new*
  {}
/home/src/project/withb/node_modules/mymodule/index.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/project: *new*
  {}
/home/src/project/witha: *new*
  {}
/home/src/project/withb: *new*
  {}

Program root files: [
  "/home/src/project/witha/a.ts",
  "/home/src/project/withb/b.ts"
]
Program options: {
  "noEmit": true,
  "traceResolution": true,
  "watch": true,
  "extendedDiagnostics": true,
  "explainFiles": true,
  "configFilePath": "/home/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/home/src/project/witha/node_modules/mymodule/index.d.ts
/home/src/project/witha/a.ts
/home/src/project/withb/node_modules/mymodule/index.d.ts
/home/src/project/withb/b.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/home/src/project/witha/node_modules/mymodule/index.d.ts
/home/src/project/witha/a.ts
/home/src/project/withb/node_modules/mymodule/index.d.ts
/home/src/project/withb/b.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/home/src/project/witha/node_modules/mymodule/index.d.ts (used version)
/home/src/project/witha/a.ts (used version)
/home/src/project/withb/node_modules/mymodule/index.d.ts (used version)
/home/src/project/withb/b.ts (used version)

exitCode:: ExitStatus.undefined

Change:: remove a file that will remove module augmentation

Input::
//// [/home/src/project/withb/b.ts]

import { promisify, promisify2 } from 'mymoduleutils';
readFile();
promisify();
promisify2();


//// [/home/src/project/withb/node_modules/mymodule/index.d.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/project/withb/b.ts 1:: WatchInfo: /home/src/project/withb/b.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/project/withb/b.ts 1:: WatchInfo: /home/src/project/withb/b.ts 250 undefined Source file
FileWatcher:: Triggered with /home/src/project/withb/node_modules/mymodule/index.d.ts 2:: WatchInfo: /home/src/project/withb/node_modules/mymodule/index.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/project/withb/node_modules/mymodule/index.d.ts 2:: WatchInfo: /home/src/project/withb/node_modules/mymodule/index.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/project/withb/node_modules/mymodule/index.d.ts :: WatchInfo: /home/src/project/withb 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/project/withb/node_modules/mymodule/index.d.ts :: WatchInfo: /home/src/project/withb 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/project/withb/node_modules/mymodule/index.d.ts :: WatchInfo: /home/src/project 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/project/withb/node_modules/mymodule/index.d.ts :: WatchInfo: /home/src/project 1 undefined Wild card directory


Timeout callback:: count: 2
3: timerToInvalidateFailedLookupResolutions *new*
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
3: timerToInvalidateFailedLookupResolutions
4: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
4: timerToUpdateProgram *deleted*
5: timerToUpdateProgram *new*


exitCode:: ExitStatus.undefined

Change:: write a file that will add augmentation

Input::
//// [/home/src/project/withb/b.ts]

import { promisify, promisify2 } from 'mymoduleutils';

promisify();
promisify2();


//// [/home/src/project/withb/node_modules/mymoduleutils/index.d.ts]
declare module 'mymoduleutils' {
    export function promisify2(): void;
}



Output::
DirectoryWatcher:: Triggered with /home/src/project/withb/node_modules/mymoduleutils :: WatchInfo: /home/src/project/withb 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/project/withb/node_modules/mymoduleutils :: WatchInfo: /home/src/project/withb 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/project/withb/node_modules/mymoduleutils :: WatchInfo: /home/src/project 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/project/withb/node_modules/mymoduleutils :: WatchInfo: /home/src/project 1 undefined Wild card directory
DirectoryWatcher:: Triggered with /home/src/project/withb/node_modules/mymoduleutils/index.d.ts :: WatchInfo: /home/src/project/withb 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/project/withb/node_modules/mymoduleutils/index.d.ts :: WatchInfo: /home/src/project/withb 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/project/withb/node_modules/mymoduleutils/index.d.ts :: WatchInfo: /home/src/project 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/project/withb/node_modules/mymoduleutils/index.d.ts :: WatchInfo: /home/src/project 1 undefined Wild card directory
FileWatcher:: Triggered with /home/src/project/withb/b.ts 1:: WatchInfo: /home/src/project/withb/b.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/project/withb/b.ts 1:: WatchInfo: /home/src/project/withb/b.ts 250 undefined Source file


Timeout callback:: count: 2
5: timerToUpdateProgram *deleted*
8: timerToInvalidateFailedLookupResolutions *new*
10: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
8: timerToInvalidateFailedLookupResolutions
10: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Reloading new file names and options
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/project/witha/a.ts","/home/src/project/withb/b.ts"]
  options: {"noEmit":true,"traceResolution":true,"watch":true,"extendedDiagnostics":true,"explainFiles":true,"configFilePath":"/home/src/project/tsconfig.json"}
File '/home/src/project/witha/node_modules/mymodule/package.json' does not exist according to earlier cached lookups.
File '/home/src/project/witha/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/project/witha/package.json' does not exist according to earlier cached lookups.
File '/home/src/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/project/withb/node_modules/mymodule/package.json' does not exist.
File '/home/src/project/withb/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/project/withb/package.json' does not exist according to earlier cached lookups.
File '/home/src/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/src/project/withb/node_modules/mymodule/index.d.ts 250 undefined Source file
Reusing resolution of module 'mymodule' from '/home/src/project/witha/a.ts' of old program, it was successfully resolved to '/home/src/project/witha/node_modules/mymodule/index.d.ts'.
======== Resolving module 'mymoduleutils' from '/home/src/project/witha/a.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'mymoduleutils' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/project/witha/node_modules/mymoduleutils.ts' does not exist.
File '/home/src/project/witha/node_modules/mymoduleutils.tsx' does not exist.
File '/home/src/project/witha/node_modules/mymoduleutils.d.ts' does not exist.
Directory '/home/src/project/witha/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/project/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'mymoduleutils' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/project/witha/node_modules/mymoduleutils.js' does not exist.
File '/home/src/project/witha/node_modules/mymoduleutils.jsx' does not exist.
Directory '/home/src/project/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'mymoduleutils' was not resolved. ========
File '/home/src/project/witha/node_modules/mymodule/package.json' does not exist according to earlier cached lookups.
File '/home/src/project/witha/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/project/witha/package.json' does not exist according to earlier cached lookups.
File '/home/src/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module 'mymoduleutils' from '/home/src/project/withb/b.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'mymoduleutils' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/project/withb/node_modules/mymoduleutils/package.json' does not exist.
File '/home/src/project/withb/node_modules/mymoduleutils.ts' does not exist.
File '/home/src/project/withb/node_modules/mymoduleutils.tsx' does not exist.
File '/home/src/project/withb/node_modules/mymoduleutils.d.ts' does not exist.
File '/home/src/project/withb/node_modules/mymoduleutils/index.ts' does not exist.
File '/home/src/project/withb/node_modules/mymoduleutils/index.tsx' does not exist.
File '/home/src/project/withb/node_modules/mymoduleutils/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/project/withb/node_modules/mymoduleutils/index.d.ts', result '/home/src/project/withb/node_modules/mymoduleutils/index.d.ts'.
======== Module name 'mymoduleutils' was successfully resolved to '/home/src/project/withb/node_modules/mymoduleutils/index.d.ts'. ========
File '/home/src/project/withb/node_modules/mymoduleutils/package.json' does not exist according to earlier cached lookups.
File '/home/src/project/withb/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/project/withb/package.json' does not exist according to earlier cached lookups.
File '/home/src/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/project/withb/node_modules/mymoduleutils/index.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/project/withb/node_modules/mymoduleutils/package.json 2000 undefined File location affecting resolution
FileWatcher:: Close:: WatchInfo: /home/src/project/withb/node_modules/mymodule/package.json 2000 undefined File location affecting resolution
../../../a/lib/lib.d.ts
  Default library for target 'es5'
witha/node_modules/mymodule/index.d.ts
  Imported via 'mymodule' from file 'witha/a.ts'
witha/a.ts
  Matched by include pattern '**/*.ts' in 'tsconfig.json'
withb/node_modules/mymoduleutils/index.d.ts
  Imported via 'mymoduleutils' from file 'withb/b.ts'
withb/b.ts
  Matched by include pattern '**/*.ts' in 'tsconfig.json'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.




PolledWatches::
/home/src/project/node_modules:
  {"pollingInterval":500}
/home/src/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/project/package.json:
  {"pollingInterval":2000}
/home/src/project/witha/node_modules/mymodule/package.json:
  {"pollingInterval":2000}
/home/src/project/witha/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/project/witha/package.json:
  {"pollingInterval":2000}
/home/src/project/withb/node_modules/mymoduleutils/package.json: *new*
  {"pollingInterval":2000}
/home/src/project/withb/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/project/withb/package.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/home/src/project/withb/node_modules/mymodule/package.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}
/home/src/project/tsconfig.json:
  {}
/home/src/project/witha/a.ts:
  {}
/home/src/project/witha/node_modules/mymodule/index.d.ts:
  {}
/home/src/project/withb/b.ts:
  {}
/home/src/project/withb/node_modules/mymoduleutils/index.d.ts: *new*
  {}

FsWatches *deleted*::
/home/src/project/withb/node_modules/mymodule/index.d.ts:
  {}

FsWatchesRecursive::
/home/src/project:
  {}
/home/src/project/witha:
  {}
/home/src/project/withb:
  {}


Program root files: [
  "/home/src/project/witha/a.ts",
  "/home/src/project/withb/b.ts"
]
Program options: {
  "noEmit": true,
  "traceResolution": true,
  "watch": true,
  "extendedDiagnostics": true,
  "explainFiles": true,
  "configFilePath": "/home/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/home/src/project/witha/node_modules/mymodule/index.d.ts
/home/src/project/witha/a.ts
/home/src/project/withb/node_modules/mymoduleutils/index.d.ts
/home/src/project/withb/b.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/home/src/project/witha/node_modules/mymodule/index.d.ts
/home/src/project/witha/a.ts
/home/src/project/withb/node_modules/mymoduleutils/index.d.ts
/home/src/project/withb/b.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/home/src/project/witha/node_modules/mymodule/index.d.ts (used version)
/home/src/project/witha/a.ts (computed .d.ts)
/home/src/project/withb/node_modules/mymoduleutils/index.d.ts (used version)
/home/src/project/withb/b.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

currentDirectory:: /home/src/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/project/packages/package1/package.json]
{
  "name": "package1",
  "version": "1.0.0",
  "main": "dist/index.js"
}

//// [/home/src/projects/project/packages/package1/tsconfig.json]
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "traceResolution": true
  },
  "exclude": [
    "tests/**/*",
    "dist/**/*"
  ]
}

//// [/home/src/projects/project/packages/package1/src/index.ts]
export type FooType = "foo";
export type BarType = "bar";


//// [/home/src/projects/project/packages/package2/package.json]
{
  "name": "package2",
  "version": "1.0.0",
  "main": "dist/index.js"
}

//// [/home/src/projects/project/packages/package2/tsconfig.json]
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "traceResolution": true
  },
  "exclude": [
    "tests/**/*",
    "dist/**/*"
  ]
}

//// [/home/src/projects/project/packages/package2/src/index.ts]
import { FooType, BarType } from "package1"
type MyFooType = FooType;
type MyBarType = BarType;


//// [/home/src/projects/project/node_modules/package1] symlink(/home/src/projects/project/packages/package1)

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


/home/src/tslibs/TS/Lib/tsc.js --w -p packages/package2 --extendedDiagnostics --explainFiles --traceResolution
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /home/src/projects/project CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/home/src/projects/project/packages/package2/src/index.ts"]
  options: {"target":3,"module":1,"rootDir":"/home/src/projects/project/packages/package2/src","declaration":true,"outDir":"/home/src/projects/project/packages/package2/dist","esModuleInterop":true,"forceConsistentCasingInFileNames":true,"strict":true,"skipLibCheck":true,"traceResolution":true,"watch":true,"project":"/home/src/projects/project/packages/package2","extendedDiagnostics":true,"explainFiles":true,"configFilePath":"/home/src/projects/project/packages/package2/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/src/index.ts 250 undefined Source file
======== Resolving module 'package1' from '/home/src/projects/project/packages/package2/src/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'package1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/project/packages/package2/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/project/packages/package2/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/home/src/projects/project/node_modules/package1/package.json'.
File '/home/src/projects/project/node_modules/package1.ts' does not exist.
File '/home/src/projects/project/node_modules/package1.tsx' does not exist.
File '/home/src/projects/project/node_modules/package1.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'dist/index.js' that references '/home/src/projects/project/node_modules/package1/dist/index.js'.
File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/package1/dist/index.js', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/package1/index.ts' does not exist.
File '/home/src/projects/project/node_modules/package1/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/package1/index.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'package1' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/home/src/projects/project/packages/package2/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/project/packages/package2/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
File '/home/src/projects/project/node_modules/package1/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/package1.js' does not exist.
File '/home/src/projects/project/node_modules/package1.jsx' does not exist.
'package.json' has 'main' field 'dist/index.js' that references '/home/src/projects/project/node_modules/package1/dist/index.js'.
File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/package1/dist/index.js', target file types: JavaScript.
File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/package1/index.js' does not exist.
File '/home/src/projects/project/node_modules/package1/index.jsx' does not exist.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Resolution of non-relative name failed; trying with '--moduleResolution bundler' to see if project may need configuration update.
Loading module 'package1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/project/packages/package2/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/project/packages/package2/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
File '/home/src/projects/project/node_modules/package1/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/package1.ts' does not exist.
File '/home/src/projects/project/node_modules/package1.tsx' does not exist.
File '/home/src/projects/project/node_modules/package1.d.ts' does not exist.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'dist/index.js' that references '/home/src/projects/project/node_modules/package1/dist/index.js'.
File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/package1/dist/index.js', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/package1/index.ts' does not exist.
File '/home/src/projects/project/node_modules/package1/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/package1/index.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'package1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2016.full.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package1/package.json 2000 undefined File location affecting resolution
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Type roots
[96mpackages/package2/src/index.ts[0m:[93m1[0m:[93m34[0m - [91merror[0m[90m TS2307: [0mCannot find module 'package1' or its corresponding type declarations.

[7m1[0m import { FooType, BarType } from "package1"
[7m [0m [91m                                 ~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
packages/package2/src/index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2 1 undefined Wild card directory


//// [/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts] *Lib*

//// [/home/src/projects/project/packages/package2/dist/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/projects/project/packages/package2/dist/index.d.ts]
export {};



PolledWatches::
/home/src/projects/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/package2/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/package2/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/packages/package1/package.json: *new*
  {}
/home/src/projects/project/packages/package2/src/index.ts: *new*
  {}
/home/src/projects/project/packages/package2/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project/node_modules: *new*
  {}
/home/src/projects/project/node_modules/package1: *new*
  {}
/home/src/projects/project/packages/package2: *new*
  {}
/home/src/projects/project/packages/package2/src: *new*
  {}

Program root files: [
  "/home/src/projects/project/packages/package2/src/index.ts"
]
Program options: {
  "target": 3,
  "module": 1,
  "rootDir": "/home/src/projects/project/packages/package2/src",
  "declaration": true,
  "outDir": "/home/src/projects/project/packages/package2/dist",
  "esModuleInterop": true,
  "forceConsistentCasingInFileNames": true,
  "strict": true,
  "skipLibCheck": true,
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/projects/project/packages/package2",
  "extendedDiagnostics": true,
  "explainFiles": true,
  "configFilePath": "/home/src/projects/project/packages/package2/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
/home/src/projects/project/packages/package2/src/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
/home/src/projects/project/packages/package2/src/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2016.full.d.ts (used version)
/home/src/projects/project/packages/package2/src/index.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: Build dependencies

Input::
//// [/home/src/projects/project/packages/package1/dist/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/projects/project/packages/package1/dist/index.d.ts]
export type FooType = "foo";
export type BarType = "bar";


//// [/home/src/projects/project/packages/package1/tsconfig.tsbuildinfo]
{"root":["./src/index.ts"],"version":"FakeTSVersion"}

//// [/home/src/projects/project/packages/package1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 53
}


Output::
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.js :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.js :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations


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
  roots: ["/home/src/projects/project/packages/package2/src/index.ts"]
  options: {"target":3,"module":1,"rootDir":"/home/src/projects/project/packages/package2/src","declaration":true,"outDir":"/home/src/projects/project/packages/package2/dist","esModuleInterop":true,"forceConsistentCasingInFileNames":true,"strict":true,"skipLibCheck":true,"traceResolution":true,"watch":true,"project":"/home/src/projects/project/packages/package2","extendedDiagnostics":true,"explainFiles":true,"configFilePath":"/home/src/projects/project/packages/package2/tsconfig.json"}
======== Resolving module 'package1' from '/home/src/projects/project/packages/package2/src/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'package1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/project/packages/package2/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/project/packages/package2/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/home/src/projects/project/node_modules/package1/package.json'.
File '/home/src/projects/project/node_modules/package1.ts' does not exist.
File '/home/src/projects/project/node_modules/package1.tsx' does not exist.
File '/home/src/projects/project/node_modules/package1.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'dist/index.js' that references '/home/src/projects/project/node_modules/package1/dist/index.js'.
File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/package1/dist/index.ts' does not exist.
File '/home/src/projects/project/node_modules/package1/dist/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/package1/dist/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/home/src/projects/project/node_modules/package1/dist/index.d.ts', result '/home/src/projects/project/packages/package1/dist/index.d.ts'.
======== Module name 'package1' was successfully resolved to '/home/src/projects/project/packages/package1/dist/index.d.ts' with Package ID 'package1/dist/index.d.ts@1.0.0'. ========
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package1/dist/index.d.ts 250 undefined Source file
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
../../tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
packages/package1/dist/index.d.ts
  Imported via "package1" from file 'packages/package2/src/index.ts' with packageId 'package1/dist/index.d.ts@1.0.0'
packages/package2/src/index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/project/packages/package2/dist/index.js] file written with same contents
//// [/home/src/projects/project/packages/package2/dist/index.d.ts] file written with same contents

PolledWatches::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/package2/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/packages/package2/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/packages/package1/dist/index.d.ts: *new*
  {}
/home/src/projects/project/packages/package1/package.json:
  {}
/home/src/projects/project/packages/package2/src/index.ts:
  {}
/home/src/projects/project/packages/package2/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project/node_modules:
  {}
/home/src/projects/project/node_modules/package1:
  {}
/home/src/projects/project/packages/package2:
  {}
/home/src/projects/project/packages/package2/src:
  {}

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


Program root files: [
  "/home/src/projects/project/packages/package2/src/index.ts"
]
Program options: {
  "target": 3,
  "module": 1,
  "rootDir": "/home/src/projects/project/packages/package2/src",
  "declaration": true,
  "outDir": "/home/src/projects/project/packages/package2/dist",
  "esModuleInterop": true,
  "forceConsistentCasingInFileNames": true,
  "strict": true,
  "skipLibCheck": true,
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/projects/project/packages/package2",
  "extendedDiagnostics": true,
  "explainFiles": true,
  "configFilePath": "/home/src/projects/project/packages/package2/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
/home/src/projects/project/packages/package1/dist/index.d.ts
/home/src/projects/project/packages/package2/src/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/project/packages/package1/dist/index.d.ts
/home/src/projects/project/packages/package2/src/index.ts

Shape signatures in builder refreshed for::
/home/src/projects/project/packages/package1/dist/index.d.ts (used version)
/home/src/projects/project/packages/package2/src/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Clean dependencies build

Input::
//// [/home/src/projects/project/packages/package1/dist/index.js] deleted
//// [/home/src/projects/project/packages/package1/dist/index.d.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/projects/project/packages/package1/dist/index.d.ts 2:: WatchInfo: /home/src/projects/project/packages/package1/dist/index.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/packages/package1/dist/index.d.ts 2:: WatchInfo: /home/src/projects/project/packages/package1/dist/index.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.js :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.js :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations


Timeout callback:: count: 2
7: timerToUpdateProgram *new*
10: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
7: timerToUpdateProgram
10: timerToInvalidateFailedLookupResolutions

After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/packages/package2/src/index.ts"]
  options: {"target":3,"module":1,"rootDir":"/home/src/projects/project/packages/package2/src","declaration":true,"outDir":"/home/src/projects/project/packages/package2/dist","esModuleInterop":true,"forceConsistentCasingInFileNames":true,"strict":true,"skipLibCheck":true,"traceResolution":true,"watch":true,"project":"/home/src/projects/project/packages/package2","extendedDiagnostics":true,"explainFiles":true,"configFilePath":"/home/src/projects/project/packages/package2/tsconfig.json"}
FileWatcher:: Close:: WatchInfo: /home/src/projects/project/packages/package1/dist/index.d.ts 250 undefined Source file
======== Resolving module 'package1' from '/home/src/projects/project/packages/package2/src/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'package1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/project/packages/package2/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/project/packages/package2/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/home/src/projects/project/node_modules/package1/package.json'.
File '/home/src/projects/project/node_modules/package1.ts' does not exist.
File '/home/src/projects/project/node_modules/package1.tsx' does not exist.
File '/home/src/projects/project/node_modules/package1.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'dist/index.js' that references '/home/src/projects/project/node_modules/package1/dist/index.js'.
File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/package1/dist/index.js', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/package1/index.ts' does not exist.
File '/home/src/projects/project/node_modules/package1/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/package1/index.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'package1' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/home/src/projects/project/packages/package2/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/project/packages/package2/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
File '/home/src/projects/project/node_modules/package1/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/package1.js' does not exist.
File '/home/src/projects/project/node_modules/package1.jsx' does not exist.
'package.json' has 'main' field 'dist/index.js' that references '/home/src/projects/project/node_modules/package1/dist/index.js'.
File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/package1/dist/index.js', target file types: JavaScript.
File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/package1/index.js' does not exist.
File '/home/src/projects/project/node_modules/package1/index.jsx' does not exist.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Resolution of non-relative name failed; trying with '--moduleResolution bundler' to see if project may need configuration update.
Loading module 'package1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/project/packages/package2/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/project/packages/package2/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
File '/home/src/projects/project/node_modules/package1/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/package1.ts' does not exist.
File '/home/src/projects/project/node_modules/package1.tsx' does not exist.
File '/home/src/projects/project/node_modules/package1.d.ts' does not exist.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'dist/index.js' that references '/home/src/projects/project/node_modules/package1/dist/index.js'.
File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/package1/dist/index.js', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/package1/index.ts' does not exist.
File '/home/src/projects/project/node_modules/package1/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/package1/index.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'package1' was not resolved. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
[96mpackages/package2/src/index.ts[0m:[93m1[0m:[93m34[0m - [91merror[0m[90m TS2307: [0mCannot find module 'package1' or its corresponding type declarations.

[7m1[0m import { FooType, BarType } from "package1"
[7m [0m [91m                                 ~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
packages/package2/src/index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/project/packages/package2/dist/index.js] file written with same contents
//// [/home/src/projects/project/packages/package2/dist/index.d.ts] file written with same contents

PolledWatches::
/home/src/projects/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/package2/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/packages/package2/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/packages/package1/package.json:
  {}
/home/src/projects/project/packages/package2/src/index.ts:
  {}
/home/src/projects/project/packages/package2/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {}

FsWatches *deleted*::
/home/src/projects/project/packages/package1/dist/index.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project/node_modules:
  {}
/home/src/projects/project/node_modules/package1:
  {}
/home/src/projects/project/packages/package2:
  {}
/home/src/projects/project/packages/package2/src:
  {}

Timeout callback:: count: 0
10: timerToInvalidateFailedLookupResolutions *deleted*


Program root files: [
  "/home/src/projects/project/packages/package2/src/index.ts"
]
Program options: {
  "target": 3,
  "module": 1,
  "rootDir": "/home/src/projects/project/packages/package2/src",
  "declaration": true,
  "outDir": "/home/src/projects/project/packages/package2/dist",
  "esModuleInterop": true,
  "forceConsistentCasingInFileNames": true,
  "strict": true,
  "skipLibCheck": true,
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/projects/project/packages/package2",
  "extendedDiagnostics": true,
  "explainFiles": true,
  "configFilePath": "/home/src/projects/project/packages/package2/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
/home/src/projects/project/packages/package2/src/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/project/packages/package2/src/index.ts

Shape signatures in builder refreshed for::
/home/src/projects/project/packages/package2/src/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Build dependencies

Input::
//// [/home/src/projects/project/packages/package1/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/projects/project/packages/package1/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/projects/project/packages/package1/dist/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/projects/project/packages/package1/dist/index.d.ts]
export type FooType = "foo";
export type BarType = "bar";



Output::
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.js :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.js :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations


Timeout callback:: count: 1
13: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
13: timerToInvalidateFailedLookupResolutions

After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
14: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
14: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/packages/package2/src/index.ts"]
  options: {"target":3,"module":1,"rootDir":"/home/src/projects/project/packages/package2/src","declaration":true,"outDir":"/home/src/projects/project/packages/package2/dist","esModuleInterop":true,"forceConsistentCasingInFileNames":true,"strict":true,"skipLibCheck":true,"traceResolution":true,"watch":true,"project":"/home/src/projects/project/packages/package2","extendedDiagnostics":true,"explainFiles":true,"configFilePath":"/home/src/projects/project/packages/package2/tsconfig.json"}
======== Resolving module 'package1' from '/home/src/projects/project/packages/package2/src/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'package1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/project/packages/package2/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/project/packages/package2/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/home/src/projects/project/node_modules/package1/package.json'.
File '/home/src/projects/project/node_modules/package1.ts' does not exist.
File '/home/src/projects/project/node_modules/package1.tsx' does not exist.
File '/home/src/projects/project/node_modules/package1.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'dist/index.js' that references '/home/src/projects/project/node_modules/package1/dist/index.js'.
File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/package1/dist/index.ts' does not exist.
File '/home/src/projects/project/node_modules/package1/dist/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/package1/dist/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/home/src/projects/project/node_modules/package1/dist/index.d.ts', result '/home/src/projects/project/packages/package1/dist/index.d.ts'.
======== Module name 'package1' was successfully resolved to '/home/src/projects/project/packages/package1/dist/index.d.ts' with Package ID 'package1/dist/index.d.ts@1.0.0'. ========
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package1/dist/index.d.ts 250 undefined Source file
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
../../tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
packages/package1/dist/index.d.ts
  Imported via "package1" from file 'packages/package2/src/index.ts' with packageId 'package1/dist/index.d.ts@1.0.0'
packages/package2/src/index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/project/packages/package2/dist/index.js] file written with same contents
//// [/home/src/projects/project/packages/package2/dist/index.d.ts] file written with same contents

PolledWatches::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/package2/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/packages/package2/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/packages/package1/dist/index.d.ts: *new*
  {}
/home/src/projects/project/packages/package1/package.json:
  {}
/home/src/projects/project/packages/package2/src/index.ts:
  {}
/home/src/projects/project/packages/package2/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project/node_modules:
  {}
/home/src/projects/project/node_modules/package1:
  {}
/home/src/projects/project/packages/package2:
  {}
/home/src/projects/project/packages/package2/src:
  {}

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


Program root files: [
  "/home/src/projects/project/packages/package2/src/index.ts"
]
Program options: {
  "target": 3,
  "module": 1,
  "rootDir": "/home/src/projects/project/packages/package2/src",
  "declaration": true,
  "outDir": "/home/src/projects/project/packages/package2/dist",
  "esModuleInterop": true,
  "forceConsistentCasingInFileNames": true,
  "strict": true,
  "skipLibCheck": true,
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/projects/project/packages/package2",
  "extendedDiagnostics": true,
  "explainFiles": true,
  "configFilePath": "/home/src/projects/project/packages/package2/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
/home/src/projects/project/packages/package1/dist/index.d.ts
/home/src/projects/project/packages/package2/src/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/project/packages/package1/dist/index.d.ts
/home/src/projects/project/packages/package2/src/index.ts

Shape signatures in builder refreshed for::
/home/src/projects/project/packages/package1/dist/index.d.ts (used version)
/home/src/projects/project/packages/package2/src/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

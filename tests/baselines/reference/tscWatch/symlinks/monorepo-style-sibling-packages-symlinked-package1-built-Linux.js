currentDirectory:: /home/src/projects/project useCaseSensitiveFileNames: false
Input::
//// [/home/src/projects/project/packages/package1/package.json] Inode:: 7
{
  "name": "package1",
  "version": "1.0.0",
  "main": "dist/index.js"
}

//// [/home/src/projects/project/packages/package1/tsconfig.json] Inode:: 8
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

//// [/home/src/projects/project/packages/package1/src/index.ts] Inode:: 10
export type FooType = "foo";
export type BarType = "bar";


//// [/home/src/projects/project/packages/package2/package.json] Inode:: 12
{
  "name": "package2",
  "version": "1.0.0",
  "main": "dist/index.js"
}

//// [/home/src/projects/project/packages/package2/tsconfig.json] Inode:: 13
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

//// [/home/src/projects/project/packages/package2/src/index.ts] Inode:: 15
import { FooType, BarType } from "package1"
type MyFooType = FooType;
type MyBarType = BarType;


//// [/home/src/projects/project/node_modules/package1] symlink(/home/src/projects/project/packages/package1) Inode:: 17
//// [/a/lib/lib.es2016.full.d.ts] Inode:: 20
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

//// [/home/src/projects/project/packages/package1/dist/index.js] Inode:: 22
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/projects/project/packages/package1/dist/index.d.ts] Inode:: 23
export type FooType = "foo";
export type BarType = "bar";



/a/lib/tsc.js --w -p packages/package2 --extendedDiagnostics
Output::
File '/home/src/projects/project/packages/package1/src/package.json' does not exist.
Found 'package.json' at '/home/src/projects/project/packages/package1/package.json'.
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /home/src/projects/project CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/home/src/projects/project/packages/package2/src/index.ts"]
  options: {"target":3,"module":1,"rootDir":"/home/src/projects/project/packages/package2/src","declaration":true,"outDir":"/home/src/projects/project/packages/package2/dist","esModuleInterop":true,"forceConsistentCasingInFileNames":true,"strict":true,"skipLibCheck":true,"traceResolution":true,"watch":true,"project":"/home/src/projects/project/packages/package2","extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/packages/package2/tsconfig.json"}
File '/home/src/projects/project/packages/package2/src/package.json' does not exist.
Found 'package.json' at '/home/src/projects/project/packages/package2/package.json'.
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
File '/home/src/projects/project/node_modules/package1/dist/index.ts' does not exist.
File '/home/src/projects/project/node_modules/package1/dist/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/package1/dist/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/home/src/projects/project/node_modules/package1/dist/index.d.ts', result '/home/src/projects/project/packages/package1/dist/index.d.ts'.
======== Module name 'package1' was successfully resolved to '/home/src/projects/project/packages/package1/dist/index.d.ts' with Package ID 'package1/dist/index.d.ts@1.0.0'. ========
File '/home/src/projects/project/packages/package1/dist/package.json' does not exist.
Found 'package.json' at '/home/src/projects/project/packages/package1/package.json'.
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package1/dist/index.d.ts 250 undefined Source file
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2016.full.d.ts 250 undefined Source file
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
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package1/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package1/dist/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/src/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/package.json 2000 undefined File location affecting resolution
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Type roots
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2 1 undefined Wild card directory


//// [/home/src/projects/project/packages/package2/dist/index.js] Inode:: 25
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/projects/project/packages/package2/dist/index.d.ts] Inode:: 26
export {};



PolledWatches::
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/package1/dist/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/packages/package2/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/package2/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/package2/src/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.es2016.full.d.ts: *new*
  {"inode":20}
/home/src/projects/project/node_modules: *new*
  {"inode":16}
/home/src/projects/project/node_modules/package1: *new*
  {"inode":6}
/home/src/projects/project/packages/package1: *new*
  {"inode":6}
/home/src/projects/project/packages/package1/dist: *new*
  {"inode":21}
/home/src/projects/project/packages/package1/dist/index.d.ts: *new*
  {"inode":23}
/home/src/projects/project/packages/package1/package.json: *new*
  {"inode":7}
/home/src/projects/project/packages/package1/src: *new*
  {"inode":9}
/home/src/projects/project/packages/package2: *new*
  {"inode":11}
/home/src/projects/project/packages/package2/dist: *new*
  {"inode":24}
/home/src/projects/project/packages/package2/package.json: *new*
  {"inode":12}
/home/src/projects/project/packages/package2/src: *new*
  {"inode":14}
/home/src/projects/project/packages/package2/src/index.ts: *new*
  {"inode":15}
/home/src/projects/project/packages/package2/tsconfig.json: *new*
  {"inode":13}

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
  "configFilePath": "/home/src/projects/project/packages/package2/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.es2016.full.d.ts
/home/src/projects/project/packages/package1/dist/index.d.ts
/home/src/projects/project/packages/package2/src/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.es2016.full.d.ts
/home/src/projects/project/packages/package1/dist/index.d.ts
/home/src/projects/project/packages/package2/src/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.es2016.full.d.ts (used version)
/home/src/projects/project/packages/package1/dist/index.d.ts (used version)
/home/src/projects/project/packages/package2/src/index.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined

Change:: Clean package1 build

Input::
//// [/home/src/projects/project/packages/package1/dist/index.js] deleted
//// [/home/src/projects/project/packages/package1/dist/index.d.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/projects/project/packages/package1/dist/index.d.ts 2:: WatchInfo: /home/src/projects/project/packages/package1/dist/index.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/packages/package1/dist/index.d.ts 2:: WatchInfo: /home/src/projects/project/packages/package1/dist/index.d.ts 250 undefined Source file
sysLog:: /home/src/projects/project/packages/package1/dist/index.d.ts:: Changing watcher to MissingFileSystemEntryWatcher
sysLog:: /home/src/projects/project/packages/package1/dist:: Changing watcher to MissingFileSystemEntryWatcher


PolledWatches::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/package1/dist: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/package1/dist/index.d.ts: *new*
  {"pollingInterval":250}
/home/src/projects/project/packages/package1/dist/package.json:
  {"pollingInterval":2000}
/home/src/projects/project/packages/package2/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/packages/package2/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/package2/src/package.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.es2016.full.d.ts:
  {"inode":20}
/home/src/projects/project/node_modules:
  {"inode":16}
/home/src/projects/project/node_modules/package1:
  {"inode":6}
/home/src/projects/project/packages/package1:
  {"inode":6}
/home/src/projects/project/packages/package1/package.json:
  {"inode":7}
/home/src/projects/project/packages/package1/src:
  {"inode":9}
/home/src/projects/project/packages/package2:
  {"inode":11}
/home/src/projects/project/packages/package2/dist:
  {"inode":24}
/home/src/projects/project/packages/package2/package.json:
  {"inode":12}
/home/src/projects/project/packages/package2/src:
  {"inode":14}
/home/src/projects/project/packages/package2/src/index.ts:
  {"inode":15}
/home/src/projects/project/packages/package2/tsconfig.json:
  {"inode":13}

FsWatches *deleted*::
/home/src/projects/project/packages/package1/dist:
  {"inode":21}
/home/src/projects/project/packages/package1/dist/index.d.ts:
  {"inode":23}

Timeout callback:: count: 2
1: timerToUpdateProgram *new*
5: timerToUpdateChildWatches *new*

Before running Timeout callback:: count: 2
1: timerToUpdateProgram
5: timerToUpdateChildWatches

After running Timeout callback:: count: 1
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/packages/package2/src/index.ts"]
  options: {"target":3,"module":1,"rootDir":"/home/src/projects/project/packages/package2/src","declaration":true,"outDir":"/home/src/projects/project/packages/package2/dist","esModuleInterop":true,"forceConsistentCasingInFileNames":true,"strict":true,"skipLibCheck":true,"traceResolution":true,"watch":true,"project":"/home/src/projects/project/packages/package2","extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/packages/package2/tsconfig.json"}
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/packages/package1/dist/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/packages/package1/package.json' exists according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/src/projects/project/packages/package1/dist/index.d.ts 250 undefined Source file
File '/home/src/projects/project/packages/package2/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/packages/package2/package.json' exists according to earlier cached lookups.
======== Resolving module 'package1' from '/home/src/projects/project/packages/package2/src/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
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
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
FileWatcher:: Close:: WatchInfo: /home/src/projects/project/packages/package1/dist/package.json 2000 undefined File location affecting resolution
[96mpackages/package2/src/index.ts[0m:[93m1[0m:[93m34[0m - [91merror[0m[90m TS2307: [0mCannot find module 'package1' or its corresponding type declarations.

[7m1[0m import { FooType, BarType } from "package1"
[7m [0m [91m                                 ~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

sysLog:: onTimerToUpdateChildWatches:: 3
sysLog:: invokingWatchers:: Elapsed:: *ms:: 0
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1 :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1 :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
sysLog:: Elapsed:: *ms:: onTimerToUpdateChildWatches:: 0 undefined


//// [/home/src/projects/project/packages/package2/dist/index.js] file written with same contents Inode:: 25
//// [/home/src/projects/project/packages/package2/dist/index.d.ts] file written with same contents Inode:: 26

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
/home/src/projects/project/packages/package2/src/package.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/home/src/projects/project/packages/package1/dist:
  {"pollingInterval":500}
/home/src/projects/project/packages/package1/dist/index.d.ts:
  {"pollingInterval":250}
/home/src/projects/project/packages/package1/dist/package.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.es2016.full.d.ts:
  {"inode":20}
/home/src/projects/project/node_modules:
  {"inode":16}
/home/src/projects/project/node_modules/package1:
  {"inode":6}
/home/src/projects/project/packages/package1:
  {"inode":6}
/home/src/projects/project/packages/package1/package.json:
  {"inode":7}
/home/src/projects/project/packages/package1/src:
  {"inode":9}
/home/src/projects/project/packages/package2:
  {"inode":11}
/home/src/projects/project/packages/package2/dist:
  {"inode":24}
/home/src/projects/project/packages/package2/package.json:
  {"inode":12}
/home/src/projects/project/packages/package2/src:
  {"inode":14}
/home/src/projects/project/packages/package2/src/index.ts:
  {"inode":15}
/home/src/projects/project/packages/package2/tsconfig.json:
  {"inode":13}

Timeout callback:: count: 1
7: timerToInvalidateFailedLookupResolutions *new*


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
  "configFilePath": "/home/src/projects/project/packages/package2/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.es2016.full.d.ts
/home/src/projects/project/packages/package2/src/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/project/packages/package2/src/index.ts

Shape signatures in builder refreshed for::
/home/src/projects/project/packages/package2/src/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: After updating childs

Input::

Before running Timeout callback:: count: 1
7: timerToInvalidateFailedLookupResolutions

After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
8: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
8: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/packages/package2/src/index.ts"]
  options: {"target":3,"module":1,"rootDir":"/home/src/projects/project/packages/package2/src","declaration":true,"outDir":"/home/src/projects/project/packages/package2/dist","esModuleInterop":true,"forceConsistentCasingInFileNames":true,"strict":true,"skipLibCheck":true,"traceResolution":true,"watch":true,"project":"/home/src/projects/project/packages/package2","extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/packages/package2/tsconfig.json"}
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/packages/package2/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/packages/package2/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/packages/package2/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/packages/package2/package.json' exists according to earlier cached lookups.
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
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[96mpackages/package2/src/index.ts[0m:[93m1[0m:[93m34[0m - [91merror[0m[90m TS2307: [0mCannot find module 'package1' or its corresponding type declarations.

[7m1[0m import { FooType, BarType } from "package1"
[7m [0m [91m                                 ~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





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
  "configFilePath": "/home/src/projects/project/packages/package2/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/a/lib/lib.es2016.full.d.ts
/home/src/projects/project/packages/package2/src/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Build package1

Input::
//// [/home/src/projects/project/packages/package1/dist/index.js] Inode:: 28
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/projects/project/packages/package1/dist/index.d.ts] Inode:: 29
export type FooType = "foo";
export type BarType = "bar";



Output::
File '/home/src/projects/project/packages/package1/src/package.json' does not exist.
Found 'package.json' at '/home/src/projects/project/packages/package1/package.json'.
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.


Timeout callback:: count: 1
10: timerToUpdateChildWatches *new*

Before running Timeout callback:: count: 1
10: timerToUpdateChildWatches

After running Timeout callback:: count: 1
Output::
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1 :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1 :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Failed Lookup Locations



PolledWatches::
/home/src/projects/node_modules:
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
/home/src/projects/project/packages/package2/src/package.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.es2016.full.d.ts:
  {"inode":20}
/home/src/projects/project/node_modules:
  {"inode":16}
/home/src/projects/project/node_modules/package1:
  {"inode":6}
/home/src/projects/project/packages/package1:
  {"inode":6}
/home/src/projects/project/packages/package1/dist: *new*
  {"inode":27}
/home/src/projects/project/packages/package1/package.json:
  {"inode":7}
/home/src/projects/project/packages/package1/src:
  {"inode":9}
/home/src/projects/project/packages/package2:
  {"inode":11}
/home/src/projects/project/packages/package2/dist:
  {"inode":24}
/home/src/projects/project/packages/package2/package.json:
  {"inode":12}
/home/src/projects/project/packages/package2/src:
  {"inode":14}
/home/src/projects/project/packages/package2/src/index.ts:
  {"inode":15}
/home/src/projects/project/packages/package2/tsconfig.json:
  {"inode":13}

Timeout callback:: count: 1
12: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
12: timerToInvalidateFailedLookupResolutions

After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
13: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
13: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/packages/package2/src/index.ts"]
  options: {"target":3,"module":1,"rootDir":"/home/src/projects/project/packages/package2/src","declaration":true,"outDir":"/home/src/projects/project/packages/package2/dist","esModuleInterop":true,"forceConsistentCasingInFileNames":true,"strict":true,"skipLibCheck":true,"traceResolution":true,"watch":true,"project":"/home/src/projects/project/packages/package2","extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/packages/package2/tsconfig.json"}
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/packages/package2/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/packages/package2/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/packages/package2/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/packages/package2/package.json' exists according to earlier cached lookups.
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
File '/home/src/projects/project/packages/package1/dist/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/packages/package1/package.json' exists according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package1/dist/index.d.ts 250 undefined Source file
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package1/dist/package.json 2000 undefined File location affecting resolution
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/project/packages/package2/dist/index.js] file written with same contents Inode:: 25
//// [/home/src/projects/project/packages/package2/dist/index.d.ts] file written with same contents Inode:: 26

PolledWatches::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/package1/dist/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/packages/package2/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/packages/package2/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/package2/src/package.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/home/src/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.es2016.full.d.ts:
  {"inode":20}
/home/src/projects/project/node_modules:
  {"inode":16}
/home/src/projects/project/node_modules/package1:
  {"inode":6}
/home/src/projects/project/packages/package1:
  {"inode":6}
/home/src/projects/project/packages/package1/dist:
  {"inode":27}
/home/src/projects/project/packages/package1/dist/index.d.ts: *new*
  {"inode":29}
/home/src/projects/project/packages/package1/package.json:
  {"inode":7}
/home/src/projects/project/packages/package1/src:
  {"inode":9}
/home/src/projects/project/packages/package2:
  {"inode":11}
/home/src/projects/project/packages/package2/dist:
  {"inode":24}
/home/src/projects/project/packages/package2/package.json:
  {"inode":12}
/home/src/projects/project/packages/package2/src:
  {"inode":14}
/home/src/projects/project/packages/package2/src/index.ts:
  {"inode":15}
/home/src/projects/project/packages/package2/tsconfig.json:
  {"inode":13}


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
  "configFilePath": "/home/src/projects/project/packages/package2/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/a/lib/lib.es2016.full.d.ts
/home/src/projects/project/packages/package1/dist/index.d.ts
/home/src/projects/project/packages/package2/src/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/project/packages/package1/dist/index.d.ts
/home/src/projects/project/packages/package2/src/index.ts

Shape signatures in builder refreshed for::
/home/src/projects/project/packages/package1/dist/index.d.ts (used version)
/home/src/projects/project/packages/package2/src/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

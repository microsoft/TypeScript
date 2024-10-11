currentDirectory:: /home/src/projects/b/2/b-impl/b useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/c/3/c-impl/c/src/c.ts]
export const c: string = 'test';

//// [/home/src/projects/c/3/c-impl/c/src/index.ts]
export * from './c';

//// [/home/src/projects/c/3/c-impl/c/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "lib",
    "declaration": true
  },
  "include": [
    "src/**/*.ts"
  ]
}

//// [/home/src/projects/c/3/c-impl/c/package.json]
{
  "name": "c",
  "version": "1.0.0",
  "types": "./lib/index.d.ts"
}

//// [/home/src/projects/c/4/unrelated/somefile.ts]
export const a: string = 'test';

//// [/home/src/projects/a/1/a-impl/a/src/a.ts]
export const a: string = 'test';

//// [/home/src/projects/a/1/a-impl/a/src/index.ts]
export * from './a';
export * from 'c';


//// [/home/src/projects/a/1/a-impl/a/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "lib",
    "declaration": true
  },
  "include": [
    "src/**/*.ts"
  ]
}

//// [/home/src/projects/a/1/a-impl/a/package.json]
{
  "name": "a",
  "version": "1.0.0",
  "types": "./lib/index.d.ts"
}

//// [/home/src/projects/a/1/a-impl/a/node_modules/c] symlink(/home/src/projects/c/3/c-impl/c)

//// [/home/src/projects/a/2/unrelated/somefile.ts]
export const a: string = 'test';

//// [/home/src/projects/b/2/b-impl/b/src/index.ts]
import { a } from 'a';

//// [/home/src/projects/b/2/b-impl/b/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "lib"
  },
  "include": [
    "src/**/*.ts"
  ]
}

//// [/home/src/projects/b/2/b-impl/b/node_modules/a] symlink(/home/src/projects/a/1/a-impl/a)

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


/home/src/tslibs/TS/Lib/tsc.js --w -p . --extendedDiagnostics --explainFiles --traceResolution
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /home/src/projects/b/2/b-impl/b CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/home/src/projects/b/2/b-impl/b/src/index.ts"]
  options: {"outDir":"/home/src/projects/b/2/b-impl/b/lib","watch":true,"project":"/home/src/projects/b/2/b-impl/b","extendedDiagnostics":true,"explainFiles":true,"traceResolution":true,"configFilePath":"/home/src/projects/b/2/b-impl/b/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/src/index.ts 250 undefined Source file
======== Resolving module 'a' from '/home/src/projects/b/2/b-impl/b/src/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'a' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/b/2/b-impl/b/src/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/home/src/projects/b/2/b-impl/b/node_modules/a/package.json'.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.ts' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.tsx' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field './lib/index.d.ts' that references '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts'.
Loading module as file / folder, candidate module location '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts', target file types: TypeScript, Declaration.
File name '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts' has a '.d.ts' extension - stripping it.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/index.ts' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/index.tsx' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/index.d.ts' does not exist.
Directory '/home/src/projects/b/2/b-impl/b/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/projects/b/2/b-impl/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/b/2/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/b/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'a' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/home/src/projects/b/2/b-impl/b/src/node_modules' does not exist, skipping all lookups in it.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/package.json' exists according to earlier cached lookups.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.js' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.jsx' does not exist.
'package.json' does not have a 'main' field.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/index.js' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/index.jsx' does not exist.
Directory '/home/src/projects/b/2/b-impl/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/b/2/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/b/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Resolution of non-relative name failed; trying with '--moduleResolution bundler' to see if project may need configuration update.
Loading module 'a' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/b/2/b-impl/b/src/node_modules' does not exist, skipping all lookups in it.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/package.json' exists according to earlier cached lookups.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.ts' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.tsx' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.d.ts' does not exist.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field './lib/index.d.ts' that references '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts'.
Loading module as file / folder, candidate module location '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts', target file types: TypeScript, Declaration.
File name '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts' has a '.d.ts' extension - stripping it.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/index.ts' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/index.tsx' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/index.d.ts' does not exist.
Directory '/home/src/projects/b/2/b-impl/b/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/projects/b/2/b-impl/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/b/2/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/b/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'a' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/package.json 2000 undefined File location affecting resolution
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Type roots
[96msrc/index.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2307: [0mCannot find module 'a' or its corresponding type declarations.

[7m1[0m import { a } from 'a';
[7m [0m [91m                  ~~~[0m

../../../../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
src/index.ts
  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/src 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/src 1 undefined Wild card directory


//// [/home/src/projects/b/2/b-impl/b/lib/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



PolledWatches::
/home/src/projects/b/2/b-impl/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/b/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/1/a-impl/a/package.json: *new*
  {}
/home/src/projects/b/2/b-impl/b/src/index.ts: *new*
  {}
/home/src/projects/b/2/b-impl/b/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/b/2/b-impl/b/node_modules: *new*
  {}
/home/src/projects/b/2/b-impl/b/node_modules/a: *new*
  {}
/home/src/projects/b/2/b-impl/b/src: *new*
  {}

Program root files: [
  "/home/src/projects/b/2/b-impl/b/src/index.ts"
]
Program options: {
  "outDir": "/home/src/projects/b/2/b-impl/b/lib",
  "watch": true,
  "project": "/home/src/projects/b/2/b-impl/b",
  "extendedDiagnostics": true,
  "explainFiles": true,
  "traceResolution": true,
  "configFilePath": "/home/src/projects/b/2/b-impl/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/b/2/b-impl/b/src/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/b/2/b-impl/b/src/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/b/2/b-impl/b/src/index.ts (used version)

exitCode:: ExitStatus.undefined

Change:: change in unrelated folder in a

Input::
//// [/home/src/projects/a/2/unrelated/somethingUnrelated.ts]
export const a = 10;


Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: change in unrelated folder in c

Input::
//// [/home/src/projects/c/4/unrelated/somethingUnrelated.ts]
export const a = 10;


Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: Build dependencies

Input::
//// [/home/src/projects/c/3/c-impl/c/lib/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = 'test';


//// [/home/src/projects/c/3/c-impl/c/lib/c.d.ts]
export declare const c: string;


//// [/home/src/projects/c/3/c-impl/c/lib/index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./c"), exports);


//// [/home/src/projects/c/3/c-impl/c/lib/index.d.ts]
export * from './c';


//// [/home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo]
{"root":["../src/c.ts","../src/index.ts"],"version":"FakeTSVersion"}

//// [/home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../src/c.ts",
    "../src/index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 68
}

//// [/home/src/projects/a/1/a-impl/a/lib/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 'test';


//// [/home/src/projects/a/1/a-impl/a/lib/a.d.ts]
export declare const a: string;


//// [/home/src/projects/a/1/a-impl/a/lib/index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./a"), exports);
__exportStar(require("c"), exports);


//// [/home/src/projects/a/1/a-impl/a/lib/index.d.ts]
export * from './a';
export * from 'c';


//// [/home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo]
{"root":["../src/a.ts","../src/index.ts"],"version":"FakeTSVersion"}

//// [/home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../src/a.ts",
    "../src/index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 68
}


Output::
DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/a.js :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/a.js :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/a.d.ts :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/a.d.ts :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.js :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.js :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations


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
  roots: ["/home/src/projects/b/2/b-impl/b/src/index.ts"]
  options: {"outDir":"/home/src/projects/b/2/b-impl/b/lib","watch":true,"project":"/home/src/projects/b/2/b-impl/b","extendedDiagnostics":true,"explainFiles":true,"traceResolution":true,"configFilePath":"/home/src/projects/b/2/b-impl/b/tsconfig.json"}
======== Resolving module 'a' from '/home/src/projects/b/2/b-impl/b/src/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'a' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/b/2/b-impl/b/src/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/home/src/projects/b/2/b-impl/b/node_modules/a/package.json'.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.ts' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.tsx' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field './lib/index.d.ts' that references '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts'.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts', result '/home/src/projects/a/1/a-impl/a/lib/index.d.ts'.
======== Module name 'a' was successfully resolved to '/home/src/projects/a/1/a-impl/a/lib/index.d.ts' with Package ID 'a/lib/index.d.ts@1.0.0'. ========
FileWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/index.d.ts 250 undefined Source file
======== Resolving module './a' from '/home/src/projects/a/1/a-impl/a/lib/index.d.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/home/src/projects/a/1/a-impl/a/lib/a', target file types: TypeScript, Declaration.
File '/home/src/projects/a/1/a-impl/a/lib/a.ts' does not exist.
File '/home/src/projects/a/1/a-impl/a/lib/a.tsx' does not exist.
File '/home/src/projects/a/1/a-impl/a/lib/a.d.ts' exists - use it as a name resolution result.
======== Module name './a' was successfully resolved to '/home/src/projects/a/1/a-impl/a/lib/a.d.ts'. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
======== Resolving module 'c' from '/home/src/projects/a/1/a-impl/a/lib/index.d.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'c' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/a/1/a-impl/a/lib/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/home/src/projects/a/1/a-impl/a/node_modules/c/package.json'.
File '/home/src/projects/a/1/a-impl/a/node_modules/c.ts' does not exist.
File '/home/src/projects/a/1/a-impl/a/node_modules/c.tsx' does not exist.
File '/home/src/projects/a/1/a-impl/a/node_modules/c.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field './lib/index.d.ts' that references '/home/src/projects/a/1/a-impl/a/node_modules/c/lib/index.d.ts'.
File '/home/src/projects/a/1/a-impl/a/node_modules/c/lib/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/home/src/projects/a/1/a-impl/a/node_modules/c/lib/index.d.ts', result '/home/src/projects/c/3/c-impl/c/lib/index.d.ts'.
======== Module name 'c' was successfully resolved to '/home/src/projects/c/3/c-impl/c/lib/index.d.ts' with Package ID 'c/lib/index.d.ts@1.0.0'. ========
FileWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/a.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/index.d.ts 250 undefined Source file
======== Resolving module './c' from '/home/src/projects/c/3/c-impl/c/lib/index.d.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/home/src/projects/c/3/c-impl/c/lib/c', target file types: TypeScript, Declaration.
File '/home/src/projects/c/3/c-impl/c/lib/c.ts' does not exist.
File '/home/src/projects/c/3/c-impl/c/lib/c.tsx' does not exist.
File '/home/src/projects/c/3/c-impl/c/lib/c.d.ts' exists - use it as a name resolution result.
======== Module name './c' was successfully resolved to '/home/src/projects/c/3/c-impl/c/lib/c.d.ts'. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/c.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/node_modules 1 undefined Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /home/src/projects/c/3/c-impl/c/package.json 2000 undefined File location affecting resolution
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
../../../../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
../../../../a/1/a-impl/a/lib/a.d.ts
  Imported via './a' from file '../../../../a/1/a-impl/a/lib/index.d.ts'
../../../../c/3/c-impl/c/lib/c.d.ts
  Imported via './c' from file '../../../../c/3/c-impl/c/lib/index.d.ts'
../../../../c/3/c-impl/c/lib/index.d.ts
  Imported via 'c' from file '../../../../a/1/a-impl/a/lib/index.d.ts' with packageId 'c/lib/index.d.ts@1.0.0'
../../../../a/1/a-impl/a/lib/index.d.ts
  Imported via 'a' from file 'src/index.ts' with packageId 'a/lib/index.d.ts@1.0.0'
src/index.ts
  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/b/2/b-impl/b/lib/index.js] file written with same contents

PolledWatches::
/home/src/projects/a/1/a-impl/a/lib/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/b/2/b-impl/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/node_modules:
  {"pollingInterval":500}
/home/src/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/1/a-impl/a/lib/a.d.ts: *new*
  {}
/home/src/projects/a/1/a-impl/a/lib/index.d.ts: *new*
  {}
/home/src/projects/a/1/a-impl/a/package.json:
  {}
/home/src/projects/b/2/b-impl/b/src/index.ts:
  {}
/home/src/projects/b/2/b-impl/b/tsconfig.json:
  {}
/home/src/projects/c/3/c-impl/c/lib/c.d.ts: *new*
  {}
/home/src/projects/c/3/c-impl/c/lib/index.d.ts: *new*
  {}
/home/src/projects/c/3/c-impl/c/package.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/a: *new*
  {}
/home/src/projects/a/1/a-impl/a/node_modules: *new*
  {}
/home/src/projects/b/2/b-impl/b/node_modules:
  {}
/home/src/projects/b/2/b-impl/b/src:
  {}
/home/src/projects/c: *new*
  {}

FsWatchesRecursive *deleted*::
/home/src/projects/b/2/b-impl/b/node_modules/a:
  {}

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


Program root files: [
  "/home/src/projects/b/2/b-impl/b/src/index.ts"
]
Program options: {
  "outDir": "/home/src/projects/b/2/b-impl/b/lib",
  "watch": true,
  "project": "/home/src/projects/b/2/b-impl/b",
  "extendedDiagnostics": true,
  "explainFiles": true,
  "traceResolution": true,
  "configFilePath": "/home/src/projects/b/2/b-impl/b/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/1/a-impl/a/lib/a.d.ts
/home/src/projects/c/3/c-impl/c/lib/c.d.ts
/home/src/projects/c/3/c-impl/c/lib/index.d.ts
/home/src/projects/a/1/a-impl/a/lib/index.d.ts
/home/src/projects/b/2/b-impl/b/src/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/a/1/a-impl/a/lib/a.d.ts
/home/src/projects/c/3/c-impl/c/lib/c.d.ts
/home/src/projects/c/3/c-impl/c/lib/index.d.ts
/home/src/projects/a/1/a-impl/a/lib/index.d.ts
/home/src/projects/b/2/b-impl/b/src/index.ts

Shape signatures in builder refreshed for::
/home/src/projects/a/1/a-impl/a/lib/a.d.ts (used version)
/home/src/projects/a/1/a-impl/a/lib/index.d.ts (used version)
/home/src/projects/b/2/b-impl/b/src/index.ts (computed .d.ts)
/home/src/projects/c/3/c-impl/c/lib/c.d.ts (used version)
/home/src/projects/c/3/c-impl/c/lib/index.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: change in unrelated folder in a

Input::
//// [/home/src/projects/a/2/unrelated/anotherFile.ts]
export const a = 10;


Output::
DirectoryWatcher:: Triggered with /home/src/projects/a/2/unrelated/anotherFile.ts :: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/a/2/unrelated/anotherFile.ts :: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations


Timeout callback:: count: 1
9: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
9: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: change in unrelated folder in c

Input::
//// [/home/src/projects/c/4/unrelated/anotherFile.ts]
export const a = 10;


Output::
DirectoryWatcher:: Triggered with /home/src/projects/c/4/unrelated/anotherFile.ts :: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/c/4/unrelated/anotherFile.ts :: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations


Timeout callback:: count: 1
10: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
10: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: Clean dependencies build

Input::
//// [/home/src/projects/c/3/c-impl/c/lib/c.js] deleted
//// [/home/src/projects/c/3/c-impl/c/lib/c.d.ts] deleted
//// [/home/src/projects/c/3/c-impl/c/lib/index.js] deleted
//// [/home/src/projects/c/3/c-impl/c/lib/index.d.ts] deleted
//// [/home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo] deleted
//// [/home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo.readable.baseline.txt] deleted
//// [/home/src/projects/a/1/a-impl/a/lib/a.js] deleted
//// [/home/src/projects/a/1/a-impl/a/lib/a.d.ts] deleted
//// [/home/src/projects/a/1/a-impl/a/lib/index.js] deleted
//// [/home/src/projects/a/1/a-impl/a/lib/index.d.ts] deleted
//// [/home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo] deleted
//// [/home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo.readable.baseline.txt] deleted

Output::
FileWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/c.d.ts 2:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/c.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/c.d.ts 2:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/c.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/c.d.ts :: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/c.d.ts :: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/c.js :: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/c.js :: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
FileWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/index.d.ts 2:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/index.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/index.d.ts 2:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/index.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/index.d.ts :: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/index.d.ts :: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/index.js :: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/index.js :: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib :: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib :: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
FileWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/a.d.ts 2:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/a.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/a.d.ts 2:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/a.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/a.d.ts :: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/a.d.ts :: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/a.js :: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/a.js :: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
FileWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/index.d.ts 2:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/index.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/index.d.ts 2:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/index.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/index.d.ts :: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/index.d.ts :: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/index.js :: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/index.js :: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib :: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib :: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations


Timeout callback:: count: 2
23: timerToUpdateProgram *new*
28: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
23: timerToUpdateProgram
28: timerToInvalidateFailedLookupResolutions

After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/b/2/b-impl/b/src/index.ts"]
  options: {"outDir":"/home/src/projects/b/2/b-impl/b/lib","watch":true,"project":"/home/src/projects/b/2/b-impl/b","extendedDiagnostics":true,"explainFiles":true,"traceResolution":true,"configFilePath":"/home/src/projects/b/2/b-impl/b/tsconfig.json"}
FileWatcher:: Close:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/a.d.ts 250 undefined Source file
======== Resolving module 'a' from '/home/src/projects/b/2/b-impl/b/src/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'a' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/b/2/b-impl/b/src/node_modules' does not exist, skipping all lookups in it.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/package.json' exists according to earlier cached lookups.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.ts' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.tsx' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.d.ts' does not exist.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field './lib/index.d.ts' that references '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts'.
Loading module as file / folder, candidate module location '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts', target file types: TypeScript, Declaration.
File name '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts' has a '.d.ts' extension - stripping it.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/index.ts' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/index.tsx' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/index.d.ts' does not exist.
Directory '/home/src/projects/b/2/b-impl/b/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/projects/b/2/b-impl/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/b/2/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/b/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'a' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/home/src/projects/b/2/b-impl/b/src/node_modules' does not exist, skipping all lookups in it.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/package.json' exists according to earlier cached lookups.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.js' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.jsx' does not exist.
'package.json' does not have a 'main' field.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/index.js' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/index.jsx' does not exist.
Directory '/home/src/projects/b/2/b-impl/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/b/2/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/b/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Resolution of non-relative name failed; trying with '--moduleResolution bundler' to see if project may need configuration update.
Loading module 'a' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/b/2/b-impl/b/src/node_modules' does not exist, skipping all lookups in it.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/package.json' exists according to earlier cached lookups.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.ts' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.tsx' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.d.ts' does not exist.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field './lib/index.d.ts' that references '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts'.
Loading module as file / folder, candidate module location '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts', target file types: TypeScript, Declaration.
File name '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts' has a '.d.ts' extension - stripping it.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/index.ts' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/index.tsx' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/index.d.ts' does not exist.
Directory '/home/src/projects/b/2/b-impl/b/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/projects/b/2/b-impl/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/b/2/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/b/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'a' was not resolved. ========
FileWatcher:: Close:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/c.d.ts 250 undefined Source file
FileWatcher:: Close:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/index.d.ts 250 undefined Source file
FileWatcher:: Close:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/index.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/a/1/a-impl/a/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/a/1/a-impl/a/node_modules 1 undefined Failed Lookup Locations
FileWatcher:: Close:: WatchInfo: /home/src/projects/c/3/c-impl/c/package.json 2000 undefined File location affecting resolution
[96msrc/index.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2307: [0mCannot find module 'a' or its corresponding type declarations.

[7m1[0m import { a } from 'a';
[7m [0m [91m                  ~~~[0m

../../../../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
src/index.ts
  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/b/2/b-impl/b/lib/index.js] file written with same contents

PolledWatches::
/home/src/projects/b/2/b-impl/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/a/1/a-impl/a/lib/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/1/a-impl/a/package.json:
  {}
/home/src/projects/b/2/b-impl/b/src/index.ts:
  {}
/home/src/projects/b/2/b-impl/b/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatches *deleted*::
/home/src/projects/a/1/a-impl/a/lib/a.d.ts:
  {}
/home/src/projects/a/1/a-impl/a/lib/index.d.ts:
  {}
/home/src/projects/c/3/c-impl/c/lib/c.d.ts:
  {}
/home/src/projects/c/3/c-impl/c/lib/index.d.ts:
  {}
/home/src/projects/c/3/c-impl/c/package.json:
  {}

FsWatchesRecursive::
/home/src/projects/b/2/b-impl/b/node_modules:
  {}
/home/src/projects/b/2/b-impl/b/node_modules/a: *new*
  {}
/home/src/projects/b/2/b-impl/b/src:
  {}

FsWatchesRecursive *deleted*::
/home/src/projects/a:
  {}
/home/src/projects/a/1/a-impl/a/node_modules:
  {}
/home/src/projects/c:
  {}

Timeout callback:: count: 0
28: timerToInvalidateFailedLookupResolutions *deleted*


Program root files: [
  "/home/src/projects/b/2/b-impl/b/src/index.ts"
]
Program options: {
  "outDir": "/home/src/projects/b/2/b-impl/b/lib",
  "watch": true,
  "project": "/home/src/projects/b/2/b-impl/b",
  "extendedDiagnostics": true,
  "explainFiles": true,
  "traceResolution": true,
  "configFilePath": "/home/src/projects/b/2/b-impl/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/b/2/b-impl/b/src/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/b/2/b-impl/b/src/index.ts

Shape signatures in builder refreshed for::
/home/src/projects/b/2/b-impl/b/src/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Build dependencies

Input::
//// [/home/src/projects/c/3/c-impl/c/lib/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = 'test';


//// [/home/src/projects/c/3/c-impl/c/lib/c.d.ts]
export declare const c: string;


//// [/home/src/projects/c/3/c-impl/c/lib/index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./c"), exports);


//// [/home/src/projects/c/3/c-impl/c/lib/index.d.ts]
export * from './c';


//// [/home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo]
{"root":["../src/c.ts","../src/index.ts"],"version":"FakeTSVersion"}

//// [/home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../src/c.ts",
    "../src/index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 68
}

//// [/home/src/projects/a/1/a-impl/a/lib/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 'test';


//// [/home/src/projects/a/1/a-impl/a/lib/a.d.ts]
export declare const a: string;


//// [/home/src/projects/a/1/a-impl/a/lib/index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./a"), exports);
__exportStar(require("c"), exports);


//// [/home/src/projects/a/1/a-impl/a/lib/index.d.ts]
export * from './a';
export * from 'c';


//// [/home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo]
{"root":["../src/a.ts","../src/index.ts"],"version":"FakeTSVersion"}

//// [/home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../src/a.ts",
    "../src/index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 68
}


Output::
DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/a.js :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/a.js :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/a.d.ts :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/a.d.ts :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.js :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.js :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a/lib/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations


Timeout callback:: count: 1
35: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
35: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
36: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
36: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/b/2/b-impl/b/src/index.ts"]
  options: {"outDir":"/home/src/projects/b/2/b-impl/b/lib","watch":true,"project":"/home/src/projects/b/2/b-impl/b","extendedDiagnostics":true,"explainFiles":true,"traceResolution":true,"configFilePath":"/home/src/projects/b/2/b-impl/b/tsconfig.json"}
======== Resolving module 'a' from '/home/src/projects/b/2/b-impl/b/src/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'a' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/b/2/b-impl/b/src/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/home/src/projects/b/2/b-impl/b/node_modules/a/package.json'.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.ts' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.tsx' does not exist.
File '/home/src/projects/b/2/b-impl/b/node_modules/a.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field './lib/index.d.ts' that references '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts'.
File '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/home/src/projects/b/2/b-impl/b/node_modules/a/lib/index.d.ts', result '/home/src/projects/a/1/a-impl/a/lib/index.d.ts'.
======== Module name 'a' was successfully resolved to '/home/src/projects/a/1/a-impl/a/lib/index.d.ts' with Package ID 'a/lib/index.d.ts@1.0.0'. ========
FileWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/index.d.ts 250 undefined Source file
======== Resolving module './a' from '/home/src/projects/a/1/a-impl/a/lib/index.d.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/home/src/projects/a/1/a-impl/a/lib/a', target file types: TypeScript, Declaration.
File '/home/src/projects/a/1/a-impl/a/lib/a.ts' does not exist.
File '/home/src/projects/a/1/a-impl/a/lib/a.tsx' does not exist.
File '/home/src/projects/a/1/a-impl/a/lib/a.d.ts' exists - use it as a name resolution result.
======== Module name './a' was successfully resolved to '/home/src/projects/a/1/a-impl/a/lib/a.d.ts'. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a 1 undefined Failed Lookup Locations
======== Resolving module 'c' from '/home/src/projects/a/1/a-impl/a/lib/index.d.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'c' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/a/1/a-impl/a/lib/node_modules' does not exist, skipping all lookups in it.
File '/home/src/projects/a/1/a-impl/a/node_modules/c/package.json' exists according to earlier cached lookups.
File '/home/src/projects/a/1/a-impl/a/node_modules/c.ts' does not exist.
File '/home/src/projects/a/1/a-impl/a/node_modules/c.tsx' does not exist.
File '/home/src/projects/a/1/a-impl/a/node_modules/c.d.ts' does not exist.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field './lib/index.d.ts' that references '/home/src/projects/a/1/a-impl/a/node_modules/c/lib/index.d.ts'.
File '/home/src/projects/a/1/a-impl/a/node_modules/c/lib/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/a/1/a-impl/a/node_modules/c/lib/index.d.ts', result '/home/src/projects/c/3/c-impl/c/lib/index.d.ts'.
======== Module name 'c' was successfully resolved to '/home/src/projects/c/3/c-impl/c/lib/index.d.ts' with Package ID 'c/lib/index.d.ts@1.0.0'. ========
FileWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/a.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/index.d.ts 250 undefined Source file
======== Resolving module './c' from '/home/src/projects/c/3/c-impl/c/lib/index.d.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/home/src/projects/c/3/c-impl/c/lib/c', target file types: TypeScript, Declaration.
File '/home/src/projects/c/3/c-impl/c/lib/c.ts' does not exist.
File '/home/src/projects/c/3/c-impl/c/lib/c.tsx' does not exist.
File '/home/src/projects/c/3/c-impl/c/lib/c.d.ts' exists - use it as a name resolution result.
======== Module name './c' was successfully resolved to '/home/src/projects/c/3/c-impl/c/lib/c.d.ts'. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/c 1 undefined Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/c.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/node_modules 1 undefined Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /home/src/projects/c/3/c-impl/c/package.json 2000 undefined File location affecting resolution
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
../../../../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
../../../../a/1/a-impl/a/lib/a.d.ts
  Imported via './a' from file '../../../../a/1/a-impl/a/lib/index.d.ts'
../../../../c/3/c-impl/c/lib/c.d.ts
  Imported via './c' from file '../../../../c/3/c-impl/c/lib/index.d.ts'
../../../../c/3/c-impl/c/lib/index.d.ts
  Imported via 'c' from file '../../../../a/1/a-impl/a/lib/index.d.ts' with packageId 'c/lib/index.d.ts@1.0.0'
../../../../a/1/a-impl/a/lib/index.d.ts
  Imported via 'a' from file 'src/index.ts' with packageId 'a/lib/index.d.ts@1.0.0'
src/index.ts
  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/b/2/b-impl/b/lib/index.js] file written with same contents

PolledWatches::
/home/src/projects/a/1/a-impl/a/lib/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/b/2/b-impl/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/node_modules:
  {"pollingInterval":500}
/home/src/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/1/a-impl/a/lib/a.d.ts: *new*
  {}
/home/src/projects/a/1/a-impl/a/lib/index.d.ts: *new*
  {}
/home/src/projects/a/1/a-impl/a/package.json:
  {}
/home/src/projects/b/2/b-impl/b/src/index.ts:
  {}
/home/src/projects/b/2/b-impl/b/tsconfig.json:
  {}
/home/src/projects/c/3/c-impl/c/lib/c.d.ts: *new*
  {}
/home/src/projects/c/3/c-impl/c/lib/index.d.ts: *new*
  {}
/home/src/projects/c/3/c-impl/c/package.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/a: *new*
  {}
/home/src/projects/a/1/a-impl/a/node_modules: *new*
  {}
/home/src/projects/b/2/b-impl/b/node_modules:
  {}
/home/src/projects/b/2/b-impl/b/src:
  {}
/home/src/projects/c: *new*
  {}

FsWatchesRecursive *deleted*::
/home/src/projects/b/2/b-impl/b/node_modules/a:
  {}

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


Program root files: [
  "/home/src/projects/b/2/b-impl/b/src/index.ts"
]
Program options: {
  "outDir": "/home/src/projects/b/2/b-impl/b/lib",
  "watch": true,
  "project": "/home/src/projects/b/2/b-impl/b",
  "extendedDiagnostics": true,
  "explainFiles": true,
  "traceResolution": true,
  "configFilePath": "/home/src/projects/b/2/b-impl/b/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/1/a-impl/a/lib/a.d.ts
/home/src/projects/c/3/c-impl/c/lib/c.d.ts
/home/src/projects/c/3/c-impl/c/lib/index.d.ts
/home/src/projects/a/1/a-impl/a/lib/index.d.ts
/home/src/projects/b/2/b-impl/b/src/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/a/1/a-impl/a/lib/a.d.ts
/home/src/projects/c/3/c-impl/c/lib/c.d.ts
/home/src/projects/c/3/c-impl/c/lib/index.d.ts
/home/src/projects/a/1/a-impl/a/lib/index.d.ts
/home/src/projects/b/2/b-impl/b/src/index.ts

Shape signatures in builder refreshed for::
/home/src/projects/a/1/a-impl/a/lib/a.d.ts (used version)
/home/src/projects/a/1/a-impl/a/lib/index.d.ts (used version)
/home/src/projects/b/2/b-impl/b/src/index.ts (computed .d.ts)
/home/src/projects/c/3/c-impl/c/lib/c.d.ts (used version)
/home/src/projects/c/3/c-impl/c/lib/index.d.ts (used version)

exitCode:: ExitStatus.undefined

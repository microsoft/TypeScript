currentDirectory:: /user/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "types": []
  },
  "files": [
    "app.ts"
  ],
  "references": [
    {
      "path": "./lib"
    }
  ]
}

//// [/user/username/projects/project/app.ts]
import { one } from './lib';
console.log(one);


//// [/user/username/projects/project/lib/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "types": []
  },
  "files": [
    "index.ts"
  ]
}

//// [/user/username/projects/project/lib/tsconfig.base.json]
{
  "compilerOptions": {
    "composite": true,
    "types": []
  }
}

//// [/user/username/projects/project/lib/index.ts]
export const one = 1;

//// [/user/username/projects/project/lib/index.d.ts]
export const one = 1;

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


/home/src/tslibs/TS/Lib/tsc.js --w -p . --extendedDiagnostics
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /user/username/projects/project CaseSensitiveFileNames: false
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/project/app.ts"]
  options: {"types":[],"extendedDiagnostics":true,"configFilePath":"/user/username/projects/project/tsconfig.json"}
  projectReferences: [{"path":"/user/username/projects/project/lib","originalPath":"./lib"}]
Loading config file: /user/username/projects/project/lib/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/project/app.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/lib 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/lib 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project 0 undefined Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /user/username/projects/project/lib/index.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /user/username/projects/project/app.js :: WatchInfo: /user/username/projects/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/project/app.js :: WatchInfo: /user/username/projects/project 0 undefined Failed Lookup Locations
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

FileWatcher:: Added:: WatchInfo: /user/username/projects/project/lib/tsconfig.json 2000 undefined Config file of referened project


//// [/user/username/projects/project/app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib");
console.log(lib_1.one);



FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/project: *new*
  {}
/user/username/projects/project/app.ts: *new*
  {}
/user/username/projects/project/lib/index.d.ts: *new*
  {}
/user/username/projects/project/lib/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/project/lib: *new*
  {}

Program root files: [
  "/user/username/projects/project/app.ts"
]
Program options: {
  "types": [],
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/lib/index.d.ts
/user/username/projects/project/app.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/lib/index.d.ts
/user/username/projects/project/app.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/project/lib/index.d.ts (used version)
/user/username/projects/project/app.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Modify lib tsconfig

Input::
//// [/user/username/projects/project/lib/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "files": [
    "index.ts"
  ]
}


Output::
FileWatcher:: Triggered with /user/username/projects/project/lib/tsconfig.json 1:: WatchInfo: /user/username/projects/project/lib/tsconfig.json 2000 undefined Config file of referened project
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/project/lib/tsconfig.json 1:: WatchInfo: /user/username/projects/project/lib/tsconfig.json 2000 undefined Config file of referened project


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
Loading config file: /user/username/projects/project/lib/tsconfig.json
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/project/app.ts"]
  options: {"types":[],"extendedDiagnostics":true,"configFilePath":"/user/username/projects/project/tsconfig.json"}
  projectReferences: [{"path":"/user/username/projects/project/lib","originalPath":"./lib"}]
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.





Program root files: [
  "/user/username/projects/project/app.ts"
]
Program options: {
  "types": [],
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/lib/index.d.ts
/user/username/projects/project/app.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

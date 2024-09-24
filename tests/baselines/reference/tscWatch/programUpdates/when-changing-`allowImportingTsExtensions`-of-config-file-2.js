currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/a.ts]
export const foo = 10;

//// [/user/username/projects/myproject/b.ts]
export * as a from "./a.ts";

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "noEmit": true,
    "allowImportingTsExtensions": false
  }
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


/home/src/tslibs/TS/Lib/tsc.js -w -p . --extendedDiagnostics
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /user/username/projects/myproject CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts"]
  options: {"noEmit":true,"allowImportingTsExtensions":false,"watch":true,"project":"/user/username/projects/myproject","extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Type roots
[96mb.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS5097: [0mAn import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled.

[7m1[0m export * as a from "./a.ts";
[7m [0m [91m                   ~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/a.ts: *new*
  {}
/user/username/projects/myproject/b.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "noEmit": true,
  "allowImportingTsExtensions": false,
  "watch": true,
  "project": "/user/username/projects/myproject",
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/a.ts (used version)
/user/username/projects/myproject/b.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Change allowImportingTsExtensions to true

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "noEmit": true,
    "allowImportingTsExtensions": true
  }
}


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Config file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Config file


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Reloading config file: /user/username/projects/myproject/tsconfig.json
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts"]
  options: {"noEmit":true,"allowImportingTsExtensions":true,"watch":true,"project":"/user/username/projects/myproject","extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "noEmit": true,
  "allowImportingTsExtensions": true,
  "watch": true,
  "project": "/user/username/projects/myproject",
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

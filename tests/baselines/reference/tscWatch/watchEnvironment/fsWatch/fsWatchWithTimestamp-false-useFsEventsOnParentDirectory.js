currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/main.ts]
export const x = 10;

//// [/user/username/projects/myproject/tsconfig.json]
{
  "files": [
    "main.ts"
  ]
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


/home/src/tslibs/TS/Lib/tsc.js -w --extendedDiagnostics --watchFile useFsEventsOnParentDirectory
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /user/username/projects/myproject CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 {"watchFile":5} Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/main.ts"]
  options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main.ts 250 {"watchFile":5} Source file
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 250 {"watchFile":5} Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"watchFile":5} Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"watchFile":5} Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 {"watchFile":5} Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 {"watchFile":5} Type roots
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib: *new*
  {}
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/main.ts"
]
Program options: {
  "watch": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/main.ts (used version)

exitCode:: ExitStatus.undefined

Change:: emulate access

Input::

Output::
FileWatcher:: Triggered with /user/username/projects/myproject/main.ts 1:: WatchInfo: /user/username/projects/myproject/main.ts 250 {"watchFile":5} Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/main.ts 1:: WatchInfo: /user/username/projects/myproject/main.ts 250 {"watchFile":5} Source file


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program




exitCode:: ExitStatus.undefined

Change:: modify file contents

Input::
//// [/user/username/projects/myproject/main.ts]
export const x = 10;export const y = 10;


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/main.ts 1:: WatchInfo: /user/username/projects/myproject/main.ts 250 {"watchFile":5} Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/main.ts 1:: WatchInfo: /user/username/projects/myproject/main.ts 250 {"watchFile":5} Source file


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
  roots: ["/user/username/projects/myproject/main.ts"]
  options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = exports.x = void 0;
exports.x = 10;
exports.y = 10;




Program root files: [
  "/user/username/projects/myproject/main.ts"
]
Program options: {
  "watch": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/main.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/main.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

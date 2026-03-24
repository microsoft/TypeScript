currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/main.ts] Inode:: 5
export const x = 10;

//// [/user/username/projects/myproject/tsconfig.json] Inode:: 6
{
  "files": [
    "main.ts"
  ]
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts] Inode:: 12
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
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts 250 {"watchFile":5} Source file
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib* Inode:: 14

//// [/user/username/projects/myproject/main.js] Inode:: 120
export const x = 10;



FsWatches::
/home/src/tslibs/TS/Lib: *new*
  {"inode":11}
/user/username/projects/myproject: *new*
  {"inode":4}

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
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/main.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/main.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/user/username/projects/myproject/main.ts (used version)

exitCode:: ExitStatus.undefined

Change:: emulate access

Input::

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: modify file contents

Input::
//// [/user/username/projects/myproject/main.ts] Inode:: 5
export const x = 10;export const y = 10;


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
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/main.ts"]
  options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/main.js] Inode:: 120
export const x = 10;
export const y = 10;




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
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/main.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/main.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/main.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

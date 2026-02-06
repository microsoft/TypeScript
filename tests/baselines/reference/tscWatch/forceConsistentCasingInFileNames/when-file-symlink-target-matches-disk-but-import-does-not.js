currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/XY.ts]

export const a = 1;
export const b = 2;


//// [/user/username/projects/myproject/link.ts] symlink(/user/username/projects/myproject/Xy.ts)

//// [/user/username/projects/myproject/b.ts]

import { a } from "./XY";
import { b } from "./link";

a;b;


//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true
  }
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js --w --p . --explainFiles --extendedDiagnostics
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /user/username/projects/myproject CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/XY.ts","/user/username/projects/myproject/b.ts","/user/username/projects/myproject/link.ts"]
  options: {"forceConsistentCasingInFileNames":true,"watch":true,"project":"/user/username/projects/myproject","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/XY.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/link.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts 250 undefined Source file
../../../../home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
  Default library for target 'es2025'
XY.ts
  Matched by default include pattern '**/*'
  Imported via "./XY" from file 'b.ts'
link.ts
  Imported via "./link" from file 'b.ts'
  Matched by default include pattern '**/*'
b.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory


//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/user/username/projects/myproject/XY.js]
export const a = 1;
export const b = 2;


//// [/user/username/projects/myproject/link.js]
export const a = 1;
export const b = 2;


//// [/user/username/projects/myproject/b.js]
import { a } from "./XY";
import { b } from "./link";
a;
b;



FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {}
/user/username/projects/myproject/XY.ts: *new*
  {}
/user/username/projects/myproject/b.ts: *new*
  {}
/user/username/projects/myproject/link.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/XY.ts",
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/link.ts"
]
Program options: {
  "forceConsistentCasingInFileNames": true,
  "watch": true,
  "project": "/user/username/projects/myproject",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/XY.ts
/user/username/projects/myproject/link.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/XY.ts
/user/username/projects/myproject/link.ts
/user/username/projects/myproject/b.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/user/username/projects/myproject/xy.ts (used version)
/user/username/projects/myproject/link.ts (used version)
/user/username/projects/myproject/b.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Prepend a line to moduleA

Input::
//// [/user/username/projects/myproject/XY.ts]
// some comment
                        
export const a = 1;
export const b = 2;



Output::
FileWatcher:: Triggered with /user/username/projects/myproject/XY.ts 1:: WatchInfo: /user/username/projects/myproject/XY.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/XY.ts 1:: WatchInfo: /user/username/projects/myproject/XY.ts 250 undefined Source file
FileWatcher:: Triggered with /user/username/projects/myproject/link.ts 1:: WatchInfo: /user/username/projects/myproject/link.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/link.ts 1:: WatchInfo: /user/username/projects/myproject/link.ts 250 undefined Source file


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
  roots: ["/user/username/projects/myproject/XY.ts","/user/username/projects/myproject/b.ts","/user/username/projects/myproject/link.ts"]
  options: {"forceConsistentCasingInFileNames":true,"watch":true,"project":"/user/username/projects/myproject","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
../../../../home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
  Default library for target 'es2025'
XY.ts
  Matched by default include pattern '**/*'
  Imported via "./XY" from file 'b.ts'
link.ts
  Imported via "./link" from file 'b.ts'
  Matched by default include pattern '**/*'
b.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/XY.js]
// some comment
export const a = 1;
export const b = 2;


//// [/user/username/projects/myproject/link.js]
// some comment
export const a = 1;
export const b = 2;


//// [/user/username/projects/myproject/b.js] file written with same contents


Program root files: [
  "/user/username/projects/myproject/XY.ts",
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/link.ts"
]
Program options: {
  "forceConsistentCasingInFileNames": true,
  "watch": true,
  "project": "/user/username/projects/myproject",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/XY.ts
/user/username/projects/myproject/link.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/XY.ts
/user/username/projects/myproject/link.ts
/user/username/projects/myproject/b.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/xy.ts (computed .d.ts)
/user/username/projects/myproject/b.ts (computed .d.ts)
/user/username/projects/myproject/link.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

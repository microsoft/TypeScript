currentDirectory:: /user/username/projects/project useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/project/main.ts]
let a: string = "Hello"

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


/a/lib/tsc.js -w main.ts --extendedDiagnostics
Output::
[[90m12:00:19 AM[0m] Starting compilation in watch mode...

Current directory: /user/username/projects/project CaseSensitiveFileNames: false
Synchronizing program
CreatingProgramWith::
  roots: ["main.ts"]
  options: {"watch":true,"extendedDiagnostics":true}
FileWatcher:: Added:: WatchInfo: main.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Type roots
[[90m12:00:22 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/project/main.js]
var a = "Hello";



PolledWatches::
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/project/main.ts: *new*
  {}

Program root files: [
  "main.ts"
]
Program options: {
  "watch": true,
  "extendedDiagnostics": true
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
main.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
main.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/project/main.ts (used version)

exitCode:: ExitStatus.undefined

Change:: change main.ts

Input::
//// [/user/username/projects/project/main.ts]
let a: string = "Hello World"


Output::
FileWatcher:: Triggered with main.ts 1:: WatchInfo: main.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with main.ts 1:: WatchInfo: main.ts 250 undefined Source file


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90m12:00:26 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["main.ts"]
  options: {"watch":true,"extendedDiagnostics":true}
[[90m12:00:30 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/project/main.js]
var a = "Hello World";




Program root files: [
  "main.ts"
]
Program options: {
  "watch": true,
  "extendedDiagnostics": true
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
main.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
main.ts

Shape signatures in builder refreshed for::
/user/username/projects/project/main.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: receive another change event without modifying the file

Input::

Output::
FileWatcher:: Triggered with main.ts 1:: WatchInfo: main.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with main.ts 1:: WatchInfo: main.ts 250 undefined Source file


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
Synchronizing program




exitCode:: ExitStatus.undefined

Change:: change main.ts to empty text

Input::
//// [/user/username/projects/project/main.ts]



Output::
FileWatcher:: Triggered with main.ts 1:: WatchInfo: main.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with main.ts 1:: WatchInfo: main.ts 250 undefined Source file


Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90m12:00:34 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["main.ts"]
  options: {"watch":true,"extendedDiagnostics":true}
[[90m12:00:38 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/project/main.js]




Program root files: [
  "main.ts"
]
Program options: {
  "watch": true,
  "extendedDiagnostics": true
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
main.ts

Semantic diagnostics in builder refreshed for::
main.ts

Shape signatures in builder refreshed for::
/user/username/projects/project/main.ts (used version)

exitCode:: ExitStatus.undefined

Change:: receive another change event without modifying the file

Input::

Output::
FileWatcher:: Triggered with main.ts 1:: WatchInfo: main.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with main.ts 1:: WatchInfo: main.ts 250 undefined Source file


Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
Synchronizing program




exitCode:: ExitStatus.undefined

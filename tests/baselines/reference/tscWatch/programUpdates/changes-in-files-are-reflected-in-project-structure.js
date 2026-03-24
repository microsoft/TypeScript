currentDirectory:: /user/username/workspace/solution/projects useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/f1.ts]
export * from "./f2"

//// [/user/username/workspace/solution/projects/project/f2.ts]
export let x = 1

//// [/user/username/workspace/solution/projects/projectc/f3.ts]
export let y = 1;

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


/home/src/tslibs/TS/Lib/tsc.js -w /user/username/workspace/solution/projects/project/f1.ts --explainFiles
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

../../../../../home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
  Default library for target 'es2025'
project/f2.ts
  Imported via "./f2" from file 'project/f1.ts'
project/f1.ts
  Root file specified for compilation
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/user/username/workspace/solution/projects/project/f2.js]
export let x = 1;


//// [/user/username/workspace/solution/projects/project/f1.js]
export * from "./f2";



FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {}
/user/username/workspace/solution/projects/project/f1.ts: *new*
  {}
/user/username/workspace/solution/projects/project/f2.ts: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/project/f1.ts"
]
Program options: {
  "watch": true,
  "explainFiles": true
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/project/f2.ts
/user/username/workspace/solution/projects/project/f1.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/project/f2.ts
/user/username/workspace/solution/projects/project/f1.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/user/username/workspace/solution/projects/project/f2.ts (used version)
/user/username/workspace/solution/projects/project/f1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Modify f2 to include f3

Input::
//// [/user/username/workspace/solution/projects/project/f2.ts]
export * from "../projectc/f3"


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

../../../../../home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
  Default library for target 'es2025'
projectc/f3.ts
  Imported via "../projectc/f3" from file 'project/f2.ts'
project/f2.ts
  Imported via "./f2" from file 'project/f1.ts'
project/f1.ts
  Root file specified for compilation
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/f2.js]
export * from "../projectc/f3";


//// [/user/username/workspace/solution/projects/project/f1.js] file written with same contents
//// [/user/username/workspace/solution/projects/projectc/f3.js]
export let y = 1;



FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts:
  {}
/user/username/workspace/solution/projects/project/f1.ts:
  {}
/user/username/workspace/solution/projects/project/f2.ts:
  {}
/user/username/workspace/solution/projects/projectc/f3.ts: *new*
  {}


Program root files: [
  "/user/username/workspace/solution/projects/project/f1.ts"
]
Program options: {
  "watch": true,
  "explainFiles": true
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/projectc/f3.ts
/user/username/workspace/solution/projects/project/f2.ts
/user/username/workspace/solution/projects/project/f1.ts

Semantic diagnostics in builder refreshed for::
/user/username/workspace/solution/projects/projectc/f3.ts
/user/username/workspace/solution/projects/project/f2.ts
/user/username/workspace/solution/projects/project/f1.ts

Shape signatures in builder refreshed for::
/user/username/workspace/solution/projects/projectc/f3.ts (computed .d.ts)
/user/username/workspace/solution/projects/project/f2.ts (computed .d.ts)
/user/username/workspace/solution/projects/project/f1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

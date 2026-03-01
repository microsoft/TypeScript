currentDirectory:: /user/username/workspace/solution/projects useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/f1.ts]
export * from "./f2"

//// [/user/username/workspace/solution/projects/project/f2.ts]
export * from "../projectc/f3"

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


/home/src/tslibs/TS/Lib/tsc.js -w /user/username/workspace/solution/projects/project/f1.ts --noImplicitAny
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/user/username/workspace/solution/projects/projectc/f3.js]
export let y = 1;


//// [/user/username/workspace/solution/projects/project/f2.js]
export * from "../projectc/f3";


//// [/user/username/workspace/solution/projects/project/f1.js]
export * from "./f2";



FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {}
/user/username/workspace/solution/projects/project/f1.ts: *new*
  {}
/user/username/workspace/solution/projects/project/f2.ts: *new*
  {}
/user/username/workspace/solution/projects/projectc/f3.ts: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/project/f1.ts"
]
Program options: {
  "watch": true,
  "noImplicitAny": true
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/projectc/f3.ts
/user/username/workspace/solution/projects/project/f2.ts
/user/username/workspace/solution/projects/project/f1.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/projectc/f3.ts
/user/username/workspace/solution/projects/project/f2.ts
/user/username/workspace/solution/projects/project/f1.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/user/username/workspace/solution/projects/projectc/f3.ts (used version)
/user/username/workspace/solution/projects/project/f2.ts (used version)
/user/username/workspace/solution/projects/project/f1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Delete f2

Input::
//// [/user/username/workspace/solution/projects/project/f2.ts] deleted

Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mproject/f1.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module './f2'. '/user/username/workspace/solution/projects/project/f2.js' implicitly has an 'any' type.

[7m1[0m export * from "./f2"
[7m [0m [91m              ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/f1.js] file written with same contents

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts:
  {}
/user/username/workspace/solution/projects/project/f1.ts:
  {}

FsWatches *deleted*::
/user/username/workspace/solution/projects/project/f2.ts:
  {}
/user/username/workspace/solution/projects/projectc/f3.ts:
  {}

FsWatchesRecursive::
/user/username/workspace/solution/projects/project: *new*
  {}


Program root files: [
  "/user/username/workspace/solution/projects/project/f1.ts"
]
Program options: {
  "watch": true,
  "noImplicitAny": true
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/project/f1.ts

Semantic diagnostics in builder refreshed for::
/user/username/workspace/solution/projects/project/f1.ts

Shape signatures in builder refreshed for::
/user/username/workspace/solution/projects/project/f1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

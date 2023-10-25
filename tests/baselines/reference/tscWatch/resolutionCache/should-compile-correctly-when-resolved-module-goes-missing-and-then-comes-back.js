currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/users/username/projects/project/foo.ts]
import {x} from "bar"

//// [/users/username/projects/project/bar.d.ts]
export const y = 1;export const x = 10;

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


/a/lib/tsc.js --w /users/username/projects/project/foo.ts
Output::
>> Screen clear
[[90m12:00:21 AM[0m] Starting compilation in watch mode...

[[90m12:00:24 AM[0m] Found 0 errors. Watching for file changes.



Program root files: [
  "/users/username/projects/project/foo.ts"
]
Program options: {
  "module": 2
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/bar.d.ts
/users/username/projects/project/foo.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/bar.d.ts
/users/username/projects/project/foo.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/users/username/projects/project/bar.d.ts (used version)
/users/username/projects/project/foo.ts (used version)

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/users/username/projects/project/bar.d.ts: *new*
  {}
/users/username/projects/project/foo.ts: *new*
  {}

FsWatchesRecursive::
/users/username/projects: *new*
  {}

exitCode:: ExitStatus.undefined

//// [/users/username/projects/project/foo.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});



Change:: Delete imported file

Input::
//// [/users/username/projects/project/bar.d.ts] deleted

Before running Timeout callback:: count: 2
1: timerToUpdateProgram
2: timerToInvalidateFailedLookupResolutions
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:26 AM[0m] File change detected. Starting incremental compilation...

[96musers/username/projects/project/foo.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS2792: [0mCannot find module 'bar'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?

[7m1[0m import {x} from "bar"
[7m [0m [91m                ~~~~~[0m

[[90m12:00:30 AM[0m] Found 1 error. Watching for file changes.



Program root files: [
  "/users/username/projects/project/foo.ts"
]
Program options: {
  "module": 2
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/foo.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/foo.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/foo.ts (computed .d.ts)

FsWatches::
/a/lib/lib.d.ts:
  {}
/users/username/projects/project/foo.ts:
  {}

FsWatches *deleted*::
/users/username/projects/project/bar.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects:
  {}

exitCode:: ExitStatus.undefined

//// [/users/username/projects/project/foo.js] file written with same contents

Change:: Create imported file

Input::
//// [/users/username/projects/project/bar.d.ts]
export const y = 1;export const x = 10;


Before running Timeout callback:: count: 1
3: timerToInvalidateFailedLookupResolutions
After running Timeout callback:: count: 1
4: timerToUpdateProgram
Before running Timeout callback:: count: 1
4: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:33 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:37 AM[0m] Found 0 errors. Watching for file changes.



Program root files: [
  "/users/username/projects/project/foo.ts"
]
Program options: {
  "module": 2
}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/bar.d.ts
/users/username/projects/project/foo.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/bar.d.ts
/users/username/projects/project/foo.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/bar.d.ts (used version)
/users/username/projects/project/foo.ts (computed .d.ts)

FsWatches::
/a/lib/lib.d.ts:
  {}
/users/username/projects/project/bar.d.ts: *new*
  {}
/users/username/projects/project/foo.ts:
  {}

FsWatchesRecursive::
/users/username/projects:
  {}

exitCode:: ExitStatus.undefined

//// [/users/username/projects/project/foo.js] file written with same contents

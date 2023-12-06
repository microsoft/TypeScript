currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/users/username/projects/project/file1.ts]
import * as T from "./moduleFile"; T.bar();

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


/a/lib/tsc.js -w /users/username/projects/project/file1.ts
Output::
>> Screen clear
[[90m12:00:19 AM[0m] Starting compilation in watch mode...

[96musers/username/projects/project/file1.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS2307: [0mCannot find module './moduleFile' or its corresponding type declarations.

[7m1[0m import * as T from "./moduleFile"; T.bar();
[7m [0m [91m                   ~~~~~~~~~~~~~~[0m

[[90m12:00:22 AM[0m] Found 1 error. Watching for file changes.



//// [/users/username/projects/project/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = require("./moduleFile");
T.bar();



FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/users/username/projects/project/file1.ts: *new*
  {}

FsWatchesRecursive::
/users/username/projects: *new*
  {}

Program root files: [
  "/users/username/projects/project/file1.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/file1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/file1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/users/username/projects/project/file1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Create module file

Input::
//// [/users/username/projects/project/moduleFile.ts]
export function bar() { }


Timeout callback:: count: 1
1: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
1: timerToInvalidateFailedLookupResolutions

After running Timeout callback:: count: 1

Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:25 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:31 AM[0m] Found 0 errors. Watching for file changes.



//// [/users/username/projects/project/file1.js] file written with same contents
//// [/users/username/projects/project/moduleFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = void 0;
function bar() { }
exports.bar = bar;



FsWatches::
/a/lib/lib.d.ts:
  {}
/users/username/projects/project/file1.ts:
  {}
/users/username/projects/project/moduleFile.ts: *new*
  {}

FsWatchesRecursive *deleted*::
/users/username/projects:
  {}


Program root files: [
  "/users/username/projects/project/file1.ts"
]
Program options: {
  "watch": true
}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/moduleFile.ts
/users/username/projects/project/file1.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/moduleFile.ts
/users/username/projects/project/file1.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/modulefile.ts (computed .d.ts)
/users/username/projects/project/file1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

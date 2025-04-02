currentDirectory:: /users/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/users/username/projects/project/moduleFile.ts]
export function bar() { };

//// [/users/username/projects/project/file1.ts]
import * as T from "./moduleFile"; T.bar();

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


/home/src/tslibs/TS/Lib/tsc.js -w /users/username/projects/project/file1.ts
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/users/username/projects/project/moduleFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = bar;
function bar() { }
;


//// [/users/username/projects/project/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = require("./moduleFile");
T.bar();



PolledWatches::
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/users/username/projects/project/file1.ts: *new*
  {}
/users/username/projects/project/moduleFile.ts: *new*
  {}

Program root files: [
  "/users/username/projects/project/file1.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/moduleFile.ts
/users/username/projects/project/file1.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/moduleFile.ts
/users/username/projects/project/file1.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/users/username/projects/project/modulefile.ts (used version)
/users/username/projects/project/file1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Rename moduleFile to moduleFile1

Input::
//// [/users/username/projects/project/moduleFile1.ts]
export function bar() { };

//// [/users/username/projects/project/moduleFile.ts] deleted
//// [/users/username/projects/project/moduleFile.js] deleted

Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mfile1.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS2307: [0mCannot find module './moduleFile' or its corresponding type declarations.

[7m1[0m import * as T from "./moduleFile"; T.bar();
[7m [0m [91m                   ~~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/users/username/projects/project/file1.js] file written with same contents

PolledWatches::
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/moduleFile: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/projects/project: *new*
  {}
/users/username/projects/project/file1.ts:
  {}

FsWatches *deleted*::
/users/username/projects/project/moduleFile.ts:
  {}

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


Program root files: [
  "/users/username/projects/project/file1.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/file1.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/file1.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/file1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Rename moduleFile1 back to moduleFile

Input::
//// [/users/username/projects/project/moduleFile.ts]
export function bar() { };

//// [/users/username/projects/project/moduleFile1.ts] deleted

Timeout callback:: count: 1
3: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
3: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/users/username/projects/project/file1.js] file written with same contents
//// [/users/username/projects/project/moduleFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = bar;
function bar() { }
;



PolledWatches::
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/users/username/projects/project/moduleFile:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/projects/project/file1.ts:
  {}
/users/username/projects/project/moduleFile.ts: *new*
  {}

FsWatches *deleted*::
/users/username/projects/project:
  {}


Program root files: [
  "/users/username/projects/project/file1.ts"
]
Program options: {
  "watch": true
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/moduleFile.ts
/users/username/projects/project/file1.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/moduleFile.ts
/users/username/projects/project/file1.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/modulefile.ts (computed .d.ts)
/users/username/projects/project/file1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

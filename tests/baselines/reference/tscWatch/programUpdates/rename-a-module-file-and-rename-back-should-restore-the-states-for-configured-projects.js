currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/users/username/projects/project/moduleFile.ts]
export function bar() { };

//// [/users/username/projects/project/file1.ts]
import * as T from "./moduleFile"; T.bar();

//// [/users/username/projects/project/tsconfig.json]
{}

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


/a/lib/tsc.js -w -p /users/username/projects/project/tsconfig.json
Output::
>> Screen clear
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

[[90m12:00:28 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/users/username/projects/project/file1.ts","/users/username/projects/project/moduleFile.ts"]
Program options: {"watch":true,"project":"/users/username/projects/project/tsconfig.json","configFilePath":"/users/username/projects/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/moduleFile.ts
/users/username/projects/project/file1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/moduleFile.ts
/users/username/projects/project/file1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/users/username/projects/project/modulefile.ts (used version)
/users/username/projects/project/file1.ts (used version)

PolledWatches::
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json: *new*
  {}
/users/username/projects/project/file1.ts: *new*
  {}
/users/username/projects/project/modulefile.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project: *new*
  {}

exitCode:: ExitStatus.undefined

//// [/users/username/projects/project/moduleFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = void 0;
function bar() { }
exports.bar = bar;
;


//// [/users/username/projects/project/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = require("./moduleFile");
T.bar();



Change:: Rename moduleFile to moduleFile1

Input::
//// [/users/username/projects/project/moduleFile1.ts]
export function bar() { };

//// [/users/username/projects/project/moduleFile.ts] deleted
//// [/users/username/projects/project/moduleFile.js] deleted

Before running Timeout callback:: count: 1
3: timerToUpdateProgram
After running Timeout callback:: count: 0
Before running Timeout callback:: count: 0
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:33 AM[0m] File change detected. Starting incremental compilation...

[96musers/username/projects/project/file1.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS2307: [0mCannot find module './moduleFile' or its corresponding type declarations.

[7m1[0m import * as T from "./moduleFile"; T.bar();
[7m [0m [91m                   ~~~~~~~~~~~~~~[0m

[[90m12:00:39 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/users/username/projects/project/file1.ts","/users/username/projects/project/moduleFile1.ts"]
Program options: {"watch":true,"project":"/users/username/projects/project/tsconfig.json","configFilePath":"/users/username/projects/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/moduleFile1.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/file1.ts
/users/username/projects/project/moduleFile1.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/file1.ts (computed .d.ts)
/users/username/projects/project/modulefile1.ts (computed .d.ts)

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/modulefile: *new*
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/users/username/projects/project/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}
/users/username/projects/project: *new*
  {}
/users/username/projects/project/modulefile1.ts: *new*
  {}

FsWatches *deleted*::
/users/username/projects/project/modulefile.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

exitCode:: ExitStatus.undefined

//// [/users/username/projects/project/file1.js] file written with same contents
//// [/users/username/projects/project/moduleFile1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = void 0;
function bar() { }
exports.bar = bar;
;



Change:: Rename moduleFile1 back to moduleFile

Input::
//// [/users/username/projects/project/moduleFile.ts]
export function bar() { };

//// [/users/username/projects/project/moduleFile1.ts] deleted

Before running Timeout callback:: count: 2
7: timerToInvalidateFailedLookupResolutions
8: timerToUpdateProgram
After running Timeout callback:: count: 1
9: timerToUpdateProgram
Before running Timeout callback:: count: 1
9: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:43 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:49 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/users/username/projects/project/file1.ts","/users/username/projects/project/moduleFile.ts"]
Program options: {"watch":true,"project":"/users/username/projects/project/tsconfig.json","configFilePath":"/users/username/projects/project/tsconfig.json"}
Program structureReused: Not
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

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/users/username/projects/project/modulefile:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/users/username/projects/project/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}
/users/username/projects/project/modulefile.ts: *new*
  {}

FsWatches *deleted*::
/users/username/projects/project:
  {}
/users/username/projects/project/modulefile1.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

exitCode:: ExitStatus.undefined

//// [/users/username/projects/project/file1.js] file written with same contents
//// [/users/username/projects/project/moduleFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = void 0;
function bar() { }
exports.bar = bar;
;



currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/b/file1.ts]
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


/a/lib/tsc.js -w /a/b/file1.ts
Output::
>> Screen clear
[[90m12:00:13 AM[0m] Starting compilation in watch mode...

[96ma/b/file1.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS2307: [0mCannot find module './moduleFile' or its corresponding type declarations.

[7m1[0m import * as T from "./moduleFile"; T.bar();
[7m [0m [91m                   ~~~~~~~~~~~~~~[0m

[[90m12:00:16 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a/b/file1.ts"]
Program options: {"watch":true}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/file1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/file1.ts (used version)

FsWatches::
/a/b/file1.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

exitCode:: ExitStatus.undefined

//// [/a/b/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = require("./moduleFile");
T.bar();



Change:: Create module file

Input::
//// [/a/b/moduleFile.ts]
export function bar() { }


Before running Timeout callback:: count: 1
1: timerToInvalidateFailedLookupResolutions
After running Timeout callback:: count: 1
2: timerToUpdateProgram
Before running Timeout callback:: count: 1
2: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:19 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:25 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/file1.ts"]
Program options: {"watch":true}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/a/b/moduleFile.ts
/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/a/b/moduleFile.ts
/a/b/file1.ts

Shape signatures in builder refreshed for::
/a/b/modulefile.ts (computed .d.ts)
/a/b/file1.ts (computed .d.ts)

FsWatches::
/a/b/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}
/a/b/modulefile.ts: *new*
  {}

FsWatchesRecursive *deleted*::
/a:
  {}

exitCode:: ExitStatus.undefined

//// [/a/b/file1.js] file written with same contents
//// [/a/b/moduleFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = void 0;
function bar() { }
exports.bar = bar;



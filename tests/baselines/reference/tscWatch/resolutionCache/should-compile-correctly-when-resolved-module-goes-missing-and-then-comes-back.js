currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/foo.ts]
import {x} from "bar"

//// [/a/bar.d.ts]
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


/a/lib/tsc.js --w /a/foo.ts
Output::
>> Screen clear
[[90m12:00:13 AM[0m] Starting compilation in watch mode...

[[90m12:00:16 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/foo.ts"]
Program options: {"module":2}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/bar.d.ts
/a/foo.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/bar.d.ts
/a/foo.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/bar.d.ts (used version)
/a/foo.ts (used version)

FsWatches::
/a/foo.ts: *new*
  {}
/a/bar.d.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

exitCode:: ExitStatus.undefined

//// [/a/foo.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});



Change:: Delete imported file

Input::
//// [/a/bar.d.ts] deleted

Output::
>> Screen clear
[[90m12:00:18 AM[0m] File change detected. Starting incremental compilation...

[96ma/foo.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS2792: [0mCannot find module 'bar'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?

[7m1[0m import {x} from "bar"
[7m [0m [91m                ~~~~~[0m

[[90m12:00:22 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a/foo.ts"]
Program options: {"module":2}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/foo.ts

Semantic diagnostics in builder refreshed for::
/a/foo.ts

Shape signatures in builder refreshed for::
/a/foo.ts (computed .d.ts)

PolledWatches::
/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/foo.ts:
  {}
/a/lib/lib.d.ts:
  {}
/: *new*
  {}

FsWatches *deleted*::
/a/bar.d.ts:
  {}

FsWatchesRecursive::
/a:
  {}

exitCode:: ExitStatus.undefined

//// [/a/foo.js] file written with same contents

Change:: Create imported file

Input::
//// [/a/bar.d.ts]
export const y = 1;export const x = 10;


Output::
>> Screen clear
[[90m12:00:25 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:29 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/foo.ts"]
Program options: {"module":2}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/a/bar.d.ts
/a/foo.ts

Semantic diagnostics in builder refreshed for::
/a/bar.d.ts
/a/foo.ts

Shape signatures in builder refreshed for::
/a/bar.d.ts (used version)
/a/foo.ts (computed .d.ts)

PolledWatches *deleted*::
/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/foo.ts:
  {}
/a/lib/lib.d.ts:
  {}
/a/bar.d.ts: *new*
  {}

FsWatches *deleted*::
/:
  {}

FsWatchesRecursive::
/a:
  {}

exitCode:: ExitStatus.undefined

//// [/a/foo.js] file written with same contents

Input::
//// [/a/foo.ts]
import {x} from "bar"

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
[[90m12:00:11 AM[0m] Starting compilation in watch mode...

[96ma/foo.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS2792: [0mCannot find module 'bar'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m1[0m import {x} from "bar"
[7m [0m [91m                ~~~~~[0m

[[90m12:00:14 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a/foo.ts"]
Program options: {"module":2}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/foo.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/foo.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/foo.ts (used version)

PolledWatches::
/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/foo.ts:
  {}
/a/lib/lib.d.ts:
  {}
/:
  {}

FsWatchesRecursive::
/a:
  {}

exitCode:: ExitStatus.undefined

//// [/a/foo.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});



Change:: write imported file

Input::
//// [/a/foo.ts]
import {y} from "bar"

//// [/a/bar.d.ts]
export const y = 1;


Output::
>> Screen clear
[[90m12:00:20 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:24 AM[0m] Found 0 errors. Watching for file changes.



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

PolledWatches::

FsWatches::
/a/foo.ts:
  {}
/a/lib/lib.d.ts:
  {}
/a/bar.d.ts:
  {}

FsWatchesRecursive::
/a:
  {}

exitCode:: ExitStatus.undefined

//// [/a/foo.js] file written with same contents

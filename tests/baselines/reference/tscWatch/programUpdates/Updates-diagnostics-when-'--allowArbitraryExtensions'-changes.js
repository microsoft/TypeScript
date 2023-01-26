Input::
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

//// [/a.ts]
import {} from './b.css'

//// [/b.d.css.ts]
declare const style: string;

//// [/tsconfig.json]
{"compilerOptions":{"allowArbitraryExtensions":true}}


/a/lib/tsc.js -w -p /tsconfig.json
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...

[96ma.ts[0m:[93m1[0m:[93m16[0m - [91merror[0m[90m TS2306: [0mFile '/b.d.css.ts' is not a module.

[7m1[0m import {} from './b.css'
[7m [0m [91m               ~~~~~~~~~[0m

[[90m12:00:18 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a.ts","/b.d.css.ts","/a/lib/lib.d.ts"]
Program options: {"allowArbitraryExtensions":true,"watch":true,"project":"/tsconfig.json","configFilePath":"/tsconfig.json"}
Program structureReused: Not
Program files::
/b.d.css.ts
/a.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::
/b.d.css.ts
/a.ts
/a/lib/lib.d.ts

Shape signatures in builder refreshed for::
/b.d.css.ts (used version)
/a.ts (used version)
/a/lib/lib.d.ts (used version)

PolledWatches::

FsWatches::
/tsconfig.json:
  {}
/a.ts:
  {}
/b.d.css.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/:
  {}

exitCode:: ExitStatus.undefined

//// [/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



Change:: Disable  allowArbitraryExtensions

Input::
//// [/tsconfig.json]
{"compilerOptions":{"allowArbitraryExtensions":false}}


Output::
>> Screen clear
[[90m12:00:21 AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m1[0m:[93m16[0m - [91merror[0m[90m TS2306: [0mFile '/b.d.css.ts' is not a module.

[7m1[0m import {} from './b.css'
[7m [0m [91m               ~~~~~~~~~[0m

[[90m12:00:22 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a.ts","/b.d.css.ts","/a/lib/lib.d.ts"]
Program options: {"allowArbitraryExtensions":false,"watch":true,"project":"/tsconfig.json","configFilePath":"/tsconfig.json"}
Program structureReused: Not
Program files::
/a.ts
/b.d.css.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

PolledWatches::

FsWatches::
/tsconfig.json:
  {}
/a.ts:
  {}
/b.d.css.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/:
  {}

exitCode:: ExitStatus.undefined


Change:: Enable  allowArbitraryExtensions

Input::
//// [/tsconfig.json]
{"compilerOptions":{"allowArbitraryExtensions":true}}


Output::
>> Screen clear
[[90m12:00:25 AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m1[0m:[93m16[0m - [91merror[0m[90m TS2306: [0mFile '/b.d.css.ts' is not a module.

[7m1[0m import {} from './b.css'
[7m [0m [91m               ~~~~~~~~~[0m

[[90m12:00:26 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a.ts","/b.d.css.ts","/a/lib/lib.d.ts"]
Program options: {"allowArbitraryExtensions":true,"watch":true,"project":"/tsconfig.json","configFilePath":"/tsconfig.json"}
Program structureReused: Not
Program files::
/b.d.css.ts
/a.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

PolledWatches::

FsWatches::
/tsconfig.json:
  {}
/a.ts:
  {}
/b.d.css.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/:
  {}

exitCode:: ExitStatus.undefined


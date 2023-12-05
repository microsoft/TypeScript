currentDirectory:: / useCaseSensitiveFileNames: false
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

//// [/a/b/referenceFile1.ts]
/// <reference path="./moduleFile2.ts" />
export var x = Foo();

//// [/a/b/tsconfig.json]
{}


/a/lib/tsc.js --w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...

[96ma/b/referenceFile1.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/a/b/moduleFile2.ts' not found.

[7m1[0m /// <reference path="./moduleFile2.ts" />
[7m [0m [91m                     ~~~~~~~~~~~~~~~~[0m

[96ma/b/referenceFile1.ts[0m:[93m2[0m:[93m16[0m - [91merror[0m[90m TS2304: [0mCannot find name 'Foo'.

[7m2[0m export var x = Foo();
[7m [0m [91m               ~~~[0m

[[90m12:00:18 AM[0m] Found 2 errors. Watching for file changes.



//// [/a/b/referenceFile1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
/// <reference path="./moduleFile2.ts" />
exports.x = Foo();



PolledWatches::
/a/b/moduleFile2.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/referenceFile1.ts: *new*
  {}
/a/b/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Program root files: [
  "/a/b/referenceFile1.ts"
]
Program options: {
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/referenceFile1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/referenceFile1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/referencefile1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: edit refereceFile1

Input::
//// [/a/b/referenceFile1.ts]
/// <reference path="./moduleFile2.ts" />
export var x = Foo();export var yy = Foo();


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:21 AM[0m] File change detected. Starting incremental compilation...

[96ma/b/referenceFile1.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/a/b/moduleFile2.ts' not found.

[7m1[0m /// <reference path="./moduleFile2.ts" />
[7m [0m [91m                     ~~~~~~~~~~~~~~~~[0m

[96ma/b/referenceFile1.ts[0m:[93m2[0m:[93m16[0m - [91merror[0m[90m TS2304: [0mCannot find name 'Foo'.

[7m2[0m export var x = Foo();export var yy = Foo();
[7m [0m [91m               ~~~[0m

[96ma/b/referenceFile1.ts[0m:[93m2[0m:[93m38[0m - [91merror[0m[90m TS2304: [0mCannot find name 'Foo'.

[7m2[0m export var x = Foo();export var yy = Foo();
[7m [0m [91m                                     ~~~[0m

[[90m12:00:25 AM[0m] Found 3 errors. Watching for file changes.



//// [/a/b/referenceFile1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yy = exports.x = void 0;
/// <reference path="./moduleFile2.ts" />
exports.x = Foo();
exports.yy = Foo();




Program root files: [
  "/a/b/referenceFile1.ts"
]
Program options: {
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/b/referenceFile1.ts

Semantic diagnostics in builder refreshed for::
/a/b/referenceFile1.ts

Shape signatures in builder refreshed for::
/a/b/referencefile1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: create moduleFile2

Input::
//// [/a/b/moduleFile2.ts]
export var Foo4 = 10;


PolledWatches *deleted*::
/a/b/moduleFile2.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/referenceFile1.ts:
  {}
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:28 AM[0m] File change detected. Starting incremental compilation...

[96ma/b/referenceFile1.ts[0m:[93m2[0m:[93m16[0m - [91merror[0m[90m TS2304: [0mCannot find name 'Foo'.

[7m2[0m export var x = Foo();export var yy = Foo();
[7m [0m [91m               ~~~[0m

[96ma/b/referenceFile1.ts[0m:[93m2[0m:[93m38[0m - [91merror[0m[90m TS2304: [0mCannot find name 'Foo'.

[7m2[0m export var x = Foo();export var yy = Foo();
[7m [0m [91m                                     ~~~[0m

[[90m12:00:34 AM[0m] Found 2 errors. Watching for file changes.



//// [/a/b/referenceFile1.js] file written with same contents
//// [/a/b/moduleFile2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo4 = void 0;
exports.Foo4 = 10;



FsWatches::
/a/b/moduleFile2.ts: *new*
  {}
/a/b/referenceFile1.ts:
  {}
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}


Program root files: [
  "/a/b/moduleFile2.ts",
  "/a/b/referenceFile1.ts"
]
Program options: {
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/moduleFile2.ts
/a/b/referenceFile1.ts

Semantic diagnostics in builder refreshed for::
/a/b/moduleFile2.ts
/a/b/referenceFile1.ts

Shape signatures in builder refreshed for::
/a/b/modulefile2.ts (computed .d.ts)
/a/b/referencefile1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

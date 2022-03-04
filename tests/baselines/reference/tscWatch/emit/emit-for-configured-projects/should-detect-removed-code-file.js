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
/// <reference path="./moduleFile1.ts" />
export var x = Foo();

//// [/a/b/moduleFile1.ts]
export function Foo() { };

//// [/a/b/tsconfig.json]
{}


/a/lib/tsc.js --w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:17 AM[0m] Starting compilation in watch mode...

[96ma/b/referenceFile1.ts[0m:[93m2[0m:[93m16[0m - [91merror[0m[90m TS2304: [0mCannot find name 'Foo'.

[7m2[0m export var x = Foo();
[7m [0m [91m               ~~~[0m

[[90m12:00:22 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a/b/moduleFile1.ts","/a/b/referenceFile1.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/moduleFile1.ts
/a/b/referenceFile1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/moduleFile1.ts
/a/b/referenceFile1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/modulefile1.ts (used version)
/a/b/referencefile1.ts (used version)

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/modulefile1.ts:
  {"fileName":"/a/b/moduleFile1.ts","pollingInterval":250}
/a/b/referencefile1.ts:
  {"fileName":"/a/b/referenceFile1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/b/moduleFile1.js]
"use strict";
exports.__esModule = true;
exports.Foo = void 0;
function Foo() { }
exports.Foo = Foo;
;


//// [/a/b/referenceFile1.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
/// <reference path="./moduleFile1.ts" />
exports.x = Foo();



Change:: delete moduleFile1

Input::
//// [/a/b/moduleFile1.ts] deleted

Output::
>> Screen clear
[[90m12:00:24 AM[0m] File change detected. Starting incremental compilation...

[96ma/b/referenceFile1.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/a/b/moduleFile1.ts' not found.

[7m1[0m /// <reference path="./moduleFile1.ts" />
[7m [0m [91m                     ~~~~~~~~~~~~~~~~[0m

[96ma/b/referenceFile1.ts[0m:[93m2[0m:[93m16[0m - [91merror[0m[90m TS2304: [0mCannot find name 'Foo'.

[7m2[0m export var x = Foo();
[7m [0m [91m               ~~~[0m

[[90m12:00:28 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/a/b/referenceFile1.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/referenceFile1.ts

Semantic diagnostics in builder refreshed for::
/a/b/referenceFile1.ts

Shape signatures in builder refreshed for::
/a/b/referencefile1.ts (computed .d.ts)

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/referencefile1.ts:
  {"fileName":"/a/b/referenceFile1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/a/b/modulefile1.ts:
  {"fileName":"/a/b/modulefile1.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/b/referenceFile1.js] file written with same contents

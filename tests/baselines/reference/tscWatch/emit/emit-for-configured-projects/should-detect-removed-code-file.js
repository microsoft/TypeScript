/a/lib/tsc.js --w -p /a/b/tsconfig.json
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

//// [/a/b/moduleFile1.js]
"use strict";
exports.__esModule = true;
function Foo() { }
exports.Foo = Foo;
;


//// [/a/b/referenceFile1.js]
"use strict";
exports.__esModule = true;
/// <reference path="./moduleFile1.ts" />
exports.x = Foo();



Output::
>> Screen clear
12:00:17 AM - Starting compilation in watch mode...


a/b/referenceFile1.ts(2,16): error TS2304: Cannot find name 'Foo'.


12:00:22 AM - Found 1 error. Watching for file changes.


Program root files: ["/a/b/moduleFile1.ts","/a/b/referenceFile1.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/moduleFile1.ts
/a/b/referenceFile1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/moduleFile1.ts
/a/b/referenceFile1.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"pollingInterval":250}
/a/b/modulefile1.ts:
  {"pollingInterval":250}
/a/b/referencefile1.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: delete moduleFile1

//// [/a/b/referenceFile1.js] file written with same contents
//// [/a/b/moduleFile1.ts] deleted

Output::
>> Screen clear
12:00:24 AM - File change detected. Starting incremental compilation...


a/b/referenceFile1.ts(1,22): error TS6053: File '/a/b/moduleFile1.ts' not found.

a/b/referenceFile1.ts(2,16): error TS2304: Cannot find name 'Foo'.


12:00:28 AM - Found 2 errors. Watching for file changes.


Program root files: ["/a/b/referenceFile1.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/referenceFile1.ts

Semantic diagnostics in builder refreshed for::
/a/b/referenceFile1.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"pollingInterval":250}
/a/b/referencefile1.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}
/a/b/modulefile1.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

/a/lib/tsc.js --w -p /a/b/tsconfig.json
//// [/a/b/moduleFile1.ts]
export function Foo() { };

//// [/a/b/file1Consumer1.ts]
import {Foo} from "./moduleFile1"; export var y = 10;

//// [/a/b/file1Consumer2.ts]
import {Foo} from "./moduleFile1"; let z = 10;

//// [/a/b/globalFile3.ts]
interface GlobalFoo { age: number }

//// [/a/b/moduleFile2.ts]
export var Foo4 = 10;

//// [/a/b/tsconfig.json]
{"files":["/a/b/file1Consumer1.ts"]}

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

//// [/a/b/moduleFile1.js]
"use strict";
exports.__esModule = true;
function Foo() { }
exports.Foo = Foo;
;


//// [/a/b/file1Consumer1.js]
"use strict";
exports.__esModule = true;
exports.y = 10;



Output::
>> Screen clear
12:00:23 AM - Starting compilation in watch mode...



12:00:28 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/file1Consumer1.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/moduleFile1.ts
/a/b/file1Consumer1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/moduleFile1.ts
/a/b/file1Consumer1.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/file1consumer1.ts:
  {"fileName":"/a/b/file1Consumer1.ts","pollingInterval":250}
/a/b/modulefile1.ts:
  {"fileName":"/a/b/moduleFile1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Change the content of moduleFile1 to `export var T: number;export function Foo() { };`

//// [/a/b/moduleFile1.ts]
export var T: number;export function Foo() { };

//// [/a/b/moduleFile1.js]
"use strict";
exports.__esModule = true;
exports.T = void 0;
function Foo() { }
exports.Foo = Foo;
;


//// [/a/b/file1Consumer1.js] file written with same contents

Output::
>> Screen clear
12:00:32 AM - File change detected. Starting incremental compilation...



12:00:39 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/file1Consumer1.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/moduleFile1.ts
/a/b/file1Consumer1.ts

Semantic diagnostics in builder refreshed for::
/a/b/moduleFile1.ts
/a/b/file1Consumer1.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/file1consumer1.ts:
  {"fileName":"/a/b/file1Consumer1.ts","pollingInterval":250}
/a/b/modulefile1.ts:
  {"fileName":"/a/b/moduleFile1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: change file1 internal, and verify only file1 is affected

//// [/a/b/moduleFile1.ts]
export var T: number;export function Foo() { };var T1: number;

//// [/a/b/moduleFile1.js]
"use strict";
exports.__esModule = true;
exports.T = void 0;
function Foo() { }
exports.Foo = Foo;
;
var T1;



Output::
>> Screen clear
12:00:42 AM - File change detected. Starting incremental compilation...



12:00:46 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/file1Consumer1.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/moduleFile1.ts
/a/b/file1Consumer1.ts

Semantic diagnostics in builder refreshed for::
/a/b/moduleFile1.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/file1consumer1.ts:
  {"fileName":"/a/b/file1Consumer1.ts","pollingInterval":250}
/a/b/modulefile1.ts:
  {"fileName":"/a/b/moduleFile1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Input::
//// [/a/b/f1.ts]
export function Foo() { return 10; }

//// [/a/b/f2.ts]
import {Foo} from "./f1"; export let y = Foo();

//// [/a/b/f3.ts]
import {y} from "./f2"; let x = y;

//// [/a/b/tsconfig.json]
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


/a/lib/tsc.js -w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:19 AM[0m] Starting compilation in watch mode...

[[90m12:00:26 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/f1.ts","/a/b/f2.ts","/a/b/f3.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/f1.ts
/a/b/f2.ts
/a/b/f3.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/f1.ts
/a/b/f2.ts
/a/b/f3.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/f1.ts (used version)
/a/b/f2.ts (used version)
/a/b/f3.ts (used version)

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/f1.ts:
  {"fileName":"/a/b/f1.ts","pollingInterval":250}
/a/b/f2.ts:
  {"fileName":"/a/b/f2.ts","pollingInterval":250}
/a/b/f3.ts:
  {"fileName":"/a/b/f3.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/b/f1.js]
"use strict";
exports.__esModule = true;
exports.Foo = void 0;
function Foo() { return 10; }
exports.Foo = Foo;


//// [/a/b/f2.js]
"use strict";
exports.__esModule = true;
exports.y = void 0;
var f1_1 = require("./f1");
exports.y = (0, f1_1.Foo)();


//// [/a/b/f3.js]
"use strict";
exports.__esModule = true;
var f2_1 = require("./f2");
var x = f2_1.y;



Change:: Append content to f1

Input::
//// [/a/b/f1.ts]
export function Foo() { return 10; }export function foo2() { return 2; }


Output::
>> Screen clear
[[90m12:00:29 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:39 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/f1.ts","/a/b/f2.ts","/a/b/f3.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/b/f1.ts
/a/b/f2.ts
/a/b/f3.ts

Semantic diagnostics in builder refreshed for::
/a/b/f1.ts
/a/b/f2.ts
/a/b/f3.ts

Shape signatures in builder refreshed for::
/a/b/f1.ts (computed .d.ts)
/a/b/f2.ts (computed .d.ts)
/a/b/f3.ts (computed .d.ts)

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/f1.ts:
  {"fileName":"/a/b/f1.ts","pollingInterval":250}
/a/b/f2.ts:
  {"fileName":"/a/b/f2.ts","pollingInterval":250}
/a/b/f3.ts:
  {"fileName":"/a/b/f3.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/b/f1.js]
"use strict";
exports.__esModule = true;
exports.foo2 = exports.Foo = void 0;
function Foo() { return 10; }
exports.Foo = Foo;
function foo2() { return 2; }
exports.foo2 = foo2;


//// [/a/b/f2.js] file written with same contents
//// [/a/b/f3.js] file written with same contents

Change:: Again Append content to f1

Input::
//// [/a/b/f1.ts]
export function Foo() { return 10; }export function foo2() { return 2; }export function fooN() { return 2; }


Output::
>> Screen clear
[[90m12:00:42 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:49 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/f1.ts","/a/b/f2.ts","/a/b/f3.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/b/f1.ts
/a/b/f2.ts
/a/b/f3.ts

Semantic diagnostics in builder refreshed for::
/a/b/f1.ts
/a/b/f2.ts

Shape signatures in builder refreshed for::
/a/b/f1.ts (computed .d.ts)
/a/b/f2.ts (computed .d.ts)

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/f1.ts:
  {"fileName":"/a/b/f1.ts","pollingInterval":250}
/a/b/f2.ts:
  {"fileName":"/a/b/f2.ts","pollingInterval":250}
/a/b/f3.ts:
  {"fileName":"/a/b/f3.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/b/f1.js]
"use strict";
exports.__esModule = true;
exports.fooN = exports.foo2 = exports.Foo = void 0;
function Foo() { return 10; }
exports.Foo = Foo;
function foo2() { return 2; }
exports.foo2 = foo2;
function fooN() { return 2; }
exports.fooN = fooN;


//// [/a/b/f2.js] file written with same contents

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
{"compilerOptions":{"isolatedModules":true}}

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


//// [/a/b/file1Consumer2.js]
"use strict";
exports.__esModule = true;
var z = 10;


//// [/a/b/globalFile3.js]


//// [/a/b/moduleFile2.js]
"use strict";
exports.__esModule = true;
exports.Foo4 = 10;



Output::
>> Screen clear
12:00:23 AM - Starting compilation in watch mode...


a/b/globalFile3.ts(1,1): error TS1208: All files must be modules when the '--isolatedModules' flag is provided.


12:00:34 AM - Found 1 error. Watching for file changes.


Program root files: ["/a/b/file1Consumer1.ts","/a/b/file1Consumer2.ts","/a/b/globalFile3.ts","/a/b/moduleFile1.ts","/a/b/moduleFile2.ts"]
Program options: {"isolatedModules":true,"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/moduleFile1.ts
/a/b/file1Consumer1.ts
/a/b/file1Consumer2.ts
/a/b/globalFile3.ts
/a/b/moduleFile2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/moduleFile1.ts
/a/b/file1Consumer1.ts
/a/b/file1Consumer2.ts
/a/b/globalFile3.ts
/a/b/moduleFile2.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"pollingInterval":250}
/a/b/file1consumer1.ts:
  {"pollingInterval":250}
/a/b/modulefile1.ts:
  {"pollingInterval":250}
/a/b/file1consumer2.ts:
  {"pollingInterval":250}
/a/b/globalfile3.ts:
  {"pollingInterval":250}
/a/b/modulefile2.ts:
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

Change:: Change the content of moduleFile1 to `export var T: number;export function Foo() { };`

//// [/a/b/moduleFile1.ts]
export var T: number;export function Foo() { };

//// [/a/b/moduleFile1.js] file written with same contents

Output::
>> Screen clear
12:00:38 AM - File change detected. Starting incremental compilation...


a/b/globalFile3.ts(1,1): error TS1208: All files must be modules when the '--isolatedModules' flag is provided.


12:00:42 AM - Found 1 error. Watching for file changes.


Program root files: ["/a/b/file1Consumer1.ts","/a/b/file1Consumer2.ts","/a/b/globalFile3.ts","/a/b/moduleFile1.ts","/a/b/moduleFile2.ts"]
Program options: {"isolatedModules":true,"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/moduleFile1.ts
/a/b/file1Consumer1.ts
/a/b/file1Consumer2.ts
/a/b/globalFile3.ts
/a/b/moduleFile2.ts

Semantic diagnostics in builder refreshed for::
/a/b/moduleFile1.ts
/a/b/file1Consumer1.ts
/a/b/file1Consumer2.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"pollingInterval":250}
/a/b/file1consumer1.ts:
  {"pollingInterval":250}
/a/b/modulefile1.ts:
  {"pollingInterval":250}
/a/b/file1consumer2.ts:
  {"pollingInterval":250}
/a/b/globalfile3.ts:
  {"pollingInterval":250}
/a/b/modulefile2.ts:
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

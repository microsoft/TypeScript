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

//// [/a/b/moduleFile1.js]
"use strict";
exports.__esModule = true;
exports.Foo = void 0;
function Foo() { }
exports.Foo = Foo;
;


//// [/a/b/file1Consumer1.js]
"use strict";
exports.__esModule = true;
exports.y = void 0;
exports.y = 10;


//// [/a/b/file1Consumer2.js]
"use strict";
exports.__esModule = true;
var z = 10;


//// [/a/b/globalFile3.js]


//// [/a/b/moduleFile2.js]
"use strict";
exports.__esModule = true;
exports.Foo4 = void 0;
exports.Foo4 = 10;



Output::
>> Screen clear
12:00:23 AM - Starting compilation in watch mode...



12:00:34 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/file1Consumer1.ts","/a/b/file1Consumer2.ts","/a/b/globalFile3.ts","/a/b/moduleFile1.ts","/a/b/moduleFile2.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
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
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/file1consumer1.ts:
  {"fileName":"/a/b/file1Consumer1.ts","pollingInterval":250}
/a/b/modulefile1.ts:
  {"fileName":"/a/b/moduleFile1.ts","pollingInterval":250}
/a/b/file1consumer2.ts:
  {"fileName":"/a/b/file1Consumer2.ts","pollingInterval":250}
/a/b/globalfile3.ts:
  {"fileName":"/a/b/globalFile3.ts","pollingInterval":250}
/a/b/modulefile2.ts:
  {"fileName":"/a/b/moduleFile2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Change file1Consumer1 content to `export let y = Foo();`

//// [/a/b/file1Consumer1.ts]
export let y = Foo();

//// [/a/b/file1Consumer1.js]
"use strict";
exports.__esModule = true;
exports.y = void 0;
exports.y = Foo();



Output::
>> Screen clear
12:00:38 AM - File change detected. Starting incremental compilation...


a/b/file1Consumer1.ts(1,16): error TS2304: Cannot find name 'Foo'.


12:00:42 AM - Found 1 error. Watching for file changes.


Program root files: ["/a/b/file1Consumer1.ts","/a/b/file1Consumer2.ts","/a/b/globalFile3.ts","/a/b/moduleFile1.ts","/a/b/moduleFile2.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/file1Consumer1.ts
/a/b/moduleFile1.ts
/a/b/file1Consumer2.ts
/a/b/globalFile3.ts
/a/b/moduleFile2.ts

Semantic diagnostics in builder refreshed for::
/a/b/file1Consumer1.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/file1consumer1.ts:
  {"fileName":"/a/b/file1Consumer1.ts","pollingInterval":250}
/a/b/modulefile1.ts:
  {"fileName":"/a/b/moduleFile1.ts","pollingInterval":250}
/a/b/file1consumer2.ts:
  {"fileName":"/a/b/file1Consumer2.ts","pollingInterval":250}
/a/b/globalfile3.ts:
  {"fileName":"/a/b/globalFile3.ts","pollingInterval":250}
/a/b/modulefile2.ts:
  {"fileName":"/a/b/moduleFile2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Change the content of moduleFile1 to `export var T: number;export function Foo() { };`

//// [/a/b/moduleFile1.ts]
export var T: number;export function Foo() { };

//// [/a/b/moduleFile1.js]
"use strict";
exports.__esModule = true;
exports.Foo = exports.T = void 0;
function Foo() { }
exports.Foo = Foo;
;


//// [/a/b/file1Consumer2.js] file written with same contents

Output::
>> Screen clear
12:00:46 AM - File change detected. Starting incremental compilation...


a/b/file1Consumer1.ts(1,16): error TS2304: Cannot find name 'Foo'.


12:00:53 AM - Found 1 error. Watching for file changes.


Program root files: ["/a/b/file1Consumer1.ts","/a/b/file1Consumer2.ts","/a/b/globalFile3.ts","/a/b/moduleFile1.ts","/a/b/moduleFile2.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/file1Consumer1.ts
/a/b/moduleFile1.ts
/a/b/file1Consumer2.ts
/a/b/globalFile3.ts
/a/b/moduleFile2.ts

Semantic diagnostics in builder refreshed for::
/a/b/moduleFile1.ts
/a/b/file1Consumer2.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/file1consumer1.ts:
  {"fileName":"/a/b/file1Consumer1.ts","pollingInterval":250}
/a/b/modulefile1.ts:
  {"fileName":"/a/b/moduleFile1.ts","pollingInterval":250}
/a/b/file1consumer2.ts:
  {"fileName":"/a/b/file1Consumer2.ts","pollingInterval":250}
/a/b/globalfile3.ts:
  {"fileName":"/a/b/globalFile3.ts","pollingInterval":250}
/a/b/modulefile2.ts:
  {"fileName":"/a/b/moduleFile2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Add the import statements back to file1Consumer1

//// [/a/b/file1Consumer1.ts]
import {Foo} from "./moduleFile1";let y = Foo();

//// [/a/b/file1Consumer1.js]
"use strict";
exports.__esModule = true;
var moduleFile1_1 = require("./moduleFile1");
var y = moduleFile1_1.Foo();



Output::
>> Screen clear
12:00:57 AM - File change detected. Starting incremental compilation...



12:01:01 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/file1Consumer1.ts","/a/b/file1Consumer2.ts","/a/b/globalFile3.ts","/a/b/moduleFile1.ts","/a/b/moduleFile2.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/moduleFile1.ts
/a/b/file1Consumer1.ts
/a/b/file1Consumer2.ts
/a/b/globalFile3.ts
/a/b/moduleFile2.ts

Semantic diagnostics in builder refreshed for::
/a/b/file1Consumer1.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/file1consumer1.ts:
  {"fileName":"/a/b/file1Consumer1.ts","pollingInterval":250}
/a/b/modulefile1.ts:
  {"fileName":"/a/b/moduleFile1.ts","pollingInterval":250}
/a/b/file1consumer2.ts:
  {"fileName":"/a/b/file1Consumer2.ts","pollingInterval":250}
/a/b/globalfile3.ts:
  {"fileName":"/a/b/globalFile3.ts","pollingInterval":250}
/a/b/modulefile2.ts:
  {"fileName":"/a/b/moduleFile2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Change the content of moduleFile1 to `export var T: number;export var T2: string;export function Foo() { };`

//// [/a/b/moduleFile1.ts]
export let y = Foo();

//// [/a/b/moduleFile1.js]
"use strict";
exports.__esModule = true;
exports.y = void 0;
exports.y = Foo();


//// [/a/b/file1Consumer1.js] file written with same contents
//// [/a/b/file1Consumer2.js] file written with same contents

Output::
>> Screen clear
12:01:05 AM - File change detected. Starting incremental compilation...


a/b/file1Consumer1.ts(1,9): error TS2305: Module '"./moduleFile1"' has no exported member 'Foo'.

a/b/file1Consumer2.ts(1,9): error TS2305: Module '"./moduleFile1"' has no exported member 'Foo'.

a/b/moduleFile1.ts(1,16): error TS2304: Cannot find name 'Foo'.


12:01:15 AM - Found 3 errors. Watching for file changes.


Program root files: ["/a/b/file1Consumer1.ts","/a/b/file1Consumer2.ts","/a/b/globalFile3.ts","/a/b/moduleFile1.ts","/a/b/moduleFile2.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
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
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/file1consumer1.ts:
  {"fileName":"/a/b/file1Consumer1.ts","pollingInterval":250}
/a/b/modulefile1.ts:
  {"fileName":"/a/b/moduleFile1.ts","pollingInterval":250}
/a/b/file1consumer2.ts:
  {"fileName":"/a/b/file1Consumer2.ts","pollingInterval":250}
/a/b/globalfile3.ts:
  {"fileName":"/a/b/globalFile3.ts","pollingInterval":250}
/a/b/modulefile2.ts:
  {"fileName":"/a/b/moduleFile2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Multiple file edits in one go

//// [/a/b/moduleFile1.ts]
export var T: number;export function Foo() { };

//// [/a/b/file1Consumer1.ts] file written with same contents
//// [/a/b/moduleFile1.js]
"use strict";
exports.__esModule = true;
exports.Foo = exports.T = void 0;
function Foo() { }
exports.Foo = Foo;
;


//// [/a/b/file1Consumer1.js] file written with same contents
//// [/a/b/file1Consumer2.js] file written with same contents

Output::
>> Screen clear
12:01:22 AM - File change detected. Starting incremental compilation...



12:01:32 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/file1Consumer1.ts","/a/b/file1Consumer2.ts","/a/b/globalFile3.ts","/a/b/moduleFile1.ts","/a/b/moduleFile2.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
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
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/file1consumer1.ts:
  {"fileName":"/a/b/file1Consumer1.ts","pollingInterval":250}
/a/b/modulefile1.ts:
  {"fileName":"/a/b/moduleFile1.ts","pollingInterval":250}
/a/b/file1consumer2.ts:
  {"fileName":"/a/b/file1Consumer2.ts","pollingInterval":250}
/a/b/globalfile3.ts:
  {"fileName":"/a/b/globalFile3.ts","pollingInterval":250}
/a/b/modulefile2.ts:
  {"fileName":"/a/b/moduleFile2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

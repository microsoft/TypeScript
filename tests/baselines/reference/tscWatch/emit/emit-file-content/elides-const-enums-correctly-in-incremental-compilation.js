Input::
//// [/user/someone/projects/myproject/file1.ts]
export const enum E1 { V = 1 }

//// [/user/someone/projects/myproject/file2.ts]
import { E1 } from "./file1"; export const enum E2 { V = E1.V }

//// [/user/someone/projects/myproject/file3.ts]
import { E2 } from "./file2"; const v: E2 = E2.V;

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


/a/lib/tsc.js -w /user/someone/projects/myproject/file3.ts
Output::
>> Screen clear
[[90m12:00:23 AM[0m] Starting compilation in watch mode...


[[90m12:00:30 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/someone/projects/myproject/file3.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/user/someone/projects/myproject/file1.ts
/user/someone/projects/myproject/file2.ts
/user/someone/projects/myproject/file3.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/someone/projects/myproject/file1.ts
/user/someone/projects/myproject/file2.ts
/user/someone/projects/myproject/file3.ts

WatchedFiles::
/user/someone/projects/myproject/file3.ts:
  {"fileName":"/user/someone/projects/myproject/file3.ts","pollingInterval":250}
/user/someone/projects/myproject/file2.ts:
  {"fileName":"/user/someone/projects/myproject/file2.ts","pollingInterval":250}
/user/someone/projects/myproject/file1.ts:
  {"fileName":"/user/someone/projects/myproject/file1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/user/someone/projects/myproject/file1.js]
"use strict";
exports.__esModule = true;


//// [/user/someone/projects/myproject/file2.js]
"use strict";
exports.__esModule = true;


//// [/user/someone/projects/myproject/file3.js]
"use strict";
exports.__esModule = true;
var v = 1 /* V */;



Change:: Append content to file3

Input::
//// [/user/someone/projects/myproject/file3.ts]
import { E2 } from "./file2"; const v: E2 = E2.V;function foo2() { return 2; }


Output::
>> Screen clear
[[90m12:00:33 AM[0m] File change detected. Starting incremental compilation...


[[90m12:00:37 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/someone/projects/myproject/file3.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/user/someone/projects/myproject/file1.ts
/user/someone/projects/myproject/file2.ts
/user/someone/projects/myproject/file3.ts

Semantic diagnostics in builder refreshed for::
/user/someone/projects/myproject/file3.ts

WatchedFiles::
/user/someone/projects/myproject/file3.ts:
  {"fileName":"/user/someone/projects/myproject/file3.ts","pollingInterval":250}
/user/someone/projects/myproject/file2.ts:
  {"fileName":"/user/someone/projects/myproject/file2.ts","pollingInterval":250}
/user/someone/projects/myproject/file1.ts:
  {"fileName":"/user/someone/projects/myproject/file1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/user/someone/projects/myproject/file3.js]
"use strict";
exports.__esModule = true;
var v = 1 /* V */;
function foo2() { return 2; }



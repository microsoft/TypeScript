Input::
//// [/a/b/f1.ts]
export let x = 5

//// [/a/c/f2.ts]
import {x} from "../b/f1"

//// [/a/c/f3.ts]
export let y = 1

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

//// [/a/c/tsconfig.json]
{"compilerOptions":{},"files":["f2.ts","f3.ts"]}


/a/lib/tsc.js -w -p /a/c/tsconfig.json
Output::
>> Screen clear
[[90m12:00:21 AM[0m] Starting compilation in watch mode...


[[90m12:00:28 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/c/f2.ts","/a/c/f3.ts"]
Program options: {"watch":true,"project":"/a/c/tsconfig.json","configFilePath":"/a/c/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/f1.ts
/a/c/f2.ts
/a/c/f3.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/f1.ts
/a/c/f2.ts
/a/c/f3.ts

WatchedFiles::
/a/c/tsconfig.json:
  {"fileName":"/a/c/tsconfig.json","pollingInterval":250}
/a/c/f2.ts:
  {"fileName":"/a/c/f2.ts","pollingInterval":250}
/a/b/f1.ts:
  {"fileName":"/a/b/f1.ts","pollingInterval":250}
/a/c/f3.ts:
  {"fileName":"/a/c/f3.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/c/node_modules/@types:
  {"directoryName":"/a/c/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/b/f1.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 5;


//// [/a/c/f2.js]
"use strict";
exports.__esModule = true;


//// [/a/c/f3.js]
"use strict";
exports.__esModule = true;
exports.y = void 0;
exports.y = 1;



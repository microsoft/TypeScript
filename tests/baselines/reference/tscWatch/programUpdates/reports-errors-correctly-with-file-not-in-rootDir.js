/a/lib/tsc.js -w
//// [/user/username/projects/myproject/a.ts]
import { x } from "../b";

//// [/user/username/projects/b.ts]
export const x = 10;

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"rootDir":".","outDir":"lib"}}

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

//// [/user/username/projects/myproject/lib/b.js]
"use strict";
exports.__esModule = true;
exports.x = 10;


//// [/user/username/projects/myproject/lib/myproject/a.js]
"use strict";
exports.__esModule = true;



Output::
>> Screen clear
12:00:23 AM - Starting compilation in watch mode...


a.ts(1,19): error TS6059: File '/user/username/projects/b.ts' is not under 'rootDir' '/user/username/projects/myproject'. 'rootDir' is expected to contain all source files.


12:00:34 AM - Found 1 error. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts"]
Program options: {"rootDir":"/user/username/projects/myproject","outDir":"/user/username/projects/myproject/lib","watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/b.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/b.ts
/user/username/projects/myproject/a.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"pollingInterval":250}
/user/username/projects/b.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Make changes to file a

//// [/user/username/projects/myproject/a.ts]


import { x } from "../b";

//// [/user/username/projects/myproject/lib/myproject/a.js] file written with same contents

Output::
>> Screen clear
12:00:38 AM - File change detected. Starting incremental compilation...


a.ts(3,19): error TS6059: File '/user/username/projects/b.ts' is not under 'rootDir' '/user/username/projects/myproject'. 'rootDir' is expected to contain all source files.


12:00:42 AM - Found 1 error. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts"]
Program options: {"rootDir":"/user/username/projects/myproject","outDir":"/user/username/projects/myproject/lib","watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/b.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/a.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"pollingInterval":250}
/user/username/projects/b.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

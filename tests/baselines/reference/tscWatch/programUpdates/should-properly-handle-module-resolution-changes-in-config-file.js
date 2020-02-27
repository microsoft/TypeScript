/a/lib/tsc.js -w -p /a/b/tsconfig.json
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

//// [/a/b/file1.ts]
import { T } from "module1";

//// [/a/b/node_modules/module1.ts]
export interface T {}

//// [/a/module1.ts]
export interface T {}

//// [/a/b/tsconfig.json]
{
                    "compilerOptions": {
                        "moduleResolution": "node"
                    },
                    "files": ["/a/b/file1.ts"]
                }

//// [/a/b/file1.js]
"use strict";
exports.__esModule = true;



Output::
>> Screen clear
12:00:21 AM - Starting compilation in watch mode...



12:00:24 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/file1.ts"]
Program options: {"moduleResolution":2,"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/node_modules/module1.ts
/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/node_modules/module1.ts
/a/b/file1.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/file1.ts:
  {"fileName":"/a/b/file1.ts","pollingInterval":250}
/a/b/node_modules/module1.ts:
  {"fileName":"/a/b/node_modules/module1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules:
  {"directoryName":"/a/b/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Change module resolution to classic

//// [/a/b/tsconfig.json]
{
                        "compilerOptions": {
                            "moduleResolution": "classic"
                        },
                        "files": ["/a/b/file1.ts"]
                    }

//// [/a/b/file1.js] file written with same contents
//// [/a/module1.js]
"use strict";
exports.__esModule = true;



Output::
>> Screen clear
12:00:28 AM - File change detected. Starting incremental compilation...



12:00:34 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/file1.ts"]
Program options: {"moduleResolution":1,"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/module1.ts
/a/b/file1.ts

Semantic diagnostics in builder refreshed for::
/a/module1.ts
/a/b/file1.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/file1.ts:
  {"fileName":"/a/b/file1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/a/module1.ts:
  {"fileName":"/a/module1.ts","pollingInterval":250}

FsWatches::
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

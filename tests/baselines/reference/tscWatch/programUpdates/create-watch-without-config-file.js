/a/lib/tsc.js -w /a/b/c/app.ts
//// [/a/b/c/app.ts]

                import {f} from "./module"
                console.log(f)
                

//// [/a/b/c/module.d.ts]
export let x: number

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

//// [/a/b/c/app.js]
"use strict";
exports.__esModule = true;
var module_1 = require("./module");
console.log(module_1.f);



Output::
>> Screen clear
12:00:17 AM - Starting compilation in watch mode...


a/b/c/app.ts(2,25): error TS2305: Module '"./module"' has no exported member 'f'.

a/b/c/app.ts(3,17): error TS2584: Cannot find name 'console'. Do you need to change your target library? Try changing the `lib` compiler option to include 'dom'.


12:00:20 AM - Found 2 errors. Watching for file changes.


Program root files: ["/a/b/c/app.ts"]
Program options: {"watch":true}
Program files::
/a/lib/lib.d.ts
/a/b/c/module.d.ts
/a/b/c/app.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/c/module.d.ts
/a/b/c/app.ts

WatchedFiles::
/a/b/c/app.ts:
  {"fileName":"/a/b/c/app.ts","pollingInterval":250}
/a/b/c/module.d.ts:
  {"fileName":"/a/b/c/module.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a:
  {"directoryName":"/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

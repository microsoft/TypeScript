Input::
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


/a/lib/tsc.js -w /a/b/c/app.ts
Output::
>> Screen clear
[[90m12:00:17 AM[0m] Starting compilation in watch mode...

[96ma/b/c/app.ts[0m:[93m2[0m:[93m25[0m - [91merror[0m[90m TS2305: [0mModule '"./module"' has no exported member 'f'.

[7m2[0m                 import {f} from "./module"
[7m [0m [91m                        ~[0m

[96ma/b/c/app.ts[0m:[93m3[0m:[93m17[0m - [91merror[0m[90m TS2584: [0mCannot find name 'console'. Do you need to change your target library? Try changing the 'lib' compiler option to include 'dom'.

[7m3[0m                 console.log(f)
[7m [0m [91m                ~~~~~~~[0m

[[90m12:00:20 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/a/b/c/app.ts"]
Program options: {"watch":true}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/c/module.d.ts
/a/b/c/app.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/c/module.d.ts
/a/b/c/app.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/c/module.d.ts (used version)
/a/b/c/app.ts (used version)

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

//// [/a/b/c/app.js]
"use strict";
exports.__esModule = true;
var module_1 = require("./module");
console.log(module_1.f);



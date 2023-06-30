currentDirectory:: / useCaseSensitiveFileNames: false
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

[91m● [0m[96ma/b/c/app.ts[0m:[93m2[0m:[93m25[0m  [91mError[0m TS2305
| import {f} from "./module"
  [91m        ▔[0m
Module '"./module"' has no exported member 'f'.

[91m● [0m[96ma/b/c/app.ts[0m:[93m3[0m:[93m17[0m  [91mError[0m TS2584
| console.log(f)
  [91m▔▔▔▔▔▔▔[0m
Cannot find name 'console'. Do you need to change your target library? Try changing the 'lib' compiler option to include 'dom'.

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

FsWatches::
/a/b/c/app.ts: *new*
  {}
/a/b/c/module.d.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b/c: *new*
  {}

exitCode:: ExitStatus.undefined

//// [/a/b/c/app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = require("./module");
console.log(module_1.f);



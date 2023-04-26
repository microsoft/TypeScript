currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
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

//// [/user/username/projects/myproject/src/main.ts]
import { foo } from "bar"; foo();

//// [/user/username/projects/myproject/node_modules/bar/index.d.ts]
export { foo } from "./foo";

//// [/user/username/projects/myproject/node_modules/bar/foo.d.ts]
export function foo(): string;

//// [/user/username/projects/myproject/node_modules/bar/fooBar.d.ts]
export function fooBar(): string;

//// [/user/username/projects/myproject/node_modules/bar/temp/index.d.ts]
export function temp(): string;

//// [/user/username/projects/myproject/tsconfig.json]
{"exclude":["node_modules"],"watchOptions":{"excludeDirectories":["**/temp"]}}


/a/lib/tsc.js -w
Output::
>> Screen clear
[[90m12:00:37 AM[0m] Starting compilation in watch mode...

[[90m12:00:40 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/main.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/node_modules/bar/foo.d.ts
/user/username/projects/myproject/node_modules/bar/index.d.ts
/user/username/projects/myproject/src/main.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/node_modules/bar/foo.d.ts
/user/username/projects/myproject/node_modules/bar/index.d.ts
/user/username/projects/myproject/src/main.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/node_modules/bar/foo.d.ts (used version)
/user/username/projects/myproject/node_modules/bar/index.d.ts (used version)
/user/username/projects/myproject/src/main.ts (used version)

PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/user/username/projects/myproject/src/main.ts: *new*
  {}
/user/username/projects/myproject/node_modules/bar/index.d.ts: *new*
  {}
/user/username/projects/myproject/node_modules: *new*
  {}
/user/username/projects/myproject/node_modules/bar: *new*
  {}
/user/username/projects/myproject/node_modules/bar/foo.d.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/src: *new*
  {}
/user/username/projects/myproject: *new*
  {}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bar_1 = require("bar");
(0, bar_1.foo)();



Change:: Directory watch updates because of main.js creation

Input::

Before running Timeout callback:: count: 1
1: timerToUpdateChildWatches
After running Timeout callback:: count: 0
Output::

exitCode:: ExitStatus.undefined


Change:: add new folder to temp

Input::
//// [/user/username/projects/myproject/node_modules/bar/temp/fooBar/index.d.ts]
export function temp(): string;


Timeout callback:: count: 0
Immedidate callback:: count: 0
Output::

exitCode:: ExitStatus.undefined


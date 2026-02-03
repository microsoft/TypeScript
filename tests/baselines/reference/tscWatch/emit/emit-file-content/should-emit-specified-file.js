currentDirectory:: /home/src/projects/a/b useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/a/b/f1.ts]
export function Foo() { return 10; }

//// [/home/src/projects/a/b/f2.ts]
import {Foo} from "./f1"; export let y = Foo();

//// [/home/src/projects/a/b/f3.ts]
import {y} from "./f2"; let x = y;

//// [/home/src/projects/a/b/tsconfig.json]
{}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js -w -p /home/src/projects/a/b/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/a/b/f1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = Foo;
function Foo() { return 10; }


//// [/home/src/projects/a/b/f2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
var f1_1 = require("./f1");
exports.y = (0, f1_1.Foo)();


//// [/home/src/projects/a/b/f3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var f2_1 = require("./f2");
var x = f2_1.y;



PolledWatches::
/home/src/projects/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/a/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/b/f1.ts: *new*
  {}
/home/src/projects/a/b/f2.ts: *new*
  {}
/home/src/projects/a/b/f3.ts: *new*
  {}
/home/src/projects/a/b/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/a/b: *new*
  {}

Program root files: [
  "/home/src/projects/a/b/f1.ts",
  "/home/src/projects/a/b/f2.ts",
  "/home/src/projects/a/b/f3.ts"
]
Program options: {
  "watch": true,
  "project": "/home/src/projects/a/b/tsconfig.json",
  "configFilePath": "/home/src/projects/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/f1.ts
/home/src/projects/a/b/f2.ts
/home/src/projects/a/b/f3.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/f1.ts
/home/src/projects/a/b/f2.ts
/home/src/projects/a/b/f3.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/a/b/f1.ts (used version)
/home/src/projects/a/b/f2.ts (used version)
/home/src/projects/a/b/f3.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Append content to f1

Input::
//// [/home/src/projects/a/b/f1.ts]
export function Foo() { return 10; }export function foo2() { return 2; }


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/a/b/f1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = Foo;
exports.foo2 = foo2;
function Foo() { return 10; }
function foo2() { return 2; }


//// [/home/src/projects/a/b/f2.js] file written with same contents
//// [/home/src/projects/a/b/f3.js] file written with same contents


Program root files: [
  "/home/src/projects/a/b/f1.ts",
  "/home/src/projects/a/b/f2.ts",
  "/home/src/projects/a/b/f3.ts"
]
Program options: {
  "watch": true,
  "project": "/home/src/projects/a/b/tsconfig.json",
  "configFilePath": "/home/src/projects/a/b/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/f1.ts
/home/src/projects/a/b/f2.ts
/home/src/projects/a/b/f3.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/a/b/f1.ts
/home/src/projects/a/b/f2.ts
/home/src/projects/a/b/f3.ts

Shape signatures in builder refreshed for::
/home/src/projects/a/b/f1.ts (computed .d.ts)
/home/src/projects/a/b/f2.ts (computed .d.ts)
/home/src/projects/a/b/f3.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Again Append content to f1

Input::
//// [/home/src/projects/a/b/f1.ts]
export function Foo() { return 10; }export function foo2() { return 2; }export function fooN() { return 2; }


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/a/b/f1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = Foo;
exports.foo2 = foo2;
exports.fooN = fooN;
function Foo() { return 10; }
function foo2() { return 2; }
function fooN() { return 2; }


//// [/home/src/projects/a/b/f2.js] file written with same contents


Program root files: [
  "/home/src/projects/a/b/f1.ts",
  "/home/src/projects/a/b/f2.ts",
  "/home/src/projects/a/b/f3.ts"
]
Program options: {
  "watch": true,
  "project": "/home/src/projects/a/b/tsconfig.json",
  "configFilePath": "/home/src/projects/a/b/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/f1.ts
/home/src/projects/a/b/f2.ts
/home/src/projects/a/b/f3.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/a/b/f1.ts
/home/src/projects/a/b/f2.ts
/home/src/projects/a/b/f3.ts

Shape signatures in builder refreshed for::
/home/src/projects/a/b/f1.ts (computed .d.ts)
/home/src/projects/a/b/f2.ts (computed .d.ts)
/home/src/projects/a/b/f3.ts (used version)

exitCode:: ExitStatus.undefined

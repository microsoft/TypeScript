currentDirectory:: /home/src/projects/a/b useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/a/b/moduleFile1.ts]
export function Foo() { };

//// [/home/src/projects/a/b/file1Consumer1.ts]
import {Foo} from "./moduleFile1"; export var y = 10;

//// [/home/src/projects/a/b/file1Consumer2.ts]
import {Foo} from "./moduleFile1"; let z = 10;

//// [/home/src/projects/a/b/globalFile3.ts]
interface GlobalFoo { age: number }

//// [/home/src/projects/a/b/moduleFile2.ts]
export var Foo4 = 10;

//// [/home/src/projects/a/b/tsconfig.json]
{
  "files": [
    "/home/src/projects/a/b/file1Consumer1.ts"
  ]
}

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


/home/src/tslibs/TS/Lib/tsc.js --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/a/b/moduleFile1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = Foo;
function Foo() { }
;


//// [/home/src/projects/a/b/file1Consumer1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 10;



PolledWatches::
/home/src/projects/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/a/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/b/file1Consumer1.ts: *new*
  {}
/home/src/projects/a/b/moduleFile1.ts: *new*
  {}
/home/src/projects/a/b/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Program root files: [
  "/home/src/projects/a/b/file1Consumer1.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/home/src/projects/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/moduleFile1.ts
/home/src/projects/a/b/file1Consumer1.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/moduleFile1.ts
/home/src/projects/a/b/file1Consumer1.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/a/b/modulefile1.ts (used version)
/home/src/projects/a/b/file1consumer1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Change the content of moduleFile1 to `export var T: number;export function Foo() { };`

Input::
//// [/home/src/projects/a/b/moduleFile1.ts]
export var T: number;export function Foo() { };


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



//// [/home/src/projects/a/b/moduleFile1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.T = void 0;
exports.Foo = Foo;
function Foo() { }
;


//// [/home/src/projects/a/b/file1Consumer1.js] file written with same contents


Program root files: [
  "/home/src/projects/a/b/file1Consumer1.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/home/src/projects/a/b/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/moduleFile1.ts
/home/src/projects/a/b/file1Consumer1.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/a/b/moduleFile1.ts
/home/src/projects/a/b/file1Consumer1.ts

Shape signatures in builder refreshed for::
/home/src/projects/a/b/modulefile1.ts (computed .d.ts)
/home/src/projects/a/b/file1consumer1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: change file1 internal, and verify only file1 is affected

Input::
//// [/home/src/projects/a/b/moduleFile1.ts]
export var T: number;export function Foo() { };var T1: number;


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



//// [/home/src/projects/a/b/moduleFile1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.T = void 0;
exports.Foo = Foo;
function Foo() { }
;
var T1;




Program root files: [
  "/home/src/projects/a/b/file1Consumer1.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/home/src/projects/a/b/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/moduleFile1.ts
/home/src/projects/a/b/file1Consumer1.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/a/b/moduleFile1.ts

Shape signatures in builder refreshed for::
/home/src/projects/a/b/modulefile1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

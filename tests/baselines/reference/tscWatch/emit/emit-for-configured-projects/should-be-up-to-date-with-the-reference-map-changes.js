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


//// [/home/src/projects/a/b/file1Consumer2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var z = 10;


//// [/home/src/projects/a/b/globalFile3.js]


//// [/home/src/projects/a/b/moduleFile2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo4 = void 0;
exports.Foo4 = 10;



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
/home/src/projects/a/b/file1Consumer2.ts: *new*
  {}
/home/src/projects/a/b/globalFile3.ts: *new*
  {}
/home/src/projects/a/b/moduleFile1.ts: *new*
  {}
/home/src/projects/a/b/moduleFile2.ts: *new*
  {}
/home/src/projects/a/b/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/a/b: *new*
  {}

Program root files: [
  "/home/src/projects/a/b/file1Consumer1.ts",
  "/home/src/projects/a/b/file1Consumer2.ts",
  "/home/src/projects/a/b/globalFile3.ts",
  "/home/src/projects/a/b/moduleFile1.ts",
  "/home/src/projects/a/b/moduleFile2.ts"
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
/home/src/projects/a/b/file1Consumer2.ts
/home/src/projects/a/b/globalFile3.ts
/home/src/projects/a/b/moduleFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/moduleFile1.ts
/home/src/projects/a/b/file1Consumer1.ts
/home/src/projects/a/b/file1Consumer2.ts
/home/src/projects/a/b/globalFile3.ts
/home/src/projects/a/b/moduleFile2.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/a/b/modulefile1.ts (used version)
/home/src/projects/a/b/file1consumer1.ts (used version)
/home/src/projects/a/b/file1consumer2.ts (used version)
/home/src/projects/a/b/globalfile3.ts (used version)
/home/src/projects/a/b/modulefile2.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Change file1Consumer1 content to `export let y = Foo();`

Input::
//// [/home/src/projects/a/b/file1Consumer1.ts]
export let y = Foo();


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mfile1Consumer1.ts[0m:[93m1[0m:[93m16[0m - [91merror[0m[90m TS2304: [0mCannot find name 'Foo'.

[7m1[0m export let y = Foo();
[7m [0m [91m               ~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/a/b/file1Consumer1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = Foo();




Program root files: [
  "/home/src/projects/a/b/file1Consumer1.ts",
  "/home/src/projects/a/b/file1Consumer2.ts",
  "/home/src/projects/a/b/globalFile3.ts",
  "/home/src/projects/a/b/moduleFile1.ts",
  "/home/src/projects/a/b/moduleFile2.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/home/src/projects/a/b/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/file1Consumer1.ts
/home/src/projects/a/b/moduleFile1.ts
/home/src/projects/a/b/file1Consumer2.ts
/home/src/projects/a/b/globalFile3.ts
/home/src/projects/a/b/moduleFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/a/b/file1Consumer1.ts

Shape signatures in builder refreshed for::
/home/src/projects/a/b/file1consumer1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Change the content of moduleFile1 to `export var T: number;export function Foo() { };`

Input::
//// [/home/src/projects/a/b/moduleFile1.ts]
export var T: number;export function Foo() { };


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mfile1Consumer1.ts[0m:[93m1[0m:[93m16[0m - [91merror[0m[90m TS2304: [0mCannot find name 'Foo'.

[7m1[0m export let y = Foo();
[7m [0m [91m               ~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/a/b/moduleFile1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.T = void 0;
exports.Foo = Foo;
function Foo() { }
;


//// [/home/src/projects/a/b/file1Consumer2.js] file written with same contents


Program root files: [
  "/home/src/projects/a/b/file1Consumer1.ts",
  "/home/src/projects/a/b/file1Consumer2.ts",
  "/home/src/projects/a/b/globalFile3.ts",
  "/home/src/projects/a/b/moduleFile1.ts",
  "/home/src/projects/a/b/moduleFile2.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/home/src/projects/a/b/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/file1Consumer1.ts
/home/src/projects/a/b/moduleFile1.ts
/home/src/projects/a/b/file1Consumer2.ts
/home/src/projects/a/b/globalFile3.ts
/home/src/projects/a/b/moduleFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/a/b/moduleFile1.ts
/home/src/projects/a/b/file1Consumer2.ts

Shape signatures in builder refreshed for::
/home/src/projects/a/b/modulefile1.ts (computed .d.ts)
/home/src/projects/a/b/file1consumer2.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Add the import statements back to file1Consumer1

Input::
//// [/home/src/projects/a/b/file1Consumer1.ts]
import {Foo} from "./moduleFile1";let y = Foo();


Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/a/b/file1Consumer1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moduleFile1_1 = require("./moduleFile1");
var y = (0, moduleFile1_1.Foo)();




Program root files: [
  "/home/src/projects/a/b/file1Consumer1.ts",
  "/home/src/projects/a/b/file1Consumer2.ts",
  "/home/src/projects/a/b/globalFile3.ts",
  "/home/src/projects/a/b/moduleFile1.ts",
  "/home/src/projects/a/b/moduleFile2.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/home/src/projects/a/b/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/moduleFile1.ts
/home/src/projects/a/b/file1Consumer1.ts
/home/src/projects/a/b/file1Consumer2.ts
/home/src/projects/a/b/globalFile3.ts
/home/src/projects/a/b/moduleFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/a/b/file1Consumer1.ts

Shape signatures in builder refreshed for::
/home/src/projects/a/b/file1consumer1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Change the content of moduleFile1 to `export var T: number;export var T2: string;export function Foo() { };`

Input::
//// [/home/src/projects/a/b/moduleFile1.ts]
export let y = Foo();


Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mfile1Consumer1.ts[0m:[93m1[0m:[93m9[0m - [91merror[0m[90m TS2305: [0mModule '"./moduleFile1"' has no exported member 'Foo'.

[7m1[0m import {Foo} from "./moduleFile1";let y = Foo();
[7m [0m [91m        ~~~[0m

[96mfile1Consumer2.ts[0m:[93m1[0m:[93m9[0m - [91merror[0m[90m TS2305: [0mModule '"./moduleFile1"' has no exported member 'Foo'.

[7m1[0m import {Foo} from "./moduleFile1"; let z = 10;
[7m [0m [91m        ~~~[0m

[96mmoduleFile1.ts[0m:[93m1[0m:[93m16[0m - [91merror[0m[90m TS2304: [0mCannot find name 'Foo'.

[7m1[0m export let y = Foo();
[7m [0m [91m               ~~~[0m

[[90mHH:MM:SS AM[0m] Found 3 errors. Watching for file changes.



//// [/home/src/projects/a/b/moduleFile1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = Foo();


//// [/home/src/projects/a/b/file1Consumer1.js] file written with same contents
//// [/home/src/projects/a/b/file1Consumer2.js] file written with same contents


Program root files: [
  "/home/src/projects/a/b/file1Consumer1.ts",
  "/home/src/projects/a/b/file1Consumer2.ts",
  "/home/src/projects/a/b/globalFile3.ts",
  "/home/src/projects/a/b/moduleFile1.ts",
  "/home/src/projects/a/b/moduleFile2.ts"
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
/home/src/projects/a/b/file1Consumer2.ts
/home/src/projects/a/b/globalFile3.ts
/home/src/projects/a/b/moduleFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/a/b/moduleFile1.ts
/home/src/projects/a/b/file1Consumer1.ts
/home/src/projects/a/b/file1Consumer2.ts

Shape signatures in builder refreshed for::
/home/src/projects/a/b/modulefile1.ts (computed .d.ts)
/home/src/projects/a/b/file1consumer2.ts (computed .d.ts)
/home/src/projects/a/b/file1consumer1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Multiple file edits in one go

Input::
//// [/home/src/projects/a/b/moduleFile1.ts]
export var T: number;export function Foo() { };

//// [/home/src/projects/a/b/file1Consumer1.ts] file written with same contents

Timeout callback:: count: 1
6: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
6: timerToUpdateProgram

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
//// [/home/src/projects/a/b/file1Consumer2.js] file written with same contents


Program root files: [
  "/home/src/projects/a/b/file1Consumer1.ts",
  "/home/src/projects/a/b/file1Consumer2.ts",
  "/home/src/projects/a/b/globalFile3.ts",
  "/home/src/projects/a/b/moduleFile1.ts",
  "/home/src/projects/a/b/moduleFile2.ts"
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
/home/src/projects/a/b/file1Consumer2.ts
/home/src/projects/a/b/globalFile3.ts
/home/src/projects/a/b/moduleFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/a/b/moduleFile1.ts
/home/src/projects/a/b/file1Consumer1.ts
/home/src/projects/a/b/file1Consumer2.ts

Shape signatures in builder refreshed for::
/home/src/projects/a/b/modulefile1.ts (computed .d.ts)
/home/src/projects/a/b/file1consumer2.ts (computed .d.ts)
/home/src/projects/a/b/file1consumer1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

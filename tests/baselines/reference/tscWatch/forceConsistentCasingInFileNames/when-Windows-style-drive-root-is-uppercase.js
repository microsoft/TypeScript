currentDirectory:: C:\workspaces\solution useCaseSensitiveFileNames:: false
Input::
//// [C:/workspaces/solution/project/a.ts]

export const a = 1;
export const b = 2;


//// [C:/workspaces/solution/project/b.ts]

import { a } from "C:/workspaces/solution/project/a"
import { b } from "c:/workspaces/solution/project/a"

a;b;


//// [C:/workspaces/solution/project/tsconfig.json]
{
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true
  }
}

//// [C:/home/src/tslibs/TS/Lib/lib.d.ts]
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


C:\home\src\tslibs\TS\Lib\tsc.js --w --p C:/workspaces/solution/project --explainFiles
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
project/a.ts
  Matched by default include pattern '**/*'
  Imported via "C:/workspaces/solution/project/a" from file 'project/b.ts'
  Imported via "c:/workspaces/solution/project/a" from file 'project/b.ts'
project/b.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [C:/workspaces/solution/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
exports.a = 1;
exports.b = 2;


//// [C:/workspaces/solution/project/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a_1 = require("C:/workspaces/solution/project/a");
var a_2 = require("c:/workspaces/solution/project/a");
a_1.a;
a_2.b;



PolledWatches::
C:/workspaces/node_modules/@types: *new*
  {"pollingInterval":500}
C:/workspaces/solution/node_modules/@types: *new*
  {"pollingInterval":500}
C:/workspaces/solution/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
C:/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
C:/workspaces/solution/project/a.ts: *new*
  {}
C:/workspaces/solution/project/b.ts: *new*
  {}
C:/workspaces/solution/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
C:/workspaces/solution/project: *new*
  {}

Program root files: [
  "C:/workspaces/solution/project/a.ts",
  "C:/workspaces/solution/project/b.ts"
]
Program options: {
  "forceConsistentCasingInFileNames": true,
  "watch": true,
  "project": "C:/workspaces/solution/project",
  "explainFiles": true,
  "configFilePath": "C:/workspaces/solution/project/tsconfig.json"
}
Program structureReused: Not
Program files::
C:/home/src/tslibs/TS/Lib/lib.d.ts
C:/workspaces/solution/project/a.ts
C:/workspaces/solution/project/b.ts

Semantic diagnostics in builder refreshed for::
C:/home/src/tslibs/TS/Lib/lib.d.ts
C:/workspaces/solution/project/a.ts
C:/workspaces/solution/project/b.ts

Shape signatures in builder refreshed for::
c:/home/src/tslibs/ts/lib/lib.d.ts (used version)
c:/workspaces/solution/project/a.ts (used version)
c:/workspaces/solution/project/b.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Prepend a line to moduleA

Input::
//// [C:/workspaces/solution/project/a.ts]
// some comment
                        
export const a = 1;
export const b = 2;



Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
project/a.ts
  Matched by default include pattern '**/*'
  Imported via "C:/workspaces/solution/project/a" from file 'project/b.ts'
  Imported via "c:/workspaces/solution/project/a" from file 'project/b.ts'
project/b.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [C:/workspaces/solution/project/a.js]
"use strict";
// some comment
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
exports.a = 1;
exports.b = 2;


//// [C:/workspaces/solution/project/b.js] file written with same contents


Program root files: [
  "C:/workspaces/solution/project/a.ts",
  "C:/workspaces/solution/project/b.ts"
]
Program options: {
  "forceConsistentCasingInFileNames": true,
  "watch": true,
  "project": "C:/workspaces/solution/project",
  "explainFiles": true,
  "configFilePath": "C:/workspaces/solution/project/tsconfig.json"
}
Program structureReused: Completely
Program files::
C:/home/src/tslibs/TS/Lib/lib.d.ts
C:/workspaces/solution/project/a.ts
C:/workspaces/solution/project/b.ts

Semantic diagnostics in builder refreshed for::
C:/workspaces/solution/project/a.ts
C:/workspaces/solution/project/b.ts

Shape signatures in builder refreshed for::
c:/workspaces/solution/project/a.ts (computed .d.ts)
c:/workspaces/solution/project/b.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

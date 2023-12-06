currentDirectory:: C:/ useCaseSensitiveFileNames: false
Input::
//// [C:/project/a.ts]

export const a = 1;
export const b = 2;


//// [C:/project/b.ts]

import { a } from "C://project/a"
import { b } from "c://project/a"

a;b;


//// [C:/a/lib/lib.d.ts]
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

//// [C:/project/tsconfig.json]
{
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true
  }
}


C:/a/lib/tsc.js --w --p C://project --explainFiles
Output::
>> Screen clear
[[90m12:00:17 AM[0m] Starting compilation in watch mode...

a/lib/lib.d.ts
  Default library for target 'es5'
project/a.ts
  Matched by default include pattern '**/*'
  Imported via "C://project/a" from file 'project/b.ts'
  Imported via "c://project/a" from file 'project/b.ts'
project/b.ts
  Matched by default include pattern '**/*'
[[90m12:00:22 AM[0m] Found 0 errors. Watching for file changes.



//// [C:/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
exports.a = 1;
exports.b = 2;


//// [C:/project/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a_1 = require("C://project/a");
var a_2 = require("c://project/a");
a_1.a;
a_2.b;



PolledWatches::
C:/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
C:/a/lib/lib.d.ts: *new*
  {}
C:/project/a.ts: *new*
  {}
C:/project/b.ts: *new*
  {}
C:/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
C:/project: *new*
  {}

Program root files: [
  "C:/project/a.ts",
  "C:/project/b.ts"
]
Program options: {
  "forceConsistentCasingInFileNames": true,
  "watch": true,
  "project": "C:/project",
  "explainFiles": true,
  "configFilePath": "C:/project/tsconfig.json"
}
Program structureReused: Not
Program files::
C:/a/lib/lib.d.ts
C:/project/a.ts
C:/project/b.ts

Semantic diagnostics in builder refreshed for::
C:/a/lib/lib.d.ts
C:/project/a.ts
C:/project/b.ts

Shape signatures in builder refreshed for::
c:/a/lib/lib.d.ts (used version)
c:/project/a.ts (used version)
c:/project/b.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Prepend a line to moduleA

Input::
//// [C:/project/a.ts]
// some comment
                        
export const a = 1;
export const b = 2;



Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:25 AM[0m] File change detected. Starting incremental compilation...

a/lib/lib.d.ts
  Default library for target 'es5'
project/a.ts
  Matched by default include pattern '**/*'
  Imported via "C://project/a" from file 'project/b.ts'
  Imported via "c://project/a" from file 'project/b.ts'
project/b.ts
  Matched by default include pattern '**/*'
[[90m12:00:32 AM[0m] Found 0 errors. Watching for file changes.



//// [C:/project/a.js]
"use strict";
// some comment
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
exports.a = 1;
exports.b = 2;


//// [C:/project/b.js] file written with same contents


Program root files: [
  "C:/project/a.ts",
  "C:/project/b.ts"
]
Program options: {
  "forceConsistentCasingInFileNames": true,
  "watch": true,
  "project": "C:/project",
  "explainFiles": true,
  "configFilePath": "C:/project/tsconfig.json"
}
Program structureReused: Completely
Program files::
C:/a/lib/lib.d.ts
C:/project/a.ts
C:/project/b.ts

Semantic diagnostics in builder refreshed for::
C:/project/a.ts
C:/project/b.ts

Shape signatures in builder refreshed for::
c:/project/a.ts (computed .d.ts)
c:/project/b.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

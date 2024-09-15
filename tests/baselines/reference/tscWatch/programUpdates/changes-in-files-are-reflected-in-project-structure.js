currentDirectory:: /user/username/workspace/solution/projects useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/f1.ts]
export * from "./f2"

//// [/user/username/workspace/solution/projects/project/f2.ts]
export let x = 1

//// [/user/username/workspace/solution/projects/projectc/f3.ts]
export let y = 1;

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


/home/src/tslibs/TS/Lib/tsc.js -w /user/username/workspace/solution/projects/project/f1.ts --explainFiles
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

../../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
project/f2.ts
  Imported via "./f2" from file 'project/f1.ts'
project/f1.ts
  Root file specified for compilation
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/f2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 1;


//// [/user/username/workspace/solution/projects/project/f1.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./f2"), exports);



PolledWatches::
/user/username/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/workspace/solution/projects/project/f1.ts: *new*
  {}
/user/username/workspace/solution/projects/project/f2.ts: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/project/f1.ts"
]
Program options: {
  "watch": true,
  "explainFiles": true
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/f2.ts
/user/username/workspace/solution/projects/project/f1.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/f2.ts
/user/username/workspace/solution/projects/project/f1.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/workspace/solution/projects/project/f2.ts (used version)
/user/username/workspace/solution/projects/project/f1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Modify f2 to include f3

Input::
//// [/user/username/workspace/solution/projects/project/f2.ts]
export * from "../projectc/f3"


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

../../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
projectc/f3.ts
  Imported via "../projectc/f3" from file 'project/f2.ts'
project/f2.ts
  Imported via "./f2" from file 'project/f1.ts'
project/f1.ts
  Root file specified for compilation
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/f2.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("../projectc/f3"), exports);


//// [/user/username/workspace/solution/projects/project/f1.js] file written with same contents
//// [/user/username/workspace/solution/projects/projectc/f3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 1;



PolledWatches::
/user/username/workspace/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/workspace/solution/projects/project/f1.ts:
  {}
/user/username/workspace/solution/projects/project/f2.ts:
  {}
/user/username/workspace/solution/projects/projectc/f3.ts: *new*
  {}


Program root files: [
  "/user/username/workspace/solution/projects/project/f1.ts"
]
Program options: {
  "watch": true,
  "explainFiles": true
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/projectc/f3.ts
/user/username/workspace/solution/projects/project/f2.ts
/user/username/workspace/solution/projects/project/f1.ts

Semantic diagnostics in builder refreshed for::
/user/username/workspace/solution/projects/projectc/f3.ts
/user/username/workspace/solution/projects/project/f2.ts
/user/username/workspace/solution/projects/project/f1.ts

Shape signatures in builder refreshed for::
/user/username/workspace/solution/projects/projectc/f3.ts (computed .d.ts)
/user/username/workspace/solution/projects/project/f2.ts (computed .d.ts)
/user/username/workspace/solution/projects/project/f1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

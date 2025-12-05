currentDirectory:: /users/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/users/username/projects/project/moduleFile.ts]
export function bar() { };

//// [/users/username/projects/project/file1.ts]
import * as T from "./moduleFile"; T.bar();

//// [/users/username/projects/project/tsconfig.json]
{}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js -w -p /users/username/projects/project/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/users/username/projects/project/moduleFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = bar;
function bar() { }
;


//// [/users/username/projects/project/file1.js]
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var T = __importStar(require("./moduleFile"));
T.bar();



PolledWatches::
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/users/username/projects/project/file1.ts: *new*
  {}
/users/username/projects/project/moduleFile.ts: *new*
  {}
/users/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project: *new*
  {}

Program root files: [
  "/users/username/projects/project/file1.ts",
  "/users/username/projects/project/moduleFile.ts"
]
Program options: {
  "watch": true,
  "project": "/users/username/projects/project/tsconfig.json",
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/moduleFile.ts
/users/username/projects/project/file1.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/moduleFile.ts
/users/username/projects/project/file1.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/users/username/projects/project/modulefile.ts (used version)
/users/username/projects/project/file1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Rename moduleFile to moduleFile1

Input::
//// [/users/username/projects/project/moduleFile1.ts]
export function bar() { };

//// [/users/username/projects/project/moduleFile.ts] deleted
//// [/users/username/projects/project/moduleFile.js] deleted

Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mfile1.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS2307: [0mCannot find module './moduleFile' or its corresponding type declarations.

[7m1[0m import * as T from "./moduleFile"; T.bar();
[7m [0m [91m                   ~~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/users/username/projects/project/file1.js] file written with same contents
//// [/users/username/projects/project/moduleFile1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = bar;
function bar() { }
;



PolledWatches::
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/moduleFile: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/projects/project: *new*
  {}
/users/username/projects/project/file1.ts:
  {}
/users/username/projects/project/moduleFile1.ts: *new*
  {}
/users/username/projects/project/tsconfig.json:
  {}

FsWatches *deleted*::
/users/username/projects/project/moduleFile.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


Program root files: [
  "/users/username/projects/project/file1.ts",
  "/users/username/projects/project/moduleFile1.ts"
]
Program options: {
  "watch": true,
  "project": "/users/username/projects/project/tsconfig.json",
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/moduleFile1.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/file1.ts
/users/username/projects/project/moduleFile1.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/file1.ts (computed .d.ts)
/users/username/projects/project/modulefile1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Rename moduleFile1 back to moduleFile

Input::
//// [/users/username/projects/project/moduleFile.ts]
export function bar() { };

//// [/users/username/projects/project/moduleFile1.ts] deleted

Timeout callback:: count: 2
7: timerToInvalidateFailedLookupResolutions *new*
8: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
7: timerToInvalidateFailedLookupResolutions
8: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
8: timerToUpdateProgram *deleted*
9: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
9: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/users/username/projects/project/file1.js] file written with same contents
//// [/users/username/projects/project/moduleFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = bar;
function bar() { }
;



PolledWatches::
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/users/username/projects/project/moduleFile:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/projects/project/file1.ts:
  {}
/users/username/projects/project/moduleFile.ts: *new*
  {}
/users/username/projects/project/tsconfig.json:
  {}

FsWatches *deleted*::
/users/username/projects/project:
  {}
/users/username/projects/project/moduleFile1.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}


Program root files: [
  "/users/username/projects/project/file1.ts",
  "/users/username/projects/project/moduleFile.ts"
]
Program options: {
  "watch": true,
  "project": "/users/username/projects/project/tsconfig.json",
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/moduleFile.ts
/users/username/projects/project/file1.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/moduleFile.ts
/users/username/projects/project/file1.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/modulefile.ts (computed .d.ts)
/users/username/projects/project/file1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

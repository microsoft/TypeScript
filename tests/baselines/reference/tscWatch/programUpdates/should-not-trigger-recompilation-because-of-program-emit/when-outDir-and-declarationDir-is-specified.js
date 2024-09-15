currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/file1.ts]
export const c = 30;

//// [/user/username/projects/myproject/src/file2.ts]
import {c} from "file1"; export const d = 30;

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "module": "amd",
    "outDir": "build",
    "declaration": true,
    "declarationDir": "decls"
  }
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


/home/src/tslibs/TS/Lib/tsc.js -w -p /user/username/projects/myproject/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/build/file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.c = void 0;
    exports.c = 30;
});


//// [/user/username/projects/myproject/decls/file1.d.ts]
export declare const c = 30;


//// [/user/username/projects/myproject/build/src/file2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.d = void 0;
    exports.d = 30;
});


//// [/user/username/projects/myproject/decls/src/file2.d.ts]
export declare const d = 30;



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/file1.ts: *new*
  {}
/user/username/projects/myproject/src/file2.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/src: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/file1.ts",
  "/user/username/projects/myproject/src/file2.ts"
]
Program options: {
  "module": 2,
  "outDir": "/user/username/projects/myproject/build",
  "declaration": true,
  "declarationDir": "/user/username/projects/myproject/decls",
  "watch": true,
  "project": "/user/username/projects/myproject/tsconfig.json",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/file1.ts
/user/username/projects/myproject/src/file2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/file1.ts
/user/username/projects/myproject/src/file2.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/file1.ts (computed .d.ts during emit)
/user/username/projects/myproject/src/file2.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined

Change:: Add new file

Input::
//// [/user/username/projects/myproject/src/file3.ts]
export const y = 10;


Timeout callback:: count: 2
1: timerToInvalidateFailedLookupResolutions *new*
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
1: timerToInvalidateFailedLookupResolutions
2: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/build/src/file3.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 10;
});


//// [/user/username/projects/myproject/decls/src/file3.d.ts]
export declare const y = 10;



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/file1.ts:
  {}
/user/username/projects/myproject/src/file2.ts:
  {}
/user/username/projects/myproject/src/file3.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/src:
  {}


Program root files: [
  "/user/username/projects/myproject/file1.ts",
  "/user/username/projects/myproject/src/file2.ts",
  "/user/username/projects/myproject/src/file3.ts"
]
Program options: {
  "module": 2,
  "outDir": "/user/username/projects/myproject/build",
  "declaration": true,
  "declarationDir": "/user/username/projects/myproject/decls",
  "watch": true,
  "project": "/user/username/projects/myproject/tsconfig.json",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/file1.ts
/user/username/projects/myproject/src/file2.ts
/user/username/projects/myproject/src/file3.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/file3.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/src/file3.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined

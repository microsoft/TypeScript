currentDirectory:: /user/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/project/a.ts]
export class C {}

//// [/user/username/projects/project/b.ts]
import {C} from './a'; import * as A from './A';

//// [/user/username/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "forceConsistentCasingInFileNames": false
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


/home/src/tslibs/TS/Lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;


//// [/user/username/projects/project/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



PolledWatches::
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/project/a.ts: *new*
  {}
/user/username/projects/project/b.ts: *new*
  {}
/user/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/project: *new*
  {}

Program root files: [
  "/user/username/projects/project/a.ts",
  "/user/username/projects/project/b.ts"
]
Program options: {
  "forceConsistentCasingInFileNames": false,
  "watch": true,
  "configFilePath": "/user/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/a.ts
/user/username/projects/project/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/a.ts
/user/username/projects/project/b.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/project/a.ts (used version)
/user/username/projects/project/b.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Enable forceConsistentCasingInFileNames

Input::
//// [/user/username/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true
  }
}


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mb.ts[0m:[93m1[0m:[93m43[0m - [91merror[0m[90m TS1149: [0mFile name '/user/username/projects/project/A.ts' differs from already included file name '/user/username/projects/project/a.ts' only in casing.
  The file is in the program because:
    Matched by default include pattern '**/*'
    Imported via './a' from file '/user/username/projects/project/b.ts'
    Imported via './A' from file '/user/username/projects/project/b.ts'

[7m1[0m import {C} from './a'; import * as A from './A';
[7m [0m [91m                                          ~~~~~[0m

  [96mb.ts[0m:[93m1[0m:[93m17[0m
    [7m1[0m import {C} from './a'; import * as A from './A';
    [7m [0m [96m                ~~~~~[0m
    File is included via import here.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/user/username/projects/project/a.ts",
  "/user/username/projects/project/b.ts"
]
Program options: {
  "forceConsistentCasingInFileNames": true,
  "watch": true,
  "configFilePath": "/user/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/a.ts
/user/username/projects/project/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

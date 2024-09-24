currentDirectory:: /user/username/workspace/solution/projects useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/file1.ts]
import { T } from "module1";

//// [/user/username/workspace/solution/projects/project/node_modules/module1.ts]
export interface T {}

//// [/user/username/workspace/solution/projects/module1.ts]
export interface T {}

//// [/user/username/workspace/solution/projects/project/tsconfig.json]
{
                    "compilerOptions": {
                        "moduleResolution": "node"
                    },
                    "files": ["/user/username/workspace/solution/projects/project/file1.ts"]
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


/home/src/tslibs/TS/Lib/tsc.js -w -p /user/username/workspace/solution/projects/project/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



PolledWatches::
/user/username/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/package.json: *new*
  {"pollingInterval":2000}
/user/username/workspace/solution/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/package.json: *new*
  {"pollingInterval":2000}
/user/username/workspace/solution/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/package.json: *new*
  {"pollingInterval":2000}
/user/username/workspace/solution/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/project/node_modules/package.json: *new*
  {"pollingInterval":2000}
/user/username/workspace/solution/projects/project/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/workspace/solution/projects/project/file1.ts: *new*
  {}
/user/username/workspace/solution/projects/project/node_modules/module1.ts: *new*
  {}
/user/username/workspace/solution/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/workspace/solution/projects/project/node_modules: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/project/file1.ts"
]
Program options: {
  "moduleResolution": 2,
  "watch": true,
  "project": "/user/username/workspace/solution/projects/project/tsconfig.json",
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/node_modules/module1.ts
/user/username/workspace/solution/projects/project/file1.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/node_modules/module1.ts
/user/username/workspace/solution/projects/project/file1.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/workspace/solution/projects/project/node_modules/module1.ts (used version)
/user/username/workspace/solution/projects/project/file1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Change module resolution to classic

Input::
//// [/user/username/workspace/solution/projects/project/tsconfig.json]
{
                        "compilerOptions": {
                            "moduleResolution": "classic"
                        },
                        "files": ["/user/username/workspace/solution/projects/project/file1.ts"]
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

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/file1.js] file written with same contents
//// [/user/username/workspace/solution/projects/module1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



PolledWatches::
/user/username/workspace/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/solution/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/workspace/package.json:
  {"pollingInterval":2000}
/user/username/workspace/solution/package.json:
  {"pollingInterval":2000}
/user/username/workspace/solution/projects/package.json:
  {"pollingInterval":2000}
/user/username/workspace/solution/projects/project/node_modules/package.json:
  {"pollingInterval":2000}
/user/username/workspace/solution/projects/project/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/workspace/solution/projects/module1.ts: *new*
  {}
/user/username/workspace/solution/projects/project: *new*
  {}
/user/username/workspace/solution/projects/project/file1.ts:
  {}
/user/username/workspace/solution/projects/project/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/workspace/solution/projects/project/node_modules/module1.ts:
  {}

FsWatchesRecursive *deleted*::
/user/username/workspace/solution/projects/project/node_modules:
  {}


Program root files: [
  "/user/username/workspace/solution/projects/project/file1.ts"
]
Program options: {
  "moduleResolution": 1,
  "watch": true,
  "project": "/user/username/workspace/solution/projects/project/tsconfig.json",
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/module1.ts
/user/username/workspace/solution/projects/project/file1.ts

Semantic diagnostics in builder refreshed for::
/user/username/workspace/solution/projects/module1.ts
/user/username/workspace/solution/projects/project/file1.ts

Shape signatures in builder refreshed for::
/user/username/workspace/solution/projects/module1.ts (computed .d.ts)
/user/username/workspace/solution/projects/project/file1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

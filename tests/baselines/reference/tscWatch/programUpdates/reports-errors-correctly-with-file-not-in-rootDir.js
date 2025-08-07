currentDirectory:: /user/username/workspaces/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspaces/projects/myproject/a.ts]
import { x } from "../b";

//// [/user/username/workspaces/projects/b.ts]
export const x = 10;

//// [/user/username/workspaces/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "rootDir": ".",
    "outDir": "lib"
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

[96ma.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS6059: [0mFile '/user/username/workspaces/projects/b.ts' is not under 'rootDir' '/user/username/workspaces/projects/myproject'. 'rootDir' is expected to contain all source files.

[7m1[0m import { x } from "../b";
[7m [0m [91m                  ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/workspaces/projects/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/user/username/workspaces/projects/myproject/lib/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



PolledWatches::
/user/username/workspaces/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspaces/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspaces/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/workspaces/projects/b.ts: *new*
  {}
/user/username/workspaces/projects/myproject/a.ts: *new*
  {}
/user/username/workspaces/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/workspaces/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/workspaces/projects/myproject/a.ts"
]
Program options: {
  "rootDir": "/user/username/workspaces/projects/myproject",
  "outDir": "/user/username/workspaces/projects/myproject/lib",
  "watch": true,
  "configFilePath": "/user/username/workspaces/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspaces/projects/b.ts
/user/username/workspaces/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspaces/projects/b.ts
/user/username/workspaces/projects/myproject/a.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/workspaces/projects/b.ts (used version)
/user/username/workspaces/projects/myproject/a.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Make changes to file a

Input::
//// [/user/username/workspaces/projects/myproject/a.ts]


import { x } from "../b";


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m3[0m:[93m19[0m - [91merror[0m[90m TS6059: [0mFile '/user/username/workspaces/projects/b.ts' is not under 'rootDir' '/user/username/workspaces/projects/myproject'. 'rootDir' is expected to contain all source files.

[7m3[0m import { x } from "../b";
[7m [0m [91m                  ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/workspaces/projects/myproject/lib/a.js] file written with same contents


Program root files: [
  "/user/username/workspaces/projects/myproject/a.ts"
]
Program options: {
  "rootDir": "/user/username/workspaces/projects/myproject",
  "outDir": "/user/username/workspaces/projects/myproject/lib",
  "watch": true,
  "configFilePath": "/user/username/workspaces/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspaces/projects/b.ts
/user/username/workspaces/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/workspaces/projects/myproject/a.ts

Shape signatures in builder refreshed for::
/user/username/workspaces/projects/myproject/a.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

currentDirectory:: /users/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/users/username/projects/project/foo.ts]

import * as fs from "fs";
import * as u from "url";


//// [/users/username/projects/project/bar.d.ts]

declare module "url" {
    export interface Url {
        href?: string;
    }
}


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


/home/src/tslibs/TS/Lib/tsc.js --w /users/username/projects/project/foo.ts /users/username/projects/project/bar.d.ts
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mfoo.ts[0m:[93m2[0m:[93m21[0m - [91merror[0m[90m TS2591: [0mCannot find name 'fs'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.

[7m2[0m import * as fs from "fs";
[7m [0m [91m                    ~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/users/username/projects/project/foo.js]
export {};



PolledWatches::
/users/username/projects/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {}
/users/username/projects: *new*
  {}
/users/username/projects/project: *new*
  {}
/users/username/projects/project/bar.d.ts: *new*
  {}
/users/username/projects/project/foo.ts: *new*
  {}

Program root files: [
  "/users/username/projects/project/foo.ts",
  "/users/username/projects/project/bar.d.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/users/username/projects/project/foo.ts
/users/username/projects/project/bar.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/users/username/projects/project/foo.ts
/users/username/projects/project/bar.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/users/username/projects/project/foo.ts (used version)
/users/username/projects/project/bar.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Add fs definition

Input::
//// [/users/username/projects/project/bar.d.ts]

declare module "url" {
    export interface Url {
        href?: string;
    }
}

declare module "fs" {
    export interface Stats {
        isFile(): boolean;
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

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/users/username/projects/project/foo.js] file written with same contents


Program root files: [
  "/users/username/projects/project/foo.ts",
  "/users/username/projects/project/bar.d.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/users/username/projects/project/foo.ts
/users/username/projects/project/bar.d.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/foo.ts
/users/username/projects/project/bar.d.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/bar.d.ts (used version)
/users/username/projects/project/foo.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

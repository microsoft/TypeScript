currentDirectory:: /users/username/projects/project useCaseSensitiveFileNames: false
Input::
//// [/a/lib/lib.d.ts]
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

//// [/users/username/projects/project/node_modules/tslib/index.d.ts]
export function __assign(...args: any[]): any;

//// [/users/username/projects/project/node_modules/tslib/package.json]
{
  "name": "tslib",
  "version": "0.0.1"
}

//// [/users/username/projects/project/index.tsx]
export const x = {...{}};

//// [/users/username/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "importHelpers": true
  }
}


/a/lib/tsc.js -w
Output::
>> Screen clear
[[90m12:00:29 AM[0m] Starting compilation in watch mode...

[[90m12:00:32 AM[0m] Found 0 errors. Watching for file changes.



//// [/users/username/projects/project/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var tslib_1 = require("tslib");
exports.x = tslib_1.__assign({});



PolledWatches::
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/users/username/projects/project/index.tsx: *new*
  {}
/users/username/projects/project/node_modules/tslib/index.d.ts: *new*
  {}
/users/username/projects/project/node_modules/tslib/package.json: *new*
  {}
/users/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project: *new*
  {}
/users/username/projects/project/node_modules: *new*
  {}

Program root files: [
  "/users/username/projects/project/index.tsx"
]
Program options: {
  "importHelpers": true,
  "watch": true,
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/node_modules/tslib/index.d.ts
/users/username/projects/project/index.tsx

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/node_modules/tslib/index.d.ts
/users/username/projects/project/index.tsx

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/users/username/projects/project/node_modules/tslib/index.d.ts (used version)
/users/username/projects/project/index.tsx (used version)

exitCode:: ExitStatus.undefined

Change::

Input::
//// [/users/username/projects/project/node_modules/tslib/index.d.ts] deleted
//// [/users/username/projects/project/node_modules/tslib/package.json] deleted

PolledWatches *deleted*::
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches *deleted*::
/a/lib/lib.d.ts:
  {}
/users/username/projects/project/index.tsx:
  {}
/users/username/projects/project/node_modules/tslib/index.d.ts:
  {}
/users/username/projects/project/node_modules/tslib/package.json:
  {}
/users/username/projects/project/tsconfig.json:
  {}

FsWatchesRecursive *deleted*::
/users/username/projects/project:
  {}
/users/username/projects/project/node_modules:
  {}

Output::
>> Screen clear
[[90m12:00:35 AM[0m] Starting compilation in watch mode...

[96mindex.tsx[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2354: [0mThis syntax requires an imported helper but module 'tslib' cannot be found.

[7m1[0m export const x = {...{}};
[7m [0m [91m                  ~~~~~[0m

[[90m12:00:39 AM[0m] Found 1 error. Watching for file changes.



//// [/users/username/projects/project/index.js] file written with same contents

PolledWatches::
/users/username/projects/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/users/username/projects/project/index.tsx: *new*
  {}
/users/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project: *new*
  {}
/users/username/projects/project/node_modules: *new*
  {}

Program root files: [
  "/users/username/projects/project/index.tsx"
]
Program options: {
  "importHelpers": true,
  "watch": true,
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/index.tsx

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/index.tsx

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/users/username/projects/project/index.tsx (used version)

exitCode:: ExitStatus.undefined

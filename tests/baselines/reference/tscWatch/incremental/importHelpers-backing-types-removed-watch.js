currentDirectory:: /users/username/projects/project useCaseSensitiveFileNames:: false
Input::
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


/home/src/tslibs/TS/Lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/users/username/projects/project/index.js]
export const x = { ...{} };



FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {}
/users/username/projects: *new*
  {}
/users/username/projects/project: *new*
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
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/users/username/projects/project/node_modules/tslib/index.d.ts
/users/username/projects/project/index.tsx

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/users/username/projects/project/node_modules/tslib/index.d.ts
/users/username/projects/project/index.tsx

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/users/username/projects/project/node_modules/tslib/index.d.ts (used version)
/users/username/projects/project/index.tsx (used version)

exitCode:: ExitStatus.undefined

Change::

Input::
//// [/users/username/projects/project/node_modules/tslib/index.d.ts] deleted
//// [/users/username/projects/project/node_modules/tslib/package.json] deleted

FsWatches *deleted*::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts:
  {}
/users/username/projects:
  {}
/users/username/projects/project:
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
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/users/username/projects/project/index.js] file written with same contents

PolledWatches::
/users/username/projects/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {}
/users/username/projects: *new*
  {}
/users/username/projects/project: *new*
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
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/users/username/projects/project/index.tsx

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/users/username/projects/project/index.tsx

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/users/username/projects/project/index.tsx (used version)

exitCode:: ExitStatus.undefined

currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "moduleResolution": "node16"
  }
}

//// [/user/username/projects/myproject/index.ts]
/// <reference types="pkg" resolution-mode="import"/>
/// <reference types="pkg1" resolution-mode="require"/>
export interface LocalInterface extends RequireInterface {}


//// [/user/username/projects/myproject/a.ts]
export const x = 10;


//// [/user/username/projects/myproject/node_modules/pkg/package.json]
{
  "name": "pkg",
  "version": "0.0.1",
  "exports": {
    "import": "./import.js",
    "require": "./require.js"
  }
}

//// [/user/username/projects/myproject/node_modules/pkg/import.d.ts]
export {};
declare global {
    interface ImportInterface {}
}


//// [/user/username/projects/myproject/node_modules/pkg/require.d.ts]
export {};
declare global {
    interface RequireInterface {}
}


//// [/user/username/projects/myproject/node_modules/pkg1/package.json]
{
  "name": "pkg1",
  "version": "0.0.1",
  "exports": {
    "import": "./import.js",
    "require": "./require.js"
  }
}

//// [/user/username/projects/myproject/node_modules/pkg1/import.d.ts]
export {};
declare global {
    interface ImportInterface {}
}


//// [/user/username/projects/myproject/node_modules/@types/pkg2/index.d.ts]
export const x = 10;

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


/a/lib/tsc.js -w --traceResolution
Output::
>> Screen clear
[[90m12:00:45 AM[0m] Starting compilation in watch mode...

File '/user/username/projects/myproject/package.json' does not exist.
File '/user/username/projects/package.json' does not exist.
File '/user/username/package.json' does not exist.
File '/user/package.json' does not exist.
File '/package.json' does not exist.
File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving type reference directive 'pkg', containing file '/user/username/projects/myproject/index.ts', root directory '/user/username/projects/myproject/node_modules/@types,/user/username/projects/node_modules/@types,/user/username/node_modules/@types,/user/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types, /user/username/projects/node_modules/@types, /user/username/node_modules/@types, /user/node_modules/@types, /node_modules/@types'.
Directory '/user/username/projects/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Looking up in 'node_modules' folder, initial location '/user/username/projects/myproject'.
Searching all ancestor node_modules directories for preferred extensions: Declaration.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg/package.json'.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './import.js'.
File name '/user/username/projects/myproject/node_modules/pkg/import.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg/import.d.ts' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg/import.d.ts', result '/user/username/projects/myproject/node_modules/pkg/import.d.ts'.
======== Type reference directive 'pkg' was successfully resolved to '/user/username/projects/myproject/node_modules/pkg/import.d.ts' with Package ID 'pkg/import.d.ts@0.0.1', primary: false. ========
======== Resolving type reference directive 'pkg1', containing file '/user/username/projects/myproject/index.ts', root directory '/user/username/projects/myproject/node_modules/@types,/user/username/projects/node_modules/@types,/user/username/node_modules/@types,/user/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types, /user/username/projects/node_modules/@types, /user/username/node_modules/@types, /user/node_modules/@types, /node_modules/@types'.
Directory '/user/username/projects/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Looking up in 'node_modules' folder, initial location '/user/username/projects/myproject'.
Searching all ancestor node_modules directories for preferred extensions: Declaration.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg1/package.json'.
Entering conditional exports.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/user/username/projects/myproject/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg1/require.d.ts' does not exist.
Failed to resolve under condition 'require'.
Exiting conditional exports.
File '/user/username/projects/myproject/node_modules/@types/pkg1.d.ts' does not exist.
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg1' was not resolved. ========
File '/user/username/projects/myproject/node_modules/pkg/package.json' exists according to earlier cached lookups.
======== Resolving type reference directive 'pkg2', containing file '/user/username/projects/myproject/__inferred type names__.ts', root directory '/user/username/projects/myproject/node_modules/@types,/user/username/projects/node_modules/@types,/user/username/node_modules/@types,/user/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types, /user/username/projects/node_modules/@types, /user/username/node_modules/@types, /user/node_modules/@types, /node_modules/@types'.
File '/user/username/projects/myproject/node_modules/@types/pkg2/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/@types/pkg2/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/@types/pkg2/index.d.ts', result '/user/username/projects/myproject/node_modules/@types/pkg2/index.d.ts'.
======== Type reference directive 'pkg2' was successfully resolved to '/user/username/projects/myproject/node_modules/@types/pkg2/index.d.ts', primary: true. ========
File '/user/username/projects/myproject/node_modules/@types/pkg2/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/node_modules/@types/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/package.json' does not exist.
File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:00:50 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/user/username/projects/myproject/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="pkg" resolution-mode="import"/>
/// <reference types="pkg1" resolution-mode="require"/>



PolledWatches::
/user/username/projects/myproject/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types/pkg2/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/a.ts: *new*
  {}
/user/username/projects/myproject/index.ts: *new*
  {}
/user/username/projects/myproject/node_modules/@types/pkg2/index.d.ts: *new*
  {}
/user/username/projects/myproject/node_modules/pkg/import.d.ts: *new*
  {}
/user/username/projects/myproject/node_modules/pkg/package.json: *new*
  {}
/user/username/projects/myproject/node_modules/pkg1/package.json: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/node_modules: *new*
  {}
/user/username/projects/myproject/node_modules/@types: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/index.ts"
]
Program options: {
  "moduleResolution": 3,
  "watch": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/node_modules/pkg/import.d.ts
/user/username/projects/myproject/index.ts
/user/username/projects/myproject/node_modules/@types/pkg2/index.d.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/a.ts (used version)
/user/username/projects/myproject/node_modules/pkg/import.d.ts (used version)
/user/username/projects/myproject/index.ts (used version)
/user/username/projects/myproject/node_modules/@types/pkg2/index.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: modify aFile by adding import

Input::
//// [/user/username/projects/myproject/a.ts]
/// <reference types="pkg" resolution-mode="import"/>
export const x = 10;



Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:53 AM[0m] File change detected. Starting incremental compilation...

File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/node_modules/pkg/package.json' exists according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/node_modules/@types/pkg2/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/node_modules/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving type reference directive 'pkg', containing file '/user/username/projects/myproject/a.ts', root directory '/user/username/projects/myproject/node_modules/@types,/user/username/projects/node_modules/@types,/user/username/node_modules/@types,/user/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types, /user/username/projects/node_modules/@types, /user/username/node_modules/@types, /user/node_modules/@types, /node_modules/@types'.
Directory '/user/username/projects/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Looking up in 'node_modules' folder, initial location '/user/username/projects/myproject'.
Searching all ancestor node_modules directories for preferred extensions: Declaration.
File '/user/username/projects/myproject/node_modules/pkg/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './import.js'.
File name '/user/username/projects/myproject/node_modules/pkg/import.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg/import.d.ts' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg/import.d.ts', result '/user/username/projects/myproject/node_modules/pkg/import.d.ts'.
======== Type reference directive 'pkg' was successfully resolved to '/user/username/projects/myproject/node_modules/pkg/import.d.ts' with Package ID 'pkg/import.d.ts@0.0.1', primary: false. ========
File '/user/username/projects/myproject/node_modules/pkg/package.json' exists according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of type reference directive 'pkg' from '/user/username/projects/myproject/index.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/pkg/import.d.ts' with Package ID 'pkg/import.d.ts@0.0.1'.
Reusing resolution of type reference directive 'pkg1' from '/user/username/projects/myproject/index.ts' of old program, it was not resolved.
Reusing resolution of type reference directive 'pkg2' from '/user/username/projects/myproject/__inferred type names__.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/@types/pkg2/index.d.ts'.
File '/user/username/projects/myproject/node_modules/@types/pkg2/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/node_modules/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:00:57 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
/// <reference types="pkg" resolution-mode="import"/>
exports.x = 10;




Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/index.ts"
]
Program options: {
  "moduleResolution": 3,
  "watch": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/node_modules/pkg/import.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/index.ts
/user/username/projects/myproject/node_modules/@types/pkg2/index.d.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/user/username/projects/myproject/a.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

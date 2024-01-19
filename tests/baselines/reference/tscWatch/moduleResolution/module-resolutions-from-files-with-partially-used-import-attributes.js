currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "moduleResolution": "node16"
  }
}

//// [/user/username/projects/myproject/index.ts]
import type { ImportInterface } from "pkg" with { "resolution-mode": "import" };
import type { RequireInterface } from "pkg1" with { "resolution-mode": "require" };
import {x} from "./a";


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
export interface ImportInterface {}

//// [/user/username/projects/myproject/node_modules/pkg/require.d.ts]
export interface RequireInterface {}

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
export interface ImportInterface {}

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
[[90m12:00:39 AM[0m] Starting compilation in watch mode...

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
======== Resolving module 'pkg' from '/user/username/projects/myproject/index.ts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg/package.json'.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './import.js'.
File name '/user/username/projects/myproject/node_modules/pkg/import.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg/import.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg/import.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg/import.d.ts' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg/import.d.ts', result '/user/username/projects/myproject/node_modules/pkg/import.d.ts'.
======== Module name 'pkg' was successfully resolved to '/user/username/projects/myproject/node_modules/pkg/import.d.ts' with Package ID 'pkg/import.d.ts@0.0.1'. ========
======== Resolving module 'pkg1' from '/user/username/projects/myproject/index.ts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg1/package.json'.
Entering conditional exports.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/user/username/projects/myproject/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg1/require.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg1/require.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg1/require.d.ts' does not exist.
Failed to resolve under condition 'require'.
Exiting conditional exports.
Directory '/user/username/projects/myproject/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/user/username/projects/myproject/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/user/username/projects/myproject/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg1/require.js' does not exist.
File '/user/username/projects/myproject/node_modules/pkg1/require.jsx' does not exist.
Failed to resolve under condition 'require'.
Exiting conditional exports.
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module './a' from '/user/username/projects/myproject/index.ts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/a', target file types: TypeScript, JavaScript, Declaration.
File '/user/username/projects/myproject/a.ts' exists - use it as a name resolution result.
======== Module name './a' was successfully resolved to '/user/username/projects/myproject/a.ts'. ========
File '/user/username/projects/myproject/node_modules/pkg/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:00:44 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/user/username/projects/myproject/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
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
/user/username/projects: *new*
  {}
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/a.ts: *new*
  {}
/user/username/projects/myproject/index.ts: *new*
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

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/a.ts (used version)
/user/username/projects/myproject/node_modules/pkg/import.d.ts (used version)
/user/username/projects/myproject/index.ts (used version)

exitCode:: ExitStatus.undefined

Change:: modify aFile by adding import

Input::
//// [/user/username/projects/myproject/a.ts]
export const x = 10;
import type { ImportInterface } from "pkg" with { "resolution-mode": "import" }


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:47 AM[0m] File change detected. Starting incremental compilation...

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
File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module 'pkg' from '/user/username/projects/myproject/a.ts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/user/username/projects/myproject/node_modules/pkg/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './import.js'.
File name '/user/username/projects/myproject/node_modules/pkg/import.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg/import.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg/import.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg/import.d.ts' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg/import.d.ts', result '/user/username/projects/myproject/node_modules/pkg/import.d.ts'.
======== Module name 'pkg' was successfully resolved to '/user/username/projects/myproject/node_modules/pkg/import.d.ts' with Package ID 'pkg/import.d.ts@0.0.1'. ========
File '/user/username/projects/myproject/node_modules/pkg/package.json' exists according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg' from '/user/username/projects/myproject/index.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/pkg/import.d.ts' with Package ID 'pkg/import.d.ts@0.0.1'.
Reusing resolution of module './a' from '/user/username/projects/myproject/index.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/a.ts'.
Reusing resolution of module 'pkg1' from '/user/username/projects/myproject/index.ts' of old program, it was not resolved.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:00:54 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/a.js] file written with same contents
//// [/user/username/projects/myproject/index.js] file written with same contents


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

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/user/username/projects/myproject/a.ts (computed .d.ts)
/user/username/projects/myproject/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

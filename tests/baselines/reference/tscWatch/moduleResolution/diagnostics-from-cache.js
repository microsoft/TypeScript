currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "moduleResolution": "nodenext",
    "outDir": "./dist",
    "declaration": true,
    "declarationDir": "./types"
  }
}

//// [/user/username/projects/myproject/package.json]
{
  "name": "@this/package",
  "type": "module",
  "exports": {
    ".": {
      "default": "./dist/index.js",
      "types": "./types/index.d.ts"
    }
  }
}

//// [/user/username/projects/myproject/index.ts]
import * as me from "@this/package";
me.thing()
export function thing(): void {}


//// [/user/username/projects/myproject/index2.ts]
export function thing(): void {}


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
[[90m12:00:25 AM[0m] Starting compilation in watch mode...

Found 'package.json' at '/user/username/projects/myproject/package.json'.
======== Resolving module '@this/package' from '/user/username/projects/myproject/index.ts'. ========
Explicitly specified module resolution kind: 'NodeNext'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'default'.
Using 'exports' subpath '.' with target './dist/index.js'.
File '/user/username/projects/myproject/index.ts' exists - use it as a name resolution result.
Resolved under condition 'default'.
Exiting conditional exports.
Resolving real path for '/user/username/projects/myproject/index.ts', result '/user/username/projects/myproject/index.ts'.
======== Module name '@this/package' was successfully resolved to '/user/username/projects/myproject/index.ts'. ========
File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
[91merror[0m[90m TS2209: [0mThe project root is ambiguous, but is required to resolve export map entry '.' in file '/user/username/projects/myproject/package.json'. Supply the `rootDir` compiler option to disambiguate.

[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'NodeNext' when option 'moduleResolution' is set to 'NodeNext'.

[[90m12:00:40 AM[0m] Found 2 errors. Watching for file changes.



//// [/user/username/projects/myproject/dist/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thing = void 0;
var me = require("@this/package");
me.thing();
function thing() { }
exports.thing = thing;


//// [/user/username/projects/myproject/types/index.d.ts]
export declare function thing(): void;


//// [/user/username/projects/myproject/dist/index2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thing = void 0;
function thing() { }
exports.thing = thing;


//// [/user/username/projects/myproject/types/index2.d.ts]
export declare function thing(): void;



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/index.ts: *new*
  {}
/user/username/projects/myproject/index2.ts: *new*
  {}
/user/username/projects/myproject/package.json: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/index.ts",
  "/user/username/projects/myproject/index2.ts"
]
Program options: {
  "moduleResolution": 99,
  "outDir": "/user/username/projects/myproject/dist",
  "declaration": true,
  "declarationDir": "/user/username/projects/myproject/types",
  "watch": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/index.ts
/user/username/projects/myproject/index2.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/index.ts (computed .d.ts during emit)
/user/username/projects/myproject/index2.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: Add import to index2

Input::
//// [/user/username/projects/myproject/index2.ts]
import * as me from "./index.js";export function thing(): void {}



Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:43 AM[0m] File change detected. Starting incremental compilation...

File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
Reusing resolution of module '@this/package' from '/user/username/projects/myproject/index.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/index.ts'.
File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
======== Resolving module './index.js' from '/user/username/projects/myproject/index2.ts'. ========
Explicitly specified module resolution kind: 'NodeNext'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/index.js', target file types: TypeScript, JavaScript, Declaration.
File name '/user/username/projects/myproject/index.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/index.ts' exists - use it as a name resolution result.
======== Module name './index.js' was successfully resolved to '/user/username/projects/myproject/index.ts'. ========
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS2209: [0mThe project root is ambiguous, but is required to resolve export map entry '.' in file '/user/username/projects/myproject/package.json'. Supply the `rootDir` compiler option to disambiguate.

[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'NodeNext' when option 'moduleResolution' is set to 'NodeNext'.

[[90m12:00:50 AM[0m] Found 2 errors. Watching for file changes.



//// [/user/username/projects/myproject/dist/index2.js] file written with same contents
//// [/user/username/projects/myproject/types/index2.d.ts] file written with same contents


Program root files: [
  "/user/username/projects/myproject/index.ts",
  "/user/username/projects/myproject/index2.ts"
]
Program options: {
  "moduleResolution": 99,
  "outDir": "/user/username/projects/myproject/dist",
  "declaration": true,
  "declarationDir": "/user/username/projects/myproject/types",
  "watch": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/index.ts
/user/username/projects/myproject/index2.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/user/username/projects/myproject/index2.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

currentDirectory:: /home/src/projects/project useCaseSensitiveFileNames: false
Input::
//// [/home/src/projects/project/node_modules/@types/bar/package.json]
{
 "name": "@types/bar",
 "version": "1.0.0",
 "types": "index.d.ts",
 "exports": {
  ".": {
   "require": "./index.d.ts"
  }
 }
}

//// [/home/src/projects/project/node_modules/@types/bar/index.d.ts]
export declare const bar: number;

//// [/home/src/projects/project/node_modules/bar/package.json]
{
 "name": "bar",
 "version": "1.0.0",
 "main": "index.js",
 "exports": {
  ".": {
   "import": "./index.mjs",
   "require": "./index.js"
  }
 }
}

//// [/home/src/projects/project/node_modules/bar/index.js]
module.exports = { bar: 1 };

//// [/home/src/projects/project/node_modules/bar/index.mjs]
export const bar = 1;

//// [/home/src/projects/project/node_modules/foo/package.json]
{
 "name": "foo",
 "version": "1.0.0",
 "main": "index.js",
 "types": "index.d.ts",
 "exports": {
  ".": {
   "import": "./index.mjs",
   "require": "./index.js"
  }
 }
}

//// [/home/src/projects/project/node_modules/foo/index.js]
module.exports = { foo: 1 };

//// [/home/src/projects/project/node_modules/foo/index.mjs]
export const foo = 1;

//// [/home/src/projects/project/node_modules/foo/index.d.ts]
export declare const foo: number;

//// [/home/src/projects/project/node_modules/@types/bar2/package.json]
{
 "name": "@types/bar2",
 "version": "1.0.0",
 "types": "index.d.ts",
 "exports": {
  ".": {
   "types": "./index.d.ts",
   "require": "./index.d.ts"
  }
 }
}

//// [/home/src/projects/project/node_modules/@types/bar2/index.d.ts]
export declare const bar2: number;

//// [/home/src/projects/project/node_modules/bar2/package.json]
{
 "name": "bar2",
 "version": "1.0.0",
 "main": "index.js",
 "exports": {
  ".": {
   "import": "./index.mjs",
   "require": "./index.js"
  }
 }
}

//// [/home/src/projects/project/node_modules/bar2/index.js]
module.exports = { bar2: 1 };

//// [/home/src/projects/project/node_modules/bar2/index.mjs]
export const bar2 = 1;

//// [/home/src/projects/project/node_modules/foo2/package.json]
{
 "name": "foo2",
 "version": "1.0.0",
 "main": "index.js",
 "types": "index.d.ts",
 "exports": {
  ".": {
   "types": "./index.d.ts",
   "import": "./index.mjs",
   "require": "./index.js"
  }
 }
}

//// [/home/src/projects/project/node_modules/foo2/index.js]
module.exports = { foo2: 1 };

//// [/home/src/projects/project/node_modules/foo2/index.mjs]
export const foo2 = 1;

//// [/home/src/projects/project/node_modules/foo2/index.d.ts]
export declare const foo2: number;

//// [/home/src/projects/project/index.mts]
import { foo } from "foo";
import { bar } from "bar";
import { foo2 } from "foo2";
import { bar2 } from "bar2";


//// [/home/src/projects/project/tsconfig.json]
{"compilerOptions":{"moduleResolution":"node16","traceResolution":true,"incremental":true,"strict":true,"types":[]},"files":["index.mts"]}

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


/a/lib/tsc.js -w --extendedDiagnostics
Output::
[[90m12:01:13 AM[0m] Starting compilation in watch mode...

Current directory: /home/src/projects/project CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/index.mts 250 undefined Source file
======== Resolving module 'foo' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist.
File '/home/src/projects/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
Loading module 'foo' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/projects/project/node_modules/foo/package.json'.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/foo/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/foo/index.mts' does not exist.
File '/home/src/projects/project/node_modules/foo/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/foo/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/foo/index.mjs' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolution of non-relative name failed; trying with modern Node resolution features disabled to see if npm library needs configuration update.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/projects/project/node_modules/foo/index.d.ts'.
File '/home/src/projects/project/node_modules/foo/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/project/node_modules/foo/index.mjs', result '/home/src/projects/project/node_modules/foo/index.mjs'.
======== Module name 'foo' was successfully resolved to '/home/src/projects/project/node_modules/foo/index.mjs' with Package ID 'foo/index.mjs@1.0.0'. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects 0 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project 0 undefined Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/foo/package.json 2000 undefined File location affecting resolution
======== Resolving module 'bar' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/projects/project/node_modules/bar/package.json'.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar/index.mts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Found 'package.json' at '/home/src/projects/project/node_modules/@types/bar/package.json'.
Entering conditional exports.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/projects/project/node_modules/bar/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar/index.mjs' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolution of non-relative name failed; trying with modern Node resolution features disabled to see if npm library needs configuration update.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/bar/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'index.js' that references '/home/src/projects/project/node_modules/bar/index.js'.
File '/home/src/projects/project/node_modules/bar/index.js' exists - use it as a name resolution result.
File '/home/src/projects/project/node_modules/bar/index.js' has an unsupported extension, so skipping it.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/bar/index.js', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/bar/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/bar/index.ts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar/index.d.ts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.js.ts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.js.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar/index.js.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/bar/index.js' does not exist, skipping all lookups in it.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/projects/project/node_modules/@types/bar/index.d.ts'.
File '/home/src/projects/project/node_modules/@types/bar/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/project/node_modules/bar/index.mjs', result '/home/src/projects/project/node_modules/bar/index.mjs'.
======== Module name 'bar' was successfully resolved to '/home/src/projects/project/node_modules/bar/index.mjs' with Package ID 'bar/index.mjs@1.0.0'. ========
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/bar/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types/bar/package.json 2000 undefined File location affecting resolution
======== Resolving module 'foo2' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/projects/project/node_modules/foo2/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath '.' with target './index.d.ts'.
File '/home/src/projects/project/node_modules/foo2/index.d.ts' exists - use it as a name resolution result.
Resolved under condition 'types'.
Exiting conditional exports.
Resolving real path for '/home/src/projects/project/node_modules/foo2/index.d.ts', result '/home/src/projects/project/node_modules/foo2/index.d.ts'.
======== Module name 'foo2' was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.d.ts' with Package ID 'foo2/index.d.ts@1.0.0'. ========
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/foo2/package.json 2000 undefined File location affecting resolution
======== Resolving module 'bar2' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/projects/project/node_modules/bar2/package.json'.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar2/index.mts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Found 'package.json' at '/home/src/projects/project/node_modules/@types/bar2/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath '.' with target './index.d.ts'.
File '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' exists - use it as a name resolution result.
Resolved under condition 'types'.
Exiting conditional exports.
Resolving real path for '/home/src/projects/project/node_modules/@types/bar2/index.d.ts', result '/home/src/projects/project/node_modules/@types/bar2/index.d.ts'.
======== Module name 'bar2' was successfully resolved to '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' with Package ID '@types/bar2/index.d.ts@1.0.0'. ========
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/bar2/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types/bar2/package.json 2000 undefined File location affecting resolution
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/foo2/index.d.ts 250 undefined Source file
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types/bar2/index.d.ts 250 undefined Source file
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/projects/project/index.mjs :: WatchInfo: /home/src/projects/project 0 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/index.mjs :: WatchInfo: /home/src/projects/project 0 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/projects/project/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/project 0 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/project 0 undefined Failed Lookup Locations
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:01:18 AM[0m] Found 1 error. Watching for file changes.

DirectoryWatcher:: Triggered with /home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/project 0 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/project 0 undefined Failed Lookup Locations


Program root files: ["/home/src/projects/project/index.mts"]
Program options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/home/src/projects/project/node_modules/foo2/index.d.ts
/home/src/projects/project/node_modules/@types/bar2/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/home/src/projects/project/node_modules/foo2/index.d.ts (used version)
/home/src/projects/project/node_modules/@types/bar2/index.d.ts (used version)
/home/src/projects/project/index.mts (used version)

PolledWatches::
/home/src/projects/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/home/src/projects: *new*
  {}
/home/src/projects/project: *new*
  {}
/home/src/projects/project/index.mts: *new*
  {}
/home/src/projects/project/node_modules/@types/bar/package.json: *new*
  {}
/home/src/projects/project/node_modules/@types/bar2/index.d.ts: *new*
  {}
/home/src/projects/project/node_modules/@types/bar2/package.json: *new*
  {}
/home/src/projects/project/node_modules/bar/package.json: *new*
  {}
/home/src/projects/project/node_modules/bar2/package.json: *new*
  {}
/home/src/projects/project/node_modules/foo/package.json: *new*
  {}
/home/src/projects/project/node_modules/foo2/index.d.ts: *new*
  {}
/home/src/projects/project/node_modules/foo2/package.json: *new*
  {}
/home/src/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project/node_modules: *new*
  {}

exitCode:: ExitStatus.undefined

//// [/home/src/projects/project/index.mjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./node_modules/foo2/index.d.ts","./node_modules/@types/bar2/index.d.ts","./index.mts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-1622383150-export declare const foo2: number;","impliedFormat":1},{"version":"-7439170493-export declare const bar2: number;","impliedFormat":1},{"version":"-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n","impliedFormat":99}],"root":[4],"options":{"strict":true},"fileIdsList":[[2,3]],"referencedMap":[[4,1]],"exportedModulesMap":[[4,1]]},"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./node_modules/foo2/index.d.ts",
      "./node_modules/@types/bar2/index.d.ts",
      "./index.mts"
    ],
    "fileNamesList": [
      [
        "./node_modules/foo2/index.d.ts",
        "./node_modules/@types/bar2/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo2/index.d.ts": {
        "original": {
          "version": "-1622383150-export declare const foo2: number;",
          "impliedFormat": 1
        },
        "version": "-1622383150-export declare const foo2: number;",
        "signature": "-1622383150-export declare const foo2: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar2/index.d.ts": {
        "original": {
          "version": "-7439170493-export declare const bar2: number;",
          "impliedFormat": 1
        },
        "version": "-7439170493-export declare const bar2: number;",
        "signature": "-7439170493-export declare const bar2: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "original": {
          "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
          "impliedFormat": 99
        },
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "signature": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        4,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/foo2/index.d.ts",
        "./node_modules/@types/bar2/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./index.mts": [
        "./node_modules/foo2/index.d.ts",
        "./node_modules/@types/bar2/index.d.ts"
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 1040
}


Change:: delete the node10Result in @types

Input::
//// [/home/src/projects/project/node_modules/@types/bar/index.d.ts] deleted

Before running Timeout callback:: count: 1
4: timerToInvalidateFailedLookupResolutions
After running Timeout callback:: count: 1
5: timerToUpdateProgram
Before running Timeout callback:: count: 1
5: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/@types/bar/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/@types/bar/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling update
Synchronizing program
[[90m12:01:22 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
Found 'package.json' at '/home/src/projects/project/node_modules/@types/bar2/package.json'.
Reusing resolution of module 'foo' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo/index.mjs' with Package ID 'foo/index.mjs@1.0.0'.
======== Resolving module 'bar' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/bar/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar/index.mts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Found 'package.json' at '/home/src/projects/project/node_modules/@types/bar/package.json'.
Entering conditional exports.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/projects/project/node_modules/bar/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar/index.mjs' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolution of non-relative name failed; trying with modern Node resolution features disabled to see if npm library needs configuration update.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/bar/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'index.js' that references '/home/src/projects/project/node_modules/bar/index.js'.
File '/home/src/projects/project/node_modules/bar/index.js' exists - use it as a name resolution result.
File '/home/src/projects/project/node_modules/bar/index.js' has an unsupported extension, so skipping it.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/bar/index.js', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/bar/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/bar/index.ts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar/index.d.ts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.js.ts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.js.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar/index.js.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/bar/index.js' does not exist, skipping all lookups in it.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/projects/project/node_modules/@types/bar/index.d.ts'.
File '/home/src/projects/project/node_modules/@types/bar/index.d.ts' does not exist.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/@types/bar/index.d.ts', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/@types/bar/index.d.ts' has a '.d.ts' extension - stripping it.
File '/home/src/projects/project/node_modules/@types/bar/index.ts' does not exist.
File '/home/src/projects/project/node_modules/@types/bar/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/@types/bar/index.d.ts' does not exist.
File '/home/src/projects/project/node_modules/@types/bar/index.d.ts.ts' does not exist.
File '/home/src/projects/project/node_modules/@types/bar/index.d.ts.tsx' does not exist.
File '/home/src/projects/project/node_modules/@types/bar/index.d.ts.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/@types/bar/index.d.ts' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Resolving real path for '/home/src/projects/project/node_modules/bar/index.mjs', result '/home/src/projects/project/node_modules/bar/index.mjs'.
======== Module name 'bar' was successfully resolved to '/home/src/projects/project/node_modules/bar/index.mjs' with Package ID 'bar/index.mjs@1.0.0'. ========
Reusing resolution of module 'foo2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.d.ts' with Package ID 'foo2/index.d.ts@1.0.0'.
Reusing resolution of module 'bar2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' with Package ID '@types/bar2/index.d.ts@1.0.0'.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:01:23 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/home/src/projects/project/index.mts"]
Program options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/home/src/projects/project/node_modules/foo2/index.d.ts
/home/src/projects/project/node_modules/@types/bar2/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined


Change:: delete the ndoe10Result in package/types

Input::
//// [/home/src/projects/project/node_modules/foo/index.d.ts] deleted

Before running Timeout callback:: count: 1
6: timerToInvalidateFailedLookupResolutions
After running Timeout callback:: count: 1
7: timerToUpdateProgram
Before running Timeout callback:: count: 1
7: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/foo/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/foo/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling update
Synchronizing program
[[90m12:01:26 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Found 'package.json' at '/home/src/projects/project/node_modules/foo2/package.json'.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
======== Resolving module 'foo' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/projects/project/node_modules/foo/package.json'.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/foo/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/foo/index.mts' does not exist.
File '/home/src/projects/project/node_modules/foo/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/foo/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/foo/index.mjs' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolution of non-relative name failed; trying with modern Node resolution features disabled to see if npm library needs configuration update.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/projects/project/node_modules/foo/index.d.ts'.
File '/home/src/projects/project/node_modules/foo/index.d.ts' does not exist.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/foo/index.d.ts', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/foo/index.d.ts' has a '.d.ts' extension - stripping it.
File '/home/src/projects/project/node_modules/foo/index.ts' does not exist.
File '/home/src/projects/project/node_modules/foo/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/foo/index.d.ts' does not exist.
File '/home/src/projects/project/node_modules/foo/index.d.ts.ts' does not exist.
File '/home/src/projects/project/node_modules/foo/index.d.ts.tsx' does not exist.
File '/home/src/projects/project/node_modules/foo/index.d.ts.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/foo/index.d.ts' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Resolving real path for '/home/src/projects/project/node_modules/foo/index.mjs', result '/home/src/projects/project/node_modules/foo/index.mjs'.
======== Module name 'foo' was successfully resolved to '/home/src/projects/project/node_modules/foo/index.mjs' with Package ID 'foo/index.mjs@1.0.0'. ========
Reusing resolution of module 'bar' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/bar/index.mjs' with Package ID 'bar/index.mjs@1.0.0'.
Reusing resolution of module 'foo2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.d.ts' with Package ID 'foo2/index.d.ts@1.0.0'.
Reusing resolution of module 'bar2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' with Package ID '@types/bar2/index.d.ts@1.0.0'.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:01:27 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/home/src/projects/project/index.mts"]
Program options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/home/src/projects/project/node_modules/foo2/index.d.ts
/home/src/projects/project/node_modules/@types/bar2/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined


Change:: add the node10Result in @types

Input::
//// [/home/src/projects/project/node_modules/@types/bar/index.d.ts]
export declare const bar: number;


Before running Timeout callback:: count: 1
8: timerToInvalidateFailedLookupResolutions
After running Timeout callback:: count: 1
9: timerToUpdateProgram
Before running Timeout callback:: count: 1
9: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/@types/bar/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/@types/bar/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling update
Synchronizing program
[[90m12:01:30 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
Found 'package.json' at '/home/src/projects/project/node_modules/@types/bar2/package.json'.
Reusing resolution of module 'foo' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo/index.mjs' with Package ID 'foo/index.mjs@1.0.0'.
======== Resolving module 'bar' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/bar/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar/index.mts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Found 'package.json' at '/home/src/projects/project/node_modules/@types/bar/package.json'.
Entering conditional exports.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/projects/project/node_modules/bar/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar/index.mjs' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolution of non-relative name failed; trying with modern Node resolution features disabled to see if npm library needs configuration update.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/bar/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'index.js' that references '/home/src/projects/project/node_modules/bar/index.js'.
File '/home/src/projects/project/node_modules/bar/index.js' exists - use it as a name resolution result.
File '/home/src/projects/project/node_modules/bar/index.js' has an unsupported extension, so skipping it.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/bar/index.js', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/bar/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/bar/index.ts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar/index.d.ts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.js.ts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.js.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar/index.js.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/bar/index.js' does not exist, skipping all lookups in it.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/projects/project/node_modules/@types/bar/index.d.ts'.
File '/home/src/projects/project/node_modules/@types/bar/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/project/node_modules/bar/index.mjs', result '/home/src/projects/project/node_modules/bar/index.mjs'.
======== Module name 'bar' was successfully resolved to '/home/src/projects/project/node_modules/bar/index.mjs' with Package ID 'bar/index.mjs@1.0.0'. ========
Reusing resolution of module 'foo2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.d.ts' with Package ID 'foo2/index.d.ts@1.0.0'.
Reusing resolution of module 'bar2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' with Package ID '@types/bar2/index.d.ts@1.0.0'.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:01:31 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/home/src/projects/project/index.mts"]
Program options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/home/src/projects/project/node_modules/foo2/index.d.ts
/home/src/projects/project/node_modules/@types/bar2/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined


Change:: add the ndoe10Result in package/types

Input::
//// [/home/src/projects/project/node_modules/foo/index.d.ts]
export declare const foo: number;


Before running Timeout callback:: count: 1
10: timerToInvalidateFailedLookupResolutions
After running Timeout callback:: count: 1
11: timerToUpdateProgram
Before running Timeout callback:: count: 1
11: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/foo/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/foo/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling update
Synchronizing program
[[90m12:01:35 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Found 'package.json' at '/home/src/projects/project/node_modules/foo2/package.json'.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
======== Resolving module 'foo' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/projects/project/node_modules/foo/package.json'.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/foo/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/foo/index.mts' does not exist.
File '/home/src/projects/project/node_modules/foo/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/foo/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/foo/index.mjs' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolution of non-relative name failed; trying with modern Node resolution features disabled to see if npm library needs configuration update.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/projects/project/node_modules/foo/index.d.ts'.
File '/home/src/projects/project/node_modules/foo/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/project/node_modules/foo/index.mjs', result '/home/src/projects/project/node_modules/foo/index.mjs'.
======== Module name 'foo' was successfully resolved to '/home/src/projects/project/node_modules/foo/index.mjs' with Package ID 'foo/index.mjs@1.0.0'. ========
Reusing resolution of module 'bar' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/bar/index.mjs' with Package ID 'bar/index.mjs@1.0.0'.
Reusing resolution of module 'foo2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.d.ts' with Package ID 'foo2/index.d.ts@1.0.0'.
Reusing resolution of module 'bar2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' with Package ID '@types/bar2/index.d.ts@1.0.0'.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:01:36 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/home/src/projects/project/index.mts"]
Program options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/home/src/projects/project/node_modules/foo2/index.d.ts
/home/src/projects/project/node_modules/@types/bar2/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined


Change:: update package.json from @types so error is fixed

Input::
//// [/home/src/projects/project/node_modules/@types/bar/package.json]
{
 "name": "@types/bar",
 "version": "1.0.0",
 "types": "index.d.ts",
 "exports": {
  ".": {
   "types": "./index.d.ts",
   "require": "./index.d.ts"
  }
 }
}


Before running Timeout callback:: count: 1
12: timerToInvalidateFailedLookupResolutions
After running Timeout callback:: count: 1
13: timerToUpdateProgram
Before running Timeout callback:: count: 1
13: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
FileWatcher:: Triggered with /home/src/projects/project/node_modules/@types/bar/package.json 1:: WatchInfo: /home/src/projects/project/node_modules/@types/bar/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/node_modules/@types/bar/package.json 1:: WatchInfo: /home/src/projects/project/node_modules/@types/bar/package.json 2000 undefined File location affecting resolution
Scheduling update
Synchronizing program
[[90m12:01:40 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
Reusing resolution of module 'foo' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo/index.mjs' with Package ID 'foo/index.mjs@1.0.0'.
======== Resolving module 'bar' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/bar/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar/index.mts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Found 'package.json' at '/home/src/projects/project/node_modules/@types/bar/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath '.' with target './index.d.ts'.
File '/home/src/projects/project/node_modules/@types/bar/index.d.ts' exists - use it as a name resolution result.
Resolved under condition 'types'.
Exiting conditional exports.
Resolving real path for '/home/src/projects/project/node_modules/@types/bar/index.d.ts', result '/home/src/projects/project/node_modules/@types/bar/index.d.ts'.
======== Module name 'bar' was successfully resolved to '/home/src/projects/project/node_modules/@types/bar/index.d.ts' with Package ID '@types/bar/index.d.ts@1.0.0'. ========
Reusing resolution of module 'foo2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.d.ts' with Package ID 'foo2/index.d.ts@1.0.0'.
Reusing resolution of module 'bar2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' with Package ID '@types/bar2/index.d.ts@1.0.0'.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types/bar/index.d.ts 250 undefined Source file
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:01:47 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/home/src/projects/project/index.mts"]
Program options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/home/src/projects/project/node_modules/@types/bar/index.d.ts
/home/src/projects/project/node_modules/foo2/index.d.ts
/home/src/projects/project/node_modules/@types/bar2/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/projects/project/node_modules/@types/bar/index.d.ts (used version)
/home/src/projects/project/index.mts (computed .d.ts)

PolledWatches::
/home/src/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/home/src/projects:
  {}
/home/src/projects/project:
  {}
/home/src/projects/project/index.mts:
  {}
/home/src/projects/project/node_modules/@types/bar/index.d.ts: *new*
  {}
/home/src/projects/project/node_modules/@types/bar/package.json:
  {}
/home/src/projects/project/node_modules/@types/bar2/index.d.ts:
  {}
/home/src/projects/project/node_modules/@types/bar2/package.json:
  {}
/home/src/projects/project/node_modules/bar/package.json:
  {}
/home/src/projects/project/node_modules/bar2/package.json:
  {}
/home/src/projects/project/node_modules/foo/package.json:
  {}
/home/src/projects/project/node_modules/foo2/index.d.ts:
  {}
/home/src/projects/project/node_modules/foo2/package.json:
  {}
/home/src/projects/project/tsconfig.json:
  {}

FsWatchesRecursive::
/home/src/projects/project/node_modules:
  {}

exitCode:: ExitStatus.undefined

//// [/home/src/projects/project/index.mjs] file written with same contents
//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./node_modules/@types/bar/index.d.ts","./node_modules/foo2/index.d.ts","./node_modules/@types/bar2/index.d.ts","./index.mts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-9556021903-export declare const bar: number;","impliedFormat":1},{"version":"-1622383150-export declare const foo2: number;","impliedFormat":1},{"version":"-7439170493-export declare const bar2: number;","impliedFormat":1},{"version":"-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n","signature":"-3531856636-export {};\n","impliedFormat":99}],"root":[5],"options":{"strict":true},"fileIdsList":[[2,3,4]],"referencedMap":[[5,1]],"exportedModulesMap":[]},"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./node_modules/@types/bar/index.d.ts",
      "./node_modules/foo2/index.d.ts",
      "./node_modules/@types/bar2/index.d.ts",
      "./index.mts"
    ],
    "fileNamesList": [
      [
        "./node_modules/@types/bar/index.d.ts",
        "./node_modules/foo2/index.d.ts",
        "./node_modules/@types/bar2/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar/index.d.ts": {
        "original": {
          "version": "-9556021903-export declare const bar: number;",
          "impliedFormat": 1
        },
        "version": "-9556021903-export declare const bar: number;",
        "signature": "-9556021903-export declare const bar: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo2/index.d.ts": {
        "original": {
          "version": "-1622383150-export declare const foo2: number;",
          "impliedFormat": 1
        },
        "version": "-1622383150-export declare const foo2: number;",
        "signature": "-1622383150-export declare const foo2: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar2/index.d.ts": {
        "original": {
          "version": "-7439170493-export declare const bar2: number;",
          "impliedFormat": 1
        },
        "version": "-7439170493-export declare const bar2: number;",
        "signature": "-7439170493-export declare const bar2: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "original": {
          "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
          "signature": "-3531856636-export {};\n",
          "impliedFormat": 99
        },
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        5,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/@types/bar/index.d.ts",
        "./node_modules/foo2/index.d.ts",
        "./node_modules/@types/bar2/index.d.ts"
      ]
    },
    "exportedModulesMap": {}
  },
  "version": "FakeTSVersion",
  "size": 1193
}


Change:: update package.json so error is fixed

Input::
//// [/home/src/projects/project/node_modules/foo/package.json]
{
 "name": "foo",
 "version": "1.0.0",
 "main": "index.js",
 "types": "index.d.ts",
 "exports": {
  ".": {
   "types": "./index.d.ts",
   "import": "./index.mjs",
   "require": "./index.js"
  }
 }
}


Before running Timeout callback:: count: 1
14: timerToInvalidateFailedLookupResolutions
After running Timeout callback:: count: 1
15: timerToUpdateProgram
Before running Timeout callback:: count: 1
15: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
FileWatcher:: Triggered with /home/src/projects/project/node_modules/foo/package.json 1:: WatchInfo: /home/src/projects/project/node_modules/foo/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/node_modules/foo/package.json 1:: WatchInfo: /home/src/projects/project/node_modules/foo/package.json 2000 undefined File location affecting resolution
Scheduling update
Synchronizing program
[[90m12:01:55 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
======== Resolving module 'foo' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/projects/project/node_modules/foo/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath '.' with target './index.d.ts'.
File '/home/src/projects/project/node_modules/foo/index.d.ts' exists - use it as a name resolution result.
Resolved under condition 'types'.
Exiting conditional exports.
Resolving real path for '/home/src/projects/project/node_modules/foo/index.d.ts', result '/home/src/projects/project/node_modules/foo/index.d.ts'.
======== Module name 'foo' was successfully resolved to '/home/src/projects/project/node_modules/foo/index.d.ts' with Package ID 'foo/index.d.ts@1.0.0'. ========
Reusing resolution of module 'bar' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/@types/bar/index.d.ts' with Package ID '@types/bar/index.d.ts@1.0.0'.
Reusing resolution of module 'foo2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.d.ts' with Package ID 'foo2/index.d.ts@1.0.0'.
Reusing resolution of module 'bar2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' with Package ID '@types/bar2/index.d.ts@1.0.0'.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/foo/index.d.ts 250 undefined Source file
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:02:02 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/home/src/projects/project/index.mts"]
Program options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/home/src/projects/project/node_modules/foo/index.d.ts
/home/src/projects/project/node_modules/@types/bar/index.d.ts
/home/src/projects/project/node_modules/foo2/index.d.ts
/home/src/projects/project/node_modules/@types/bar2/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/projects/project/node_modules/foo/index.d.ts (used version)
/home/src/projects/project/index.mts (computed .d.ts)

PolledWatches *deleted*::
/home/src/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/home/src/projects:
  {}
/home/src/projects/project:
  {}
/home/src/projects/project/index.mts:
  {}
/home/src/projects/project/node_modules/@types/bar/index.d.ts:
  {}
/home/src/projects/project/node_modules/@types/bar/package.json:
  {}
/home/src/projects/project/node_modules/@types/bar2/index.d.ts:
  {}
/home/src/projects/project/node_modules/@types/bar2/package.json:
  {}
/home/src/projects/project/node_modules/bar/package.json:
  {}
/home/src/projects/project/node_modules/bar2/package.json:
  {}
/home/src/projects/project/node_modules/foo/index.d.ts: *new*
  {}
/home/src/projects/project/node_modules/foo/package.json:
  {}
/home/src/projects/project/node_modules/foo2/index.d.ts:
  {}
/home/src/projects/project/node_modules/foo2/package.json:
  {}
/home/src/projects/project/tsconfig.json:
  {}

FsWatchesRecursive::
/home/src/projects/project/node_modules:
  {}

exitCode:: ExitStatus.undefined

//// [/home/src/projects/project/index.mjs] file written with same contents
//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./node_modules/foo/index.d.ts","./node_modules/@types/bar/index.d.ts","./node_modules/foo2/index.d.ts","./node_modules/@types/bar2/index.d.ts","./index.mts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-5214938848-export declare const foo: number;","impliedFormat":1},{"version":"-9556021903-export declare const bar: number;","impliedFormat":1},{"version":"-1622383150-export declare const foo2: number;","impliedFormat":1},{"version":"-7439170493-export declare const bar2: number;","impliedFormat":1},{"version":"-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n","signature":"-3531856636-export {};\n","impliedFormat":99}],"root":[6],"options":{"strict":true},"fileIdsList":[[2,3,4,5]],"referencedMap":[[6,1]],"exportedModulesMap":[]},"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./node_modules/foo/index.d.ts",
      "./node_modules/@types/bar/index.d.ts",
      "./node_modules/foo2/index.d.ts",
      "./node_modules/@types/bar2/index.d.ts",
      "./index.mts"
    ],
    "fileNamesList": [
      [
        "./node_modules/foo/index.d.ts",
        "./node_modules/@types/bar/index.d.ts",
        "./node_modules/foo2/index.d.ts",
        "./node_modules/@types/bar2/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo/index.d.ts": {
        "original": {
          "version": "-5214938848-export declare const foo: number;",
          "impliedFormat": 1
        },
        "version": "-5214938848-export declare const foo: number;",
        "signature": "-5214938848-export declare const foo: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar/index.d.ts": {
        "original": {
          "version": "-9556021903-export declare const bar: number;",
          "impliedFormat": 1
        },
        "version": "-9556021903-export declare const bar: number;",
        "signature": "-9556021903-export declare const bar: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo2/index.d.ts": {
        "original": {
          "version": "-1622383150-export declare const foo2: number;",
          "impliedFormat": 1
        },
        "version": "-1622383150-export declare const foo2: number;",
        "signature": "-1622383150-export declare const foo2: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar2/index.d.ts": {
        "original": {
          "version": "-7439170493-export declare const bar2: number;",
          "impliedFormat": 1
        },
        "version": "-7439170493-export declare const bar2: number;",
        "signature": "-7439170493-export declare const bar2: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "original": {
          "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
          "signature": "-3531856636-export {};\n",
          "impliedFormat": 99
        },
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        6,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/foo/index.d.ts",
        "./node_modules/@types/bar/index.d.ts",
        "./node_modules/foo2/index.d.ts",
        "./node_modules/@types/bar2/index.d.ts"
      ]
    },
    "exportedModulesMap": {}
  },
  "version": "FakeTSVersion",
  "size": 1305
}


Change:: update package.json from @types so error is introduced

Input::
//// [/home/src/projects/project/node_modules/@types/bar2/package.json]
{
 "name": "@types/bar2",
 "version": "1.0.0",
 "types": "index.d.ts",
 "exports": {
  ".": {
   "require": "./index.d.ts"
  }
 }
}


Before running Timeout callback:: count: 1
16: timerToInvalidateFailedLookupResolutions
After running Timeout callback:: count: 1
17: timerToUpdateProgram
Before running Timeout callback:: count: 1
17: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
FileWatcher:: Triggered with /home/src/projects/project/node_modules/@types/bar2/package.json 1:: WatchInfo: /home/src/projects/project/node_modules/@types/bar2/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/node_modules/@types/bar2/package.json 1:: WatchInfo: /home/src/projects/project/node_modules/@types/bar2/package.json 2000 undefined File location affecting resolution
Scheduling update
Synchronizing program
[[90m12:02:09 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
Found 'package.json' at '/home/src/projects/project/node_modules/@types/bar2/package.json'.
Reusing resolution of module 'foo' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo/index.d.ts' with Package ID 'foo/index.d.ts@1.0.0'.
Reusing resolution of module 'bar' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/@types/bar/index.d.ts' with Package ID '@types/bar/index.d.ts@1.0.0'.
Reusing resolution of module 'foo2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.d.ts' with Package ID 'foo2/index.d.ts@1.0.0'.
======== Resolving module 'bar2' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/bar2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar2/index.mts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/projects/project/node_modules/bar2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar2/index.mjs' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolution of non-relative name failed; trying with modern Node resolution features disabled to see if npm library needs configuration update.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/bar2/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'index.js' that references '/home/src/projects/project/node_modules/bar2/index.js'.
File '/home/src/projects/project/node_modules/bar2/index.js' exists - use it as a name resolution result.
File '/home/src/projects/project/node_modules/bar2/index.js' has an unsupported extension, so skipping it.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/bar2/index.js', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/bar2/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/bar2/index.ts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.d.ts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.js.ts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.js.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.js.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/bar2/index.js' does not exist, skipping all lookups in it.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/projects/project/node_modules/@types/bar2/index.d.ts'.
File '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/project/node_modules/bar2/index.mjs', result '/home/src/projects/project/node_modules/bar2/index.mjs'.
======== Module name 'bar2' was successfully resolved to '/home/src/projects/project/node_modules/bar2/index.mjs' with Package ID 'bar2/index.mjs@1.0.0'. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/src/projects/project/node_modules/@types/bar2/index.d.ts 250 undefined Source file
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:02:16 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/home/src/projects/project/index.mts"]
Program options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/home/src/projects/project/node_modules/foo/index.d.ts
/home/src/projects/project/node_modules/@types/bar/index.d.ts
/home/src/projects/project/node_modules/foo2/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/projects/project/index.mts (computed .d.ts)

PolledWatches::
/home/src/projects/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/home/src/projects:
  {}
/home/src/projects/project:
  {}
/home/src/projects/project/index.mts:
  {}
/home/src/projects/project/node_modules/@types/bar/index.d.ts:
  {}
/home/src/projects/project/node_modules/@types/bar/package.json:
  {}
/home/src/projects/project/node_modules/@types/bar2/package.json:
  {}
/home/src/projects/project/node_modules/bar/package.json:
  {}
/home/src/projects/project/node_modules/bar2/package.json:
  {}
/home/src/projects/project/node_modules/foo/index.d.ts:
  {}
/home/src/projects/project/node_modules/foo/package.json:
  {}
/home/src/projects/project/node_modules/foo2/index.d.ts:
  {}
/home/src/projects/project/node_modules/foo2/package.json:
  {}
/home/src/projects/project/tsconfig.json:
  {}

FsWatches *deleted*::
/home/src/projects/project/node_modules/@types/bar2/index.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project/node_modules:
  {}

exitCode:: ExitStatus.undefined

//// [/home/src/projects/project/index.mjs] file written with same contents
//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./node_modules/foo/index.d.ts","./node_modules/@types/bar/index.d.ts","./node_modules/foo2/index.d.ts","./index.mts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-5214938848-export declare const foo: number;","impliedFormat":1},{"version":"-9556021903-export declare const bar: number;","impliedFormat":1},{"version":"-1622383150-export declare const foo2: number;","impliedFormat":1},{"version":"-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n","signature":"-3531856636-export {};\n","impliedFormat":99}],"root":[5],"options":{"strict":true},"fileIdsList":[[2,3,4]],"referencedMap":[[5,1]],"exportedModulesMap":[]},"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./node_modules/foo/index.d.ts",
      "./node_modules/@types/bar/index.d.ts",
      "./node_modules/foo2/index.d.ts",
      "./index.mts"
    ],
    "fileNamesList": [
      [
        "./node_modules/foo/index.d.ts",
        "./node_modules/@types/bar/index.d.ts",
        "./node_modules/foo2/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo/index.d.ts": {
        "original": {
          "version": "-5214938848-export declare const foo: number;",
          "impliedFormat": 1
        },
        "version": "-5214938848-export declare const foo: number;",
        "signature": "-5214938848-export declare const foo: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar/index.d.ts": {
        "original": {
          "version": "-9556021903-export declare const bar: number;",
          "impliedFormat": 1
        },
        "version": "-9556021903-export declare const bar: number;",
        "signature": "-9556021903-export declare const bar: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo2/index.d.ts": {
        "original": {
          "version": "-1622383150-export declare const foo2: number;",
          "impliedFormat": 1
        },
        "version": "-1622383150-export declare const foo2: number;",
        "signature": "-1622383150-export declare const foo2: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "original": {
          "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
          "signature": "-3531856636-export {};\n",
          "impliedFormat": 99
        },
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        5,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/foo/index.d.ts",
        "./node_modules/@types/bar/index.d.ts",
        "./node_modules/foo2/index.d.ts"
      ]
    },
    "exportedModulesMap": {}
  },
  "version": "FakeTSVersion",
  "size": 1184
}


Change:: update package.json so error is introduced

Input::
//// [/home/src/projects/project/node_modules/foo2/package.json]
{
 "name": "foo2",
 "version": "1.0.0",
 "main": "index.js",
 "types": "index.d.ts",
 "exports": {
  ".": {
   "import": "./index.mjs",
   "require": "./index.js"
  }
 }
}


Before running Timeout callback:: count: 1
18: timerToInvalidateFailedLookupResolutions
After running Timeout callback:: count: 1
19: timerToUpdateProgram
Before running Timeout callback:: count: 1
19: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
FileWatcher:: Triggered with /home/src/projects/project/node_modules/foo2/package.json 1:: WatchInfo: /home/src/projects/project/node_modules/foo2/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/node_modules/foo2/package.json 1:: WatchInfo: /home/src/projects/project/node_modules/foo2/package.json 2000 undefined File location affecting resolution
Scheduling update
Synchronizing program
[[90m12:02:24 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
Found 'package.json' at '/home/src/projects/project/node_modules/foo2/package.json'.
Reusing resolution of module 'foo' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo/index.d.ts' with Package ID 'foo/index.d.ts@1.0.0'.
Reusing resolution of module 'bar' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/@types/bar/index.d.ts' with Package ID '@types/bar/index.d.ts@1.0.0'.
======== Resolving module 'foo2' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/foo2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/foo2/index.mts' does not exist.
File '/home/src/projects/project/node_modules/foo2/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/foo2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/foo2/index.mjs' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolution of non-relative name failed; trying with modern Node resolution features disabled to see if npm library needs configuration update.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/projects/project/node_modules/foo2/index.d.ts'.
File '/home/src/projects/project/node_modules/foo2/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/project/node_modules/foo2/index.mjs', result '/home/src/projects/project/node_modules/foo2/index.mjs'.
======== Module name 'foo2' was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.mjs' with Package ID 'foo2/index.mjs@1.0.0'. ========
Reusing resolution of module 'bar2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/bar2/index.mjs' with Package ID 'bar2/index.mjs@1.0.0'.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/src/projects/project/node_modules/foo2/index.d.ts 250 undefined Source file
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:02:31 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/home/src/projects/project/index.mts"]
Program options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/home/src/projects/project/node_modules/foo/index.d.ts
/home/src/projects/project/node_modules/@types/bar/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/projects/project/index.mts (computed .d.ts)

PolledWatches::
/home/src/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/home/src/projects:
  {}
/home/src/projects/project:
  {}
/home/src/projects/project/index.mts:
  {}
/home/src/projects/project/node_modules/@types/bar/index.d.ts:
  {}
/home/src/projects/project/node_modules/@types/bar/package.json:
  {}
/home/src/projects/project/node_modules/@types/bar2/package.json:
  {}
/home/src/projects/project/node_modules/bar/package.json:
  {}
/home/src/projects/project/node_modules/bar2/package.json:
  {}
/home/src/projects/project/node_modules/foo/index.d.ts:
  {}
/home/src/projects/project/node_modules/foo/package.json:
  {}
/home/src/projects/project/node_modules/foo2/package.json:
  {}
/home/src/projects/project/tsconfig.json:
  {}

FsWatches *deleted*::
/home/src/projects/project/node_modules/foo2/index.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project/node_modules:
  {}

exitCode:: ExitStatus.undefined

//// [/home/src/projects/project/index.mjs] file written with same contents
//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./node_modules/foo/index.d.ts","./node_modules/@types/bar/index.d.ts","./index.mts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-5214938848-export declare const foo: number;","impliedFormat":1},{"version":"-9556021903-export declare const bar: number;","impliedFormat":1},{"version":"-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n","signature":"-3531856636-export {};\n","impliedFormat":99}],"root":[4],"options":{"strict":true},"fileIdsList":[[2,3]],"referencedMap":[[4,1]],"exportedModulesMap":[]},"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./node_modules/foo/index.d.ts",
      "./node_modules/@types/bar/index.d.ts",
      "./index.mts"
    ],
    "fileNamesList": [
      [
        "./node_modules/foo/index.d.ts",
        "./node_modules/@types/bar/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo/index.d.ts": {
        "original": {
          "version": "-5214938848-export declare const foo: number;",
          "impliedFormat": 1
        },
        "version": "-5214938848-export declare const foo: number;",
        "signature": "-5214938848-export declare const foo: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar/index.d.ts": {
        "original": {
          "version": "-9556021903-export declare const bar: number;",
          "impliedFormat": 1
        },
        "version": "-9556021903-export declare const bar: number;",
        "signature": "-9556021903-export declare const bar: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "original": {
          "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
          "signature": "-3531856636-export {};\n",
          "impliedFormat": 99
        },
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        4,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/foo/index.d.ts",
        "./node_modules/@types/bar/index.d.ts"
      ]
    },
    "exportedModulesMap": {}
  },
  "version": "FakeTSVersion",
  "size": 1070
}


Change:: delete the node10Result in @types

Input::
//// [/home/src/projects/project/node_modules/@types/bar2/index.d.ts] deleted

Before running Timeout callback:: count: 1
20: timerToInvalidateFailedLookupResolutions
After running Timeout callback:: count: 1
21: timerToUpdateProgram
Before running Timeout callback:: count: 1
21: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/@types/bar2/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/@types/bar2/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling update
Synchronizing program
[[90m12:02:36 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
Reusing resolution of module 'foo' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo/index.d.ts' with Package ID 'foo/index.d.ts@1.0.0'.
Reusing resolution of module 'bar' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/@types/bar/index.d.ts' with Package ID '@types/bar/index.d.ts@1.0.0'.
Reusing resolution of module 'foo2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.mjs' with Package ID 'foo2/index.mjs@1.0.0'.
======== Resolving module 'bar2' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/bar2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar2/index.mts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Found 'package.json' at '/home/src/projects/project/node_modules/@types/bar2/package.json'.
Entering conditional exports.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/projects/project/node_modules/bar2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar2/index.mjs' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolution of non-relative name failed; trying with modern Node resolution features disabled to see if npm library needs configuration update.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/bar2/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'index.js' that references '/home/src/projects/project/node_modules/bar2/index.js'.
File '/home/src/projects/project/node_modules/bar2/index.js' exists - use it as a name resolution result.
File '/home/src/projects/project/node_modules/bar2/index.js' has an unsupported extension, so skipping it.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/bar2/index.js', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/bar2/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/bar2/index.ts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.d.ts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.js.ts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.js.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.js.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/bar2/index.js' does not exist, skipping all lookups in it.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/projects/project/node_modules/@types/bar2/index.d.ts'.
File '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' does not exist.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/@types/bar2/index.d.ts', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' has a '.d.ts' extension - stripping it.
File '/home/src/projects/project/node_modules/@types/bar2/index.ts' does not exist.
File '/home/src/projects/project/node_modules/@types/bar2/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' does not exist.
File '/home/src/projects/project/node_modules/@types/bar2/index.d.ts.ts' does not exist.
File '/home/src/projects/project/node_modules/@types/bar2/index.d.ts.tsx' does not exist.
File '/home/src/projects/project/node_modules/@types/bar2/index.d.ts.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Resolving real path for '/home/src/projects/project/node_modules/bar2/index.mjs', result '/home/src/projects/project/node_modules/bar2/index.mjs'.
======== Module name 'bar2' was successfully resolved to '/home/src/projects/project/node_modules/bar2/index.mjs' with Package ID 'bar2/index.mjs@1.0.0'. ========
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:02:37 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/home/src/projects/project/index.mts"]
Program options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/home/src/projects/project/node_modules/foo/index.d.ts
/home/src/projects/project/node_modules/@types/bar/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined


Change:: delete the ndoe10Result in package/types

Input::
//// [/home/src/projects/project/node_modules/foo2/index.d.ts] deleted

Before running Timeout callback:: count: 1
22: timerToInvalidateFailedLookupResolutions
After running Timeout callback:: count: 1
23: timerToUpdateProgram
Before running Timeout callback:: count: 1
23: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/foo2/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/foo2/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling update
Synchronizing program
[[90m12:02:40 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
Reusing resolution of module 'foo' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo/index.d.ts' with Package ID 'foo/index.d.ts@1.0.0'.
Reusing resolution of module 'bar' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/@types/bar/index.d.ts' with Package ID '@types/bar/index.d.ts@1.0.0'.
======== Resolving module 'foo2' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/projects/project/node_modules/foo2/package.json'.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/foo2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/foo2/index.mts' does not exist.
File '/home/src/projects/project/node_modules/foo2/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/foo2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/foo2/index.mjs' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolution of non-relative name failed; trying with modern Node resolution features disabled to see if npm library needs configuration update.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/projects/project/node_modules/foo2/index.d.ts'.
File '/home/src/projects/project/node_modules/foo2/index.d.ts' does not exist.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/foo2/index.d.ts', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/foo2/index.d.ts' has a '.d.ts' extension - stripping it.
File '/home/src/projects/project/node_modules/foo2/index.ts' does not exist.
File '/home/src/projects/project/node_modules/foo2/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/foo2/index.d.ts' does not exist.
File '/home/src/projects/project/node_modules/foo2/index.d.ts.ts' does not exist.
File '/home/src/projects/project/node_modules/foo2/index.d.ts.tsx' does not exist.
File '/home/src/projects/project/node_modules/foo2/index.d.ts.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/foo2/index.d.ts' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Resolving real path for '/home/src/projects/project/node_modules/foo2/index.mjs', result '/home/src/projects/project/node_modules/foo2/index.mjs'.
======== Module name 'foo2' was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.mjs' with Package ID 'foo2/index.mjs@1.0.0'. ========
Reusing resolution of module 'bar2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/bar2/index.mjs' with Package ID 'bar2/index.mjs@1.0.0'.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:02:41 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/home/src/projects/project/index.mts"]
Program options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/home/src/projects/project/node_modules/foo/index.d.ts
/home/src/projects/project/node_modules/@types/bar/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined


Change:: add the node10Result in @types

Input::
//// [/home/src/projects/project/node_modules/@types/bar2/index.d.ts]
export declare const bar2: number;


Before running Timeout callback:: count: 1
24: timerToInvalidateFailedLookupResolutions
After running Timeout callback:: count: 1
25: timerToUpdateProgram
Before running Timeout callback:: count: 1
25: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/@types/bar2/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/@types/bar2/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling update
Synchronizing program
[[90m12:02:44 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
Reusing resolution of module 'foo' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo/index.d.ts' with Package ID 'foo/index.d.ts@1.0.0'.
Reusing resolution of module 'bar' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/@types/bar/index.d.ts' with Package ID '@types/bar/index.d.ts@1.0.0'.
Reusing resolution of module 'foo2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.mjs' with Package ID 'foo2/index.mjs@1.0.0'.
======== Resolving module 'bar2' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/bar2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar2/index.mts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Found 'package.json' at '/home/src/projects/project/node_modules/@types/bar2/package.json'.
Entering conditional exports.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/projects/project/node_modules/bar2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar2/index.mjs' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolution of non-relative name failed; trying with modern Node resolution features disabled to see if npm library needs configuration update.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/bar2/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'index.js' that references '/home/src/projects/project/node_modules/bar2/index.js'.
File '/home/src/projects/project/node_modules/bar2/index.js' exists - use it as a name resolution result.
File '/home/src/projects/project/node_modules/bar2/index.js' has an unsupported extension, so skipping it.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/bar2/index.js', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/bar2/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/bar2/index.ts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.d.ts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.js.ts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.js.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.js.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/bar2/index.js' does not exist, skipping all lookups in it.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/projects/project/node_modules/@types/bar2/index.d.ts'.
File '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/project/node_modules/bar2/index.mjs', result '/home/src/projects/project/node_modules/bar2/index.mjs'.
======== Module name 'bar2' was successfully resolved to '/home/src/projects/project/node_modules/bar2/index.mjs' with Package ID 'bar2/index.mjs@1.0.0'. ========
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:02:45 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/home/src/projects/project/index.mts"]
Program options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/home/src/projects/project/node_modules/foo/index.d.ts
/home/src/projects/project/node_modules/@types/bar/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined


Change:: add the ndoe10Result in package/types

Input::
//// [/home/src/projects/project/node_modules/foo2/index.d.ts]
export declare const foo2: number;


Before running Timeout callback:: count: 1
26: timerToInvalidateFailedLookupResolutions
After running Timeout callback:: count: 1
27: timerToUpdateProgram
Before running Timeout callback:: count: 1
27: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/foo2/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/foo2/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules 1 undefined Failed Lookup Locations
Scheduling update
Synchronizing program
[[90m12:02:49 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
Reusing resolution of module 'foo' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo/index.d.ts' with Package ID 'foo/index.d.ts@1.0.0'.
Reusing resolution of module 'bar' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/@types/bar/index.d.ts' with Package ID '@types/bar/index.d.ts@1.0.0'.
======== Resolving module 'foo2' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/projects/project/node_modules/foo2/package.json'.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/foo2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/foo2/index.mts' does not exist.
File '/home/src/projects/project/node_modules/foo2/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/foo2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/foo2/index.mjs' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolution of non-relative name failed; trying with modern Node resolution features disabled to see if npm library needs configuration update.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/projects/project/node_modules/foo2/index.d.ts'.
File '/home/src/projects/project/node_modules/foo2/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/project/node_modules/foo2/index.mjs', result '/home/src/projects/project/node_modules/foo2/index.mjs'.
======== Module name 'foo2' was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.mjs' with Package ID 'foo2/index.mjs@1.0.0'. ========
Reusing resolution of module 'bar2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/bar2/index.mjs' with Package ID 'bar2/index.mjs@1.0.0'.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[[90m12:02:50 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/home/src/projects/project/index.mts"]
Program options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/home/src/projects/project/node_modules/foo/index.d.ts
/home/src/projects/project/node_modules/@types/bar/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined


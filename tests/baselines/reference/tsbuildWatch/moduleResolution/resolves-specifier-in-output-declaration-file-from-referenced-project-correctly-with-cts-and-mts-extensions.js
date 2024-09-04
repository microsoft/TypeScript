currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{
  "name": "pkg1",
  "version": "1.0.0",
  "main": "build/index.js",
  "type": "module"
}

//// [/user/username/projects/myproject/packages/pkg1/index.ts]
import type { TheNum } from 'pkg2'
export const theNum: TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg1/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "build",
    "module": "node16"
  },
  "references": [
    {
      "path": "../pkg2"
    }
  ]
}

//// [/user/username/projects/myproject/packages/pkg2/const.cts]
export type TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg2/index.ts]
export type { TheNum } from './const.cjs';

//// [/user/username/projects/myproject/packages/pkg2/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "build",
    "module": "node16"
  }
}

//// [/user/username/projects/myproject/packages/pkg2/package.json]
{
  "name": "pkg2",
  "version": "1.0.0",
  "main": "build/index.js",
  "type": "module"
}

//// [/user/username/projects/myproject/node_modules/pkg2] symlink(/user/username/projects/myproject/packages/pkg2)

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


/home/src/tslibs/TS/Lib/tsc.js -b packages/pkg1 -w --verbose --traceResolution
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/pkg2/tsconfig.json
    * packages/pkg1/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/pkg2/tsconfig.json' is out of date because output file 'packages/pkg2/build/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/packages/pkg2/tsconfig.json'...

Found 'package.json' at '/user/username/projects/myproject/packages/pkg2/package.json'.
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const.cjs', target file types: TypeScript, JavaScript, Declaration.
File name '/user/username/projects/myproject/packages/pkg2/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/const.cts' exists - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.cts'. ========
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
[[90mHH:MM:SS AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output file 'packages/pkg1/build/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/packages/pkg1/tsconfig.json'...

Found 'package.json' at '/user/username/projects/myproject/packages/pkg1/package.json'.
======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/user/username/projects/myproject/packages/pkg1/package.json' exists according to earlier cached lookups.
Loading module 'pkg2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'build/index.js' that references '/user/username/projects/myproject/node_modules/pkg2/build/index.js'.
File name '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts', result '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/index.d.ts' with Package ID 'pkg2/build/index.d.ts@1.0.0'. ========
File '/user/username/projects/myproject/packages/pkg2/build/package.json' does not exist.
File '/user/username/projects/myproject/packages/pkg2/package.json' exists according to earlier cached lookups.
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/build/const.cjs', target file types: TypeScript, JavaScript, Declaration.
File name '/user/username/projects/myproject/packages/pkg2/build/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/build/const.cts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.d.cts' exists - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/const.d.cts'. ========
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts] *Lib*

//// [/user/username/projects/myproject/packages/pkg2/build/const.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/packages/pkg2/build/const.d.cts]
export type TheNum = 42;


//// [/user/username/projects/myproject/packages/pkg2/build/index.js]
export {};


//// [/user/username/projects/myproject/packages/pkg2/build/index.d.ts]
export type { TheNum } from './const.cjs';


//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../../home/src/tslibs/ts/lib/lib.es2022.full.d.ts","../const.cts","../index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-11202312776-export type TheNum = 42;","signature":"-13194036030-export type TheNum = 42;\n","impliedFormat":1},{"version":"-9668872159-export type { TheNum } from './const.cjs';","signature":"-9835135925-export type { TheNum } from './const.cjs';\n","impliedFormat":99}],"root":[2,3],"options":{"composite":true,"module":100,"outDir":"./"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../../home/src/tslibs/ts/lib/lib.es2022.full.d.ts",
    "../const.cts",
    "../index.ts"
  ],
  "fileIdsList": [
    [
      "../const.cts"
    ]
  ],
  "fileInfos": {
    "../../../../../../../home/src/tslibs/ts/lib/lib.es2022.full.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../const.cts": {
      "original": {
        "version": "-11202312776-export type TheNum = 42;",
        "signature": "-13194036030-export type TheNum = 42;\n",
        "impliedFormat": 1
      },
      "version": "-11202312776-export type TheNum = 42;",
      "signature": "-13194036030-export type TheNum = 42;\n",
      "impliedFormat": "commonjs"
    },
    "../index.ts": {
      "original": {
        "version": "-9668872159-export type { TheNum } from './const.cjs';",
        "signature": "-9835135925-export type { TheNum } from './const.cjs';\n",
        "impliedFormat": 99
      },
      "version": "-9668872159-export type { TheNum } from './const.cjs';",
      "signature": "-9835135925-export type { TheNum } from './const.cjs';\n",
      "impliedFormat": "esnext"
    }
  },
  "root": [
    [
      2,
      "../const.cts"
    ],
    [
      3,
      "../index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 100,
    "outDir": "./"
  },
  "referencedMap": {
    "../index.ts": [
      "../const.cts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1082
}

//// [/user/username/projects/myproject/packages/pkg1/build/index.js]
export const theNum = 42;


//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo]
{"root":["../index.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 50
}


PolledWatches::
/home/package.json: *new*
  {"pollingInterval":2000}
/home/src/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/TS/Lib/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/package.json: *new*
  {"pollingInterval":2000}
/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/packages/pkg2/build/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/packages/pkg1/index.ts: *new*
  {}
/user/username/projects/myproject/packages/pkg1/package.json: *new*
  {}
/user/username/projects/myproject/packages/pkg1/tsconfig.json: *new*
  {}
/user/username/projects/myproject/packages/pkg2/const.cts: *new*
  {}
/user/username/projects/myproject/packages/pkg2/index.ts: *new*
  {}
/user/username/projects/myproject/packages/pkg2/package.json: *new*
  {}
/user/username/projects/myproject/packages/pkg2/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg1: *new*
  {}
/user/username/projects/myproject/packages/pkg2: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/packages/pkg2/const.cts",
  "/user/username/projects/myproject/packages/pkg2/index.ts"
]
Program options: {
  "composite": true,
  "outDir": "/user/username/projects/myproject/packages/pkg2/build",
  "module": 100,
  "watch": true,
  "traceResolution": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/packages/pkg2/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/const.cts
/user/username/projects/myproject/packages/pkg2/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/const.cts
/user/username/projects/myproject/packages/pkg2/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2022.full.d.ts (used version)
/user/username/projects/myproject/packages/pkg2/const.cts (computed .d.ts during emit)
/user/username/projects/myproject/packages/pkg2/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/packages/pkg1/index.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/packages/pkg1/build",
  "module": 100,
  "watch": true,
  "traceResolution": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/packages/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.cts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.cts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2022.full.d.ts (used version)
/user/username/projects/myproject/packages/pkg2/build/const.d.cts (used version)
/user/username/projects/myproject/packages/pkg2/build/index.d.ts (used version)
/user/username/projects/myproject/packages/pkg1/index.ts (used version)

exitCode:: ExitStatus.undefined

Change:: reports import errors after change to package file

Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{
  "name": "pkg1",
  "version": "1.0.0",
  "main": "build/index.js",
  "type": "commonjs"
}


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output 'packages/pkg1/build/tsconfig.tsbuildinfo' is older than input 'packages/pkg1/package.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/packages/pkg1/tsconfig.json'...

Found 'package.json' at '/user/username/projects/myproject/packages/pkg1/package.json'.
======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
File '/user/username/projects/myproject/packages/pkg1/package.json' exists according to earlier cached lookups.
Loading module 'pkg2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg2/package.json'.
File '/user/username/projects/myproject/node_modules/pkg2.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'build/index.js' that references '/user/username/projects/myproject/node_modules/pkg2/build/index.js'.
File name '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts', result '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/index.d.ts' with Package ID 'pkg2/build/index.d.ts@1.0.0'. ========
File '/user/username/projects/myproject/packages/pkg2/build/package.json' does not exist.
Found 'package.json' at '/user/username/projects/myproject/packages/pkg2/package.json'.
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/build/const.cjs', target file types: TypeScript, JavaScript, Declaration.
File name '/user/username/projects/myproject/packages/pkg2/build/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/build/const.cts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.d.cts' exists - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/const.d.cts'. ========
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
[96mpackages/pkg1/index.ts[0m:[93m1[0m:[93m29[0m - [91merror[0m[90m TS1541: [0mType-only import of an ECMAScript module from a CommonJS module must have a 'resolution-mode' attribute.
  To convert this file to an ECMAScript module, change its file extension to '.mts' or create a local package.json file with `{ "type": "module" }`.

[7m1[0m import type { TheNum } from 'pkg2'
[7m [0m [91m                            ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/packages/pkg1/build/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theNum = void 0;
exports.theNum = 42;


//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo]
{"root":["../index.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../index.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 64
}



Program root files: [
  "/user/username/projects/myproject/packages/pkg1/index.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/packages/pkg1/build",
  "module": 100,
  "watch": true,
  "traceResolution": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/packages/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.cts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/packages/pkg1/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: removes those errors when a package file is changed back

Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{
  "name": "pkg1",
  "version": "1.0.0",
  "main": "build/index.js",
  "type": "module"
}


Timeout callback:: count: 1
2: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
2: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because buildinfo file 'packages/pkg1/build/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/packages/pkg1/tsconfig.json'...

Found 'package.json' at '/user/username/projects/myproject/packages/pkg1/package.json'.
======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/user/username/projects/myproject/packages/pkg1/package.json' exists according to earlier cached lookups.
Loading module 'pkg2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'build/index.js' that references '/user/username/projects/myproject/node_modules/pkg2/build/index.js'.
File name '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts', result '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/index.d.ts' with Package ID 'pkg2/build/index.d.ts@1.0.0'. ========
File '/user/username/projects/myproject/packages/pkg2/build/package.json' does not exist.
Found 'package.json' at '/user/username/projects/myproject/packages/pkg2/package.json'.
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/build/const.cjs', target file types: TypeScript, JavaScript, Declaration.
File name '/user/username/projects/myproject/packages/pkg2/build/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/build/const.cts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.d.cts' exists - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/const.d.cts'. ========
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/packages/pkg1/build/index.js]
export const theNum = 42;


//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo]
{"root":["../index.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 50
}



Program root files: [
  "/user/username/projects/myproject/packages/pkg1/index.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/packages/pkg1/build",
  "module": 100,
  "watch": true,
  "traceResolution": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/packages/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.cts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/packages/pkg1/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: reports import errors after change to package file

Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{
  "name": "pkg1",
  "version": "1.0.0",
  "main": "build/index.js",
  "type": "commonjs"
}


Timeout callback:: count: 1
3: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
3: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output 'packages/pkg1/build/tsconfig.tsbuildinfo' is older than input 'packages/pkg1/package.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/packages/pkg1/tsconfig.json'...

Found 'package.json' at '/user/username/projects/myproject/packages/pkg1/package.json'.
======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
File '/user/username/projects/myproject/packages/pkg1/package.json' exists according to earlier cached lookups.
Loading module 'pkg2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg2/package.json'.
File '/user/username/projects/myproject/node_modules/pkg2.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'build/index.js' that references '/user/username/projects/myproject/node_modules/pkg2/build/index.js'.
File name '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts', result '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/index.d.ts' with Package ID 'pkg2/build/index.d.ts@1.0.0'. ========
File '/user/username/projects/myproject/packages/pkg2/build/package.json' does not exist.
Found 'package.json' at '/user/username/projects/myproject/packages/pkg2/package.json'.
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/build/const.cjs', target file types: TypeScript, JavaScript, Declaration.
File name '/user/username/projects/myproject/packages/pkg2/build/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/build/const.cts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.d.cts' exists - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/const.d.cts'. ========
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
[96mpackages/pkg1/index.ts[0m:[93m1[0m:[93m29[0m - [91merror[0m[90m TS1541: [0mType-only import of an ECMAScript module from a CommonJS module must have a 'resolution-mode' attribute.
  To convert this file to an ECMAScript module, change its file extension to '.mts' or create a local package.json file with `{ "type": "module" }`.

[7m1[0m import type { TheNum } from 'pkg2'
[7m [0m [91m                            ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/packages/pkg1/build/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theNum = void 0;
exports.theNum = 42;


//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo]
{"root":["../index.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../index.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 64
}



Program root files: [
  "/user/username/projects/myproject/packages/pkg1/index.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/packages/pkg1/build",
  "module": 100,
  "watch": true,
  "traceResolution": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/packages/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.cts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/packages/pkg1/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: removes those errors when a package file is changed to cjs extensions

Input::
//// [/user/username/projects/myproject/packages/pkg2/package.json]
{
  "name": "pkg2",
  "version": "1.0.0",
  "main": "build/index.cjs",
  "type": "module"
}

//// [/user/username/projects/myproject/packages/pkg2/index.cts]
export type { TheNum } from './const.cjs';

//// [/user/username/projects/myproject/packages/pkg2/index.ts] deleted

Timeout callback:: count: 1
8: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
8: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'packages/pkg2/tsconfig.json' is out of date because output 'packages/pkg2/build/tsconfig.tsbuildinfo' is older than input 'packages/pkg2/index.cts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/packages/pkg2/tsconfig.json'...

======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/index.cts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const.cjs', target file types: TypeScript, JavaScript, Declaration.
File name '/user/username/projects/myproject/packages/pkg2/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/const.cts' exists - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.cts'. ========
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.


//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../../home/src/tslibs/ts/lib/lib.es2022.full.d.ts","../const.cts","../index.cts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-11202312776-export type TheNum = 42;","signature":"-13194036030-export type TheNum = 42;\n","impliedFormat":1},{"version":"-9668872159-export type { TheNum } from './const.cjs';","signature":"-9835135925-export type { TheNum } from './const.cjs';\n","impliedFormat":1}],"root":[2,3],"options":{"composite":true,"module":100,"outDir":"./"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.cts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../../home/src/tslibs/ts/lib/lib.es2022.full.d.ts",
    "../const.cts",
    "../index.cts"
  ],
  "fileIdsList": [
    [
      "../const.cts"
    ]
  ],
  "fileInfos": {
    "../../../../../../../home/src/tslibs/ts/lib/lib.es2022.full.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../const.cts": {
      "original": {
        "version": "-11202312776-export type TheNum = 42;",
        "signature": "-13194036030-export type TheNum = 42;\n",
        "impliedFormat": 1
      },
      "version": "-11202312776-export type TheNum = 42;",
      "signature": "-13194036030-export type TheNum = 42;\n",
      "impliedFormat": "commonjs"
    },
    "../index.cts": {
      "original": {
        "version": "-9668872159-export type { TheNum } from './const.cjs';",
        "signature": "-9835135925-export type { TheNum } from './const.cjs';\n",
        "impliedFormat": 1
      },
      "version": "-9668872159-export type { TheNum } from './const.cjs';",
      "signature": "-9835135925-export type { TheNum } from './const.cjs';\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "../const.cts"
    ],
    [
      3,
      "../index.cts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 100,
    "outDir": "./"
  },
  "referencedMap": {
    "../index.cts": [
      "../const.cts"
    ]
  },
  "latestChangedDtsFile": "./index.d.cts",
  "version": "FakeTSVersion",
  "size": 1083
}

//// [/user/username/projects/myproject/packages/pkg2/build/index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/packages/pkg2/build/index.d.cts]
export type { TheNum } from './const.cjs';



PolledWatches::
/home/package.json:
  {"pollingInterval":2000}
/home/src/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/TS/Lib/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/package.json:
  {"pollingInterval":2000}
/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/packages/pkg2/build/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/packages/pkg1/index.ts:
  {}
/user/username/projects/myproject/packages/pkg1/package.json:
  {}
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {}
/user/username/projects/myproject/packages/pkg2/const.cts:
  {}
/user/username/projects/myproject/packages/pkg2/index.cts: *new*
  {}
/user/username/projects/myproject/packages/pkg2/package.json:
  {}
/user/username/projects/myproject/packages/pkg2/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/packages/pkg2/index.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg1:
  {}
/user/username/projects/myproject/packages/pkg2:
  {}

Timeout callback:: count: 1
9: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
9: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because buildinfo file 'packages/pkg1/build/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/packages/pkg1/tsconfig.json'...

Found 'package.json' at '/user/username/projects/myproject/packages/pkg1/package.json'.
======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
File '/user/username/projects/myproject/packages/pkg1/package.json' exists according to earlier cached lookups.
Loading module 'pkg2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg2/package.json'.
File '/user/username/projects/myproject/node_modules/pkg2.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'build/index.cjs' that references '/user/username/projects/myproject/node_modules/pkg2/build/index.cjs'.
File name '/user/username/projects/myproject/node_modules/pkg2/build/index.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.cts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.d.cts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/index.d.cts', result '/user/username/projects/myproject/packages/pkg2/build/index.d.cts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/index.d.cts' with Package ID 'pkg2/build/index.d.cts@1.0.0'. ========
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/build/index.d.cts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/build/const.cjs', target file types: TypeScript, JavaScript, Declaration.
File name '/user/username/projects/myproject/packages/pkg2/build/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/build/const.cts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.d.cts' exists - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/const.d.cts'. ========
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/packages/pkg1/build/index.js] file written with same contents
//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo]
{"root":["../index.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 50
}



Program root files: [
  "/user/username/projects/myproject/packages/pkg2/const.cts",
  "/user/username/projects/myproject/packages/pkg2/index.cts"
]
Program options: {
  "composite": true,
  "outDir": "/user/username/projects/myproject/packages/pkg2/build",
  "module": 100,
  "watch": true,
  "traceResolution": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/packages/pkg2/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/const.cts
/user/username/projects/myproject/packages/pkg2/index.cts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/index.cts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/index.cts (computed .d.ts)

Program root files: [
  "/user/username/projects/myproject/packages/pkg1/index.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/packages/pkg1/build",
  "module": 100,
  "watch": true,
  "traceResolution": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/packages/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.cts
/user/username/projects/myproject/packages/pkg2/build/index.d.cts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/build/index.d.cts
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/build/index.d.cts (used version)
/user/username/projects/myproject/packages/pkg1/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

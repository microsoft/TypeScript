currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{
  "name": "pkg1",
  "version": "1.0.0",
  "main": "build/index.js"
}

//// [/user/username/projects/myproject/packages/pkg1/index.ts]
import type { TheNum } from 'pkg2'
export const theNum: TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg1/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "build"
  },
  "references": [
    {
      "path": "../pkg2"
    }
  ]
}

//// [/user/username/projects/myproject/packages/pkg2/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "build",
    "baseUrl": "."
  }
}

//// [/user/username/projects/myproject/packages/pkg2/const.ts]
export type TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg2/index.ts]
export type { TheNum } from './const.js';

//// [/user/username/projects/myproject/packages/pkg2/other.ts]
export type TheStr = string;

//// [/user/username/projects/myproject/packages/pkg2/package.json]
{
  "name": "pkg2",
  "version": "1.0.0",
  "main": "build/index.js"
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


/home/src/tslibs/TS/Lib/tsc.js -b packages/pkg1 --verbose -w --traceResolution
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/pkg2/tsconfig.json
    * packages/pkg1/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/pkg2/tsconfig.json' is out of date because output file 'packages/pkg2/build/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/packages/pkg2/tsconfig.json'...

======== Resolving module './const.js' from '/user/username/projects/myproject/packages/pkg2/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const.js', target file types: TypeScript, Declaration.
File name '/user/username/projects/myproject/packages/pkg2/const.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/const.ts' exists - use it as a name resolution result.
======== Module name './const.js' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.ts'. ========
[[90mHH:MM:SS AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output file 'packages/pkg1/build/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/packages/pkg1/tsconfig.json'...

======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg2' from 'node_modules' folder, target file types: TypeScript, Declaration.
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
======== Resolving module './const.js' from '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/build/const.js', target file types: TypeScript, Declaration.
File name '/user/username/projects/myproject/packages/pkg2/build/const.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/build/const.ts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.tsx' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.d.ts' exists - use it as a name resolution result.
======== Module name './const.js' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/const.d.ts'. ========
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/packages/pkg2/build/const.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/packages/pkg2/build/const.d.ts]
export type TheNum = 42;


//// [/user/username/projects/myproject/packages/pkg2/build/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/packages/pkg2/build/index.d.ts]
export type { TheNum } from './const.js';


//// [/user/username/projects/myproject/packages/pkg2/build/other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/packages/pkg2/build/other.d.ts]
export type TheStr = string;


//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../../home/src/tslibs/ts/lib/lib.d.ts","../const.ts","../index.ts","../other.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-11202312776-export type TheNum = 42;","signature":"-13194036030-export type TheNum = 42;\n"},{"version":"-11225381282-export type { TheNum } from './const.js';","signature":"-9660329432-export type { TheNum } from './const.js';\n"},{"version":"-4609154030-export type TheStr = string;","signature":"-6073194916-export type TheStr = string;\n"}],"root":[[2,4]],"options":{"composite":true,"outDir":"./"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./other.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../const.ts",
    "../index.ts",
    "../other.ts"
  ],
  "fileIdsList": [
    [
      "../const.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../const.ts": {
      "original": {
        "version": "-11202312776-export type TheNum = 42;",
        "signature": "-13194036030-export type TheNum = 42;\n"
      },
      "version": "-11202312776-export type TheNum = 42;",
      "signature": "-13194036030-export type TheNum = 42;\n"
    },
    "../index.ts": {
      "original": {
        "version": "-11225381282-export type { TheNum } from './const.js';",
        "signature": "-9660329432-export type { TheNum } from './const.js';\n"
      },
      "version": "-11225381282-export type { TheNum } from './const.js';",
      "signature": "-9660329432-export type { TheNum } from './const.js';\n"
    },
    "../other.ts": {
      "original": {
        "version": "-4609154030-export type TheStr = string;",
        "signature": "-6073194916-export type TheStr = string;\n"
      },
      "version": "-4609154030-export type TheStr = string;",
      "signature": "-6073194916-export type TheStr = string;\n"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "../const.ts",
        "../index.ts",
        "../other.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "referencedMap": {
    "../index.ts": [
      "../const.ts"
    ]
  },
  "latestChangedDtsFile": "./other.d.ts",
  "version": "FakeTSVersion",
  "size": 1128
}

//// [/user/username/projects/myproject/packages/pkg1/build/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theNum = void 0;
exports.theNum = 42;


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


FsWatches::
/user/username/projects/myproject/packages/pkg1/index.ts: *new*
  {}
/user/username/projects/myproject/packages/pkg1/tsconfig.json: *new*
  {}
/user/username/projects/myproject/packages/pkg2/const.ts: *new*
  {}
/user/username/projects/myproject/packages/pkg2/index.ts: *new*
  {}
/user/username/projects/myproject/packages/pkg2/other.ts: *new*
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
  "/user/username/projects/myproject/packages/pkg2/const.ts",
  "/user/username/projects/myproject/packages/pkg2/index.ts",
  "/user/username/projects/myproject/packages/pkg2/other.ts"
]
Program options: {
  "composite": true,
  "outDir": "/user/username/projects/myproject/packages/pkg2/build",
  "baseUrl": "/user/username/projects/myproject/packages/pkg2",
  "watch": true,
  "traceResolution": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/packages/pkg2/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/packages/pkg2/const.ts
/user/username/projects/myproject/packages/pkg2/index.ts
/user/username/projects/myproject/packages/pkg2/other.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/packages/pkg2/const.ts
/user/username/projects/myproject/packages/pkg2/index.ts
/user/username/projects/myproject/packages/pkg2/other.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/packages/pkg2/const.ts (computed .d.ts during emit)
/user/username/projects/myproject/packages/pkg2/index.ts (computed .d.ts during emit)
/user/username/projects/myproject/packages/pkg2/other.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/packages/pkg1/index.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/packages/pkg1/build",
  "watch": true,
  "traceResolution": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/packages/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.ts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.ts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/packages/pkg2/build/const.d.ts (used version)
/user/username/projects/myproject/packages/pkg2/build/index.d.ts (used version)
/user/username/projects/myproject/packages/pkg1/index.ts (used version)

exitCode:: ExitStatus.undefined

Change:: reports import errors after change to package file

Input::
//// [/user/username/projects/myproject/packages/pkg2/package.json]
{
  "name": "pkg2",
  "version": "1.0.0",
  "main": "build/other.js"
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

[[90mHH:MM:SS AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output 'packages/pkg1/build/tsconfig.tsbuildinfo' is older than input 'packages/pkg2/package.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/packages/pkg1/tsconfig.json'...

======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg2' from 'node_modules' folder, target file types: TypeScript, Declaration.
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
'package.json' has 'main' field 'build/other.js' that references '/user/username/projects/myproject/node_modules/pkg2/build/other.js'.
File name '/user/username/projects/myproject/node_modules/pkg2/build/other.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/other.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/other.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/other.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/other.d.ts', result '/user/username/projects/myproject/packages/pkg2/build/other.d.ts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/other.d.ts' with Package ID 'pkg2/build/other.d.ts@1.0.0'. ========
[96mpackages/pkg1/index.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m TS2305: [0mModule '"pkg2"' has no exported member 'TheNum'.

[7m1[0m import type { TheNum } from 'pkg2'
[7m [0m [91m              ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/packages/pkg1/build/index.js] file written with same contents
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
  "watch": true,
  "traceResolution": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/packages/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/packages/pkg2/build/other.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/build/other.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/build/other.d.ts (used version)
/user/username/projects/myproject/packages/pkg1/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: removes those errors when a package file is changed back

Input::
//// [/user/username/projects/myproject/packages/pkg2/package.json]
{
  "name": "pkg2",
  "version": "1.0.0",
  "main": "build/index.js"
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

======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg2' from 'node_modules' folder, target file types: TypeScript, Declaration.
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
======== Resolving module './const.js' from '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/build/const.js', target file types: TypeScript, Declaration.
File name '/user/username/projects/myproject/packages/pkg2/build/const.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/build/const.ts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.tsx' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.d.ts' exists - use it as a name resolution result.
======== Module name './const.js' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/const.d.ts'. ========
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
  "/user/username/projects/myproject/packages/pkg1/index.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/packages/pkg1/build",
  "watch": true,
  "traceResolution": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/packages/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.ts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/build/const.d.ts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/build/const.d.ts (used version)
/user/username/projects/myproject/packages/pkg2/build/index.d.ts (used version)
/user/username/projects/myproject/packages/pkg1/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

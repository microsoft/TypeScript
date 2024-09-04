currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
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

//// [/user/username/projects/myproject/packages/pkg2/const.ts]
export type TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg2/index.ts]
export type { TheNum } from 'const';

//// [/user/username/projects/myproject/packages/pkg2/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "build",
    "baseUrl": "."
  }
}

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


/home/src/tslibs/TS/Lib/tsc.js -b packages/pkg1 --verbose --traceResolution
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/pkg2/tsconfig.json
    * packages/pkg1/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/pkg2/tsconfig.json' is out of date because output file 'packages/pkg2/build/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/packages/pkg2/tsconfig.json'...

======== Resolving module 'const' from '/user/username/projects/myproject/packages/pkg2/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/user/username/projects/myproject/packages/pkg2', using this value to resolve non-relative module name 'const'.
Resolving module name 'const' relative to base url '/user/username/projects/myproject/packages/pkg2' - '/user/username/projects/myproject/packages/pkg2/const'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const', target file types: TypeScript, Declaration.
File '/user/username/projects/myproject/packages/pkg2/const.ts' exists - use it as a name resolution result.
======== Module name 'const' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.ts'. ========
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
======== Resolving module 'const' from '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/user/username/projects/myproject/packages/pkg2', using this value to resolve non-relative module name 'const'.
Resolving module name 'const' relative to base url '/user/username/projects/myproject/packages/pkg2' - '/user/username/projects/myproject/packages/pkg2/const'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const', target file types: TypeScript, Declaration.
File '/user/username/projects/myproject/packages/pkg2/const.ts' exists - use it as a name resolution result.
======== Module name 'const' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.ts'. ========


//// [/user/username/projects/myproject/packages/pkg2/build/const.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/packages/pkg2/build/const.d.ts]
export type TheNum = 42;


//// [/user/username/projects/myproject/packages/pkg2/build/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/packages/pkg2/build/index.d.ts]
export type { TheNum } from 'const';


//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../../home/src/tslibs/ts/lib/lib.d.ts","../const.ts","../index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-11202312776-export type TheNum = 42;","signature":"-13194036030-export type TheNum = 42;\n"},{"version":"-10837689162-export type { TheNum } from 'const';","signature":"-9751391360-export type { TheNum } from 'const';\n"}],"root":[2,3],"options":{"composite":true,"outDir":"./"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../const.ts",
    "../index.ts"
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
        "version": "-10837689162-export type { TheNum } from 'const';",
        "signature": "-9751391360-export type { TheNum } from 'const';\n"
      },
      "version": "-10837689162-export type { TheNum } from 'const';",
      "signature": "-9751391360-export type { TheNum } from 'const';\n"
    }
  },
  "root": [
    [
      2,
      "../const.ts"
    ],
    [
      3,
      "../index.ts"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 990
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


exitCode:: ExitStatus.Success

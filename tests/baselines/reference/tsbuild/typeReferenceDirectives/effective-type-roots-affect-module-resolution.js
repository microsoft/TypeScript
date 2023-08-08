currentDirectory:: /users/username/projects/replay/axios-src useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
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

//// [/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts]
/// <reference types="node" />
export const z = 10;


//// [/users/username/projects/replay/axios-src/test/module/ts/index.ts]
export const y = 10;


//// [/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts]
declare const tsGlobal = 10;


//// [/users/username/projects/replay/axios-src/test/module/ts/tsconfig.json]
{"compilerOptions":{"incremental":true}}

//// [/users/username/projects/replay/axios-src/test/module/ts-require/index.ts]
export const a = 10;


//// [/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts]
declare const tsRequireGlobal = 10;


//// [/users/username/projects/replay/axios-src/test/module/ts-require/tsconfig.json]
{"compilerOptions":{"incremental":true}}



Output::
/lib/tsc -b test/module/ts-require test/module/ts --verbose --traceResolution --explainFiles
[[90m12:00:30 AM[0m] Projects in this build: 
    * test/module/ts-require/tsconfig.json
    * test/module/ts/tsconfig.json

[[90m12:00:31 AM[0m] Project 'test/module/ts-require/tsconfig.json' is out of date because output file 'test/module/ts-require/tsconfig.tsbuildinfo' does not exist

[[90m12:00:32 AM[0m] Building project '/users/username/projects/replay/axios-src/test/module/ts-require/tsconfig.json'...

======== Resolving type reference directive 'node', containing file '/users/username/projects/replay/axios-src/test/module/ts-require/__inferred type names__.ts', root directory '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types,/users/username/projects/replay/axios-src/test/module/node_modules/@types,/users/username/projects/replay/axios-src/test/node_modules/@types,/users/username/projects/replay/axios-src/node_modules/@types,/users/username/projects/replay/node_modules/@types,/users/username/projects/node_modules/@types,/users/username/node_modules/@types,/users/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types, /users/username/projects/replay/axios-src/test/module/node_modules/@types, /users/username/projects/replay/axios-src/test/node_modules/@types, /users/username/projects/replay/axios-src/node_modules/@types, /users/username/projects/replay/node_modules/@types, /users/username/projects/node_modules/@types, /users/username/node_modules/@types, /users/node_modules/@types, /node_modules/@types'.
File '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/package.json' does not exist.
File '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts', result '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts'.
======== Type reference directive 'node' was successfully resolved to '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts', primary: true. ========
======== Resolving type reference directive 'responselike', containing file '/users/username/projects/replay/axios-src/test/module/ts-require/__inferred type names__.ts', root directory '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types,/users/username/projects/replay/axios-src/test/module/node_modules/@types,/users/username/projects/replay/axios-src/test/node_modules/@types,/users/username/projects/replay/axios-src/node_modules/@types,/users/username/projects/replay/node_modules/@types,/users/username/projects/node_modules/@types,/users/username/node_modules/@types,/users/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types, /users/username/projects/replay/axios-src/test/module/node_modules/@types, /users/username/projects/replay/axios-src/test/node_modules/@types, /users/username/projects/replay/axios-src/node_modules/@types, /users/username/projects/replay/node_modules/@types, /users/username/projects/node_modules/@types, /users/username/node_modules/@types, /users/node_modules/@types, /node_modules/@types'.
Directory '/users/username/projects/replay/axios-src/test/module/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/users/username/projects/replay/axios-src/test/node_modules/@types' does not exist, skipping all lookups in it.
File '/users/username/projects/replay/axios-src/node_modules/@types/responselike/package.json' does not exist.
File '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts', result '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts'.
======== Type reference directive 'responselike' was successfully resolved to '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts', primary: true. ========
======== Resolving type reference directive 'node', containing file '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts', root directory '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types,/users/username/projects/replay/axios-src/test/module/node_modules/@types,/users/username/projects/replay/axios-src/test/node_modules/@types,/users/username/projects/replay/axios-src/node_modules/@types,/users/username/projects/replay/node_modules/@types,/users/username/projects/node_modules/@types,/users/username/node_modules/@types,/users/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types, /users/username/projects/replay/axios-src/test/module/node_modules/@types, /users/username/projects/replay/axios-src/test/node_modules/@types, /users/username/projects/replay/axios-src/node_modules/@types, /users/username/projects/replay/node_modules/@types, /users/username/projects/node_modules/@types, /users/username/node_modules/@types, /users/node_modules/@types, /node_modules/@types'.
File '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
File '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts', result '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts'.
======== Type reference directive 'node' was successfully resolved to '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts', primary: true. ========
../../../../../lib/lib.d.ts
  Default library for target 'es5'
test/module/ts-require/index.ts
  Matched by default include pattern '**/*'
test/module/ts-require/node_modules/@types/node/index.d.ts
  Entry point for implicit type library 'node'
node_modules/@types/responselike/index.d.ts
  Entry point for implicit type library 'responselike'
[[90m12:00:37 AM[0m] Project 'test/module/ts/tsconfig.json' is out of date because output file 'test/module/ts/tsconfig.tsbuildinfo' does not exist

[[90m12:00:38 AM[0m] Building project '/users/username/projects/replay/axios-src/test/module/ts/tsconfig.json'...

======== Resolving type reference directive 'node', containing file '/users/username/projects/replay/axios-src/test/module/ts/__inferred type names__.ts', root directory '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types,/users/username/projects/replay/axios-src/test/module/node_modules/@types,/users/username/projects/replay/axios-src/test/node_modules/@types,/users/username/projects/replay/axios-src/node_modules/@types,/users/username/projects/replay/node_modules/@types,/users/username/projects/node_modules/@types,/users/username/node_modules/@types,/users/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types, /users/username/projects/replay/axios-src/test/module/node_modules/@types, /users/username/projects/replay/axios-src/test/node_modules/@types, /users/username/projects/replay/axios-src/node_modules/@types, /users/username/projects/replay/node_modules/@types, /users/username/projects/node_modules/@types, /users/username/node_modules/@types, /users/node_modules/@types, /node_modules/@types'.
File '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/package.json' does not exist.
File '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts', result '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts'.
======== Type reference directive 'node' was successfully resolved to '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts', primary: true. ========
======== Resolving type reference directive 'responselike', containing file '/users/username/projects/replay/axios-src/test/module/ts/__inferred type names__.ts', root directory '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types,/users/username/projects/replay/axios-src/test/module/node_modules/@types,/users/username/projects/replay/axios-src/test/node_modules/@types,/users/username/projects/replay/axios-src/node_modules/@types,/users/username/projects/replay/node_modules/@types,/users/username/projects/node_modules/@types,/users/username/node_modules/@types,/users/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types, /users/username/projects/replay/axios-src/test/module/node_modules/@types, /users/username/projects/replay/axios-src/test/node_modules/@types, /users/username/projects/replay/axios-src/node_modules/@types, /users/username/projects/replay/node_modules/@types, /users/username/projects/node_modules/@types, /users/username/node_modules/@types, /users/node_modules/@types, /node_modules/@types'.
Directory '/users/username/projects/replay/axios-src/test/module/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/users/username/projects/replay/axios-src/test/node_modules/@types' does not exist, skipping all lookups in it.
File '/users/username/projects/replay/axios-src/node_modules/@types/responselike/package.json' does not exist according to earlier cached lookups.
File '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts', result '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts'.
======== Type reference directive 'responselike' was successfully resolved to '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts', primary: true. ========
======== Resolving type reference directive 'node', containing file '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts'. ========
Resolution for type reference directive 'node' was found in cache from location '/users/username/projects/replay/axios-src/node_modules/@types/responselike'.
======== Type reference directive 'node' was successfully resolved to '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts', primary: true. ========
../../../../../lib/lib.d.ts
  Default library for target 'es5'
test/module/ts/index.ts
  Matched by default include pattern '**/*'
test/module/ts/node_modules/@types/node/index.d.ts
  Entry point for implicit type library 'node'
node_modules/@types/responselike/index.d.ts
  Entry point for implicit type library 'responselike'
exitCode:: ExitStatus.Success


//// [/users/username/projects/replay/axios-src/test/module/ts/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 10;


//// [/users/username/projects/replay/axios-src/test/module/ts/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../../../lib/lib.d.ts","./index.ts","./node_modules/@types/node/index.d.ts","../../../node_modules/@types/responselike/index.d.ts","../ts-require/node_modules/@types/node/index.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-15001859510-export const y = 10;\n",{"version":"-7116520553-declare const tsGlobal = 10;\n","affectsGlobalScope":true},"4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n"],"root":[2],"fileIdsList":[[5]],"referencedMap":[[4,1]],"exportedModulesMap":[[4,1]],"semanticDiagnosticsPerFile":[1,4,2,3]},"version":"FakeTSVersion"}

//// [/users/username/projects/replay/axios-src/test/module/ts/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../../../lib/lib.d.ts",
      "./index.ts",
      "./node_modules/@types/node/index.d.ts",
      "../../../node_modules/@types/responselike/index.d.ts",
      "../ts-require/node_modules/@types/node/index.d.ts"
    ],
    "fileNamesList": [
      [
        "../ts-require/node_modules/@types/node/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-15001859510-export const y = 10;\n",
        "signature": "-15001859510-export const y = 10;\n"
      },
      "./node_modules/@types/node/index.d.ts": {
        "original": {
          "version": "-7116520553-declare const tsGlobal = 10;\n",
          "affectsGlobalScope": true
        },
        "version": "-7116520553-declare const tsGlobal = 10;\n",
        "signature": "-7116520553-declare const tsGlobal = 10;\n",
        "affectsGlobalScope": true
      },
      "../../../node_modules/@types/responselike/index.d.ts": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
        "signature": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "referencedMap": {
      "../../../node_modules/@types/responselike/index.d.ts": [
        "../ts-require/node_modules/@types/node/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../../../node_modules/@types/responselike/index.d.ts": [
        "../ts-require/node_modules/@types/node/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../../../lib/lib.d.ts",
      "../../../node_modules/@types/responselike/index.d.ts",
      "./index.ts",
      "./node_modules/@types/node/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1059
}

//// [/users/username/projects/replay/axios-src/test/module/ts-require/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;


//// [/users/username/projects/replay/axios-src/test/module/ts-require/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../../../lib/lib.d.ts","./index.ts","./node_modules/@types/node/index.d.ts","../../../node_modules/@types/responselike/index.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-15642274510-export const a = 10;\n",{"version":"-5802762828-declare const tsRequireGlobal = 10;\n","affectsGlobalScope":true},"4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n"],"root":[2],"fileIdsList":[[3]],"referencedMap":[[4,1]],"exportedModulesMap":[[4,1]],"semanticDiagnosticsPerFile":[1,4,2,3]},"version":"FakeTSVersion"}

//// [/users/username/projects/replay/axios-src/test/module/ts-require/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../../../lib/lib.d.ts",
      "./index.ts",
      "./node_modules/@types/node/index.d.ts",
      "../../../node_modules/@types/responselike/index.d.ts"
    ],
    "fileNamesList": [
      [
        "./node_modules/@types/node/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-15642274510-export const a = 10;\n",
        "signature": "-15642274510-export const a = 10;\n"
      },
      "./node_modules/@types/node/index.d.ts": {
        "original": {
          "version": "-5802762828-declare const tsRequireGlobal = 10;\n",
          "affectsGlobalScope": true
        },
        "version": "-5802762828-declare const tsRequireGlobal = 10;\n",
        "signature": "-5802762828-declare const tsRequireGlobal = 10;\n",
        "affectsGlobalScope": true
      },
      "../../../node_modules/@types/responselike/index.d.ts": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
        "signature": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "referencedMap": {
      "../../../node_modules/@types/responselike/index.d.ts": [
        "./node_modules/@types/node/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../../../node_modules/@types/responselike/index.d.ts": [
        "./node_modules/@types/node/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../../../lib/lib.d.ts",
      "../../../node_modules/@types/responselike/index.d.ts",
      "./index.ts",
      "./node_modules/@types/node/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1014
}



Change:: build ts project with edit
Input::
//// [/users/username/projects/replay/axios-src/test/module/ts/index.ts]
export const y = 10;
export const z = 10;



Output::
/lib/tsc -b test/module/ts-require test/module/ts --verbose --traceResolution --explainFiles
[[90m12:00:44 AM[0m] Projects in this build: 
    * test/module/ts-require/tsconfig.json
    * test/module/ts/tsconfig.json

[[90m12:00:45 AM[0m] Project 'test/module/ts-require/tsconfig.json' is up to date because newest input 'test/module/ts-require/index.ts' is older than output 'test/module/ts-require/tsconfig.tsbuildinfo'

[[90m12:00:46 AM[0m] Project 'test/module/ts/tsconfig.json' is out of date because output 'test/module/ts/tsconfig.tsbuildinfo' is older than input 'test/module/ts/index.ts'

[[90m12:00:47 AM[0m] Building project '/users/username/projects/replay/axios-src/test/module/ts/tsconfig.json'...

======== Resolving type reference directive 'node', containing file '/users/username/projects/replay/axios-src/test/module/ts/__inferred type names__.ts', root directory '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types,/users/username/projects/replay/axios-src/test/module/node_modules/@types,/users/username/projects/replay/axios-src/test/node_modules/@types,/users/username/projects/replay/axios-src/node_modules/@types,/users/username/projects/replay/node_modules/@types,/users/username/projects/node_modules/@types,/users/username/node_modules/@types,/users/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types, /users/username/projects/replay/axios-src/test/module/node_modules/@types, /users/username/projects/replay/axios-src/test/node_modules/@types, /users/username/projects/replay/axios-src/node_modules/@types, /users/username/projects/replay/node_modules/@types, /users/username/projects/node_modules/@types, /users/username/node_modules/@types, /users/node_modules/@types, /node_modules/@types'.
File '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/package.json' does not exist.
File '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts', result '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts'.
======== Type reference directive 'node' was successfully resolved to '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts', primary: true. ========
======== Resolving type reference directive 'responselike', containing file '/users/username/projects/replay/axios-src/test/module/ts/__inferred type names__.ts', root directory '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types,/users/username/projects/replay/axios-src/test/module/node_modules/@types,/users/username/projects/replay/axios-src/test/node_modules/@types,/users/username/projects/replay/axios-src/node_modules/@types,/users/username/projects/replay/node_modules/@types,/users/username/projects/node_modules/@types,/users/username/node_modules/@types,/users/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types, /users/username/projects/replay/axios-src/test/module/node_modules/@types, /users/username/projects/replay/axios-src/test/node_modules/@types, /users/username/projects/replay/axios-src/node_modules/@types, /users/username/projects/replay/node_modules/@types, /users/username/projects/node_modules/@types, /users/username/node_modules/@types, /users/node_modules/@types, /node_modules/@types'.
Directory '/users/username/projects/replay/axios-src/test/module/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/users/username/projects/replay/axios-src/test/node_modules/@types' does not exist, skipping all lookups in it.
File '/users/username/projects/replay/axios-src/node_modules/@types/responselike/package.json' does not exist.
File '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts', result '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts'.
======== Type reference directive 'responselike' was successfully resolved to '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts', primary: true. ========
======== Resolving type reference directive 'node', containing file '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts', root directory '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types,/users/username/projects/replay/axios-src/test/module/node_modules/@types,/users/username/projects/replay/axios-src/test/node_modules/@types,/users/username/projects/replay/axios-src/node_modules/@types,/users/username/projects/replay/node_modules/@types,/users/username/projects/node_modules/@types,/users/username/node_modules/@types,/users/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types, /users/username/projects/replay/axios-src/test/module/node_modules/@types, /users/username/projects/replay/axios-src/test/node_modules/@types, /users/username/projects/replay/axios-src/node_modules/@types, /users/username/projects/replay/node_modules/@types, /users/username/projects/node_modules/@types, /users/username/node_modules/@types, /users/node_modules/@types, /node_modules/@types'.
File '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
File '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts', result '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts'.
======== Type reference directive 'node' was successfully resolved to '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts', primary: true. ========
../../../../../lib/lib.d.ts
  Default library for target 'es5'
test/module/ts/index.ts
  Matched by default include pattern '**/*'
test/module/ts/node_modules/@types/node/index.d.ts
  Entry point for implicit type library 'node'
node_modules/@types/responselike/index.d.ts
  Entry point for implicit type library 'responselike'
exitCode:: ExitStatus.Success


//// [/users/username/projects/replay/axios-src/test/module/ts/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = exports.y = void 0;
exports.y = 10;
exports.z = 10;


//// [/users/username/projects/replay/axios-src/test/module/ts/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../../../lib/lib.d.ts","./index.ts","./node_modules/@types/node/index.d.ts","../../../node_modules/@types/responselike/index.d.ts","../ts-require/node_modules/@types/node/index.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14419396410-export const y = 10;\nexport const z = 10;","signature":"-7595215440-export declare const y = 10;\nexport declare const z = 10;\n"},{"version":"-7116520553-declare const tsGlobal = 10;\n","affectsGlobalScope":true},"4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n"],"root":[2],"fileIdsList":[[3],[5]],"referencedMap":[[4,1]],"exportedModulesMap":[[4,2]],"semanticDiagnosticsPerFile":[1,4,2,3]},"version":"FakeTSVersion"}

//// [/users/username/projects/replay/axios-src/test/module/ts/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../../../lib/lib.d.ts",
      "./index.ts",
      "./node_modules/@types/node/index.d.ts",
      "../../../node_modules/@types/responselike/index.d.ts",
      "../ts-require/node_modules/@types/node/index.d.ts"
    ],
    "fileNamesList": [
      [
        "./node_modules/@types/node/index.d.ts"
      ],
      [
        "../ts-require/node_modules/@types/node/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "original": {
          "version": "-14419396410-export const y = 10;\nexport const z = 10;",
          "signature": "-7595215440-export declare const y = 10;\nexport declare const z = 10;\n"
        },
        "version": "-14419396410-export const y = 10;\nexport const z = 10;",
        "signature": "-7595215440-export declare const y = 10;\nexport declare const z = 10;\n"
      },
      "./node_modules/@types/node/index.d.ts": {
        "original": {
          "version": "-7116520553-declare const tsGlobal = 10;\n",
          "affectsGlobalScope": true
        },
        "version": "-7116520553-declare const tsGlobal = 10;\n",
        "signature": "-7116520553-declare const tsGlobal = 10;\n",
        "affectsGlobalScope": true
      },
      "../../../node_modules/@types/responselike/index.d.ts": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
        "signature": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "referencedMap": {
      "../../../node_modules/@types/responselike/index.d.ts": [
        "./node_modules/@types/node/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../../../node_modules/@types/responselike/index.d.ts": [
        "../ts-require/node_modules/@types/node/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../../../lib/lib.d.ts",
      "../../../node_modules/@types/responselike/index.d.ts",
      "./index.ts",
      "./node_modules/@types/node/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1182
}


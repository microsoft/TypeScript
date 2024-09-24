currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/packages/pkg1_index.ts]
export const theNum: TheNum = "type1";

//// [/home/src/workspaces/project/packages/pkg1.tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "typeRoots": [
      "./typeroot1"
    ]
  },
  "files": [
    "./pkg1_index.ts"
  ]
}

//// [/home/src/workspaces/project/packages/typeroot1/sometype/index.d.ts]
declare type TheNum = "type1";

//// [/home/src/workspaces/project/packages/pkg2_index.ts]
export const theNum: TheNum2 = "type2";

//// [/home/src/workspaces/project/packages/pkg2.tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "typeRoots": [
      "./typeroot2"
    ]
  },
  "files": [
    "./pkg2_index.ts"
  ]
}

//// [/home/src/workspaces/project/packages/typeroot2/sometype/index.d.ts]
declare type TheNum2 = "type2";

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


/home/src/tslibs/TS/Lib/tsc.js -b packages/pkg1.tsconfig.json packages/pkg2.tsconfig.json --verbose --traceResolution
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/pkg1.tsconfig.json
    * packages/pkg2.tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/pkg1.tsconfig.json' is out of date because output file 'packages/pkg1.tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/packages/pkg1.tsconfig.json'...

File '/home/src/workspaces/project/packages/package.json' does not exist.
File '/home/src/workspaces/project/package.json' does not exist.
File '/home/src/workspaces/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
======== Resolving type reference directive 'sometype', containing file '/home/src/workspaces/project/packages/__inferred type names__.ts', root directory '/home/src/workspaces/project/packages/typeroot1'. ========
Resolving with primary search path '/home/src/workspaces/project/packages/typeroot1'.
File '/home/src/workspaces/project/packages/typeroot1/sometype.d.ts' does not exist.
File '/home/src/workspaces/project/packages/typeroot1/sometype/package.json' does not exist.
File '/home/src/workspaces/project/packages/typeroot1/sometype/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/packages/typeroot1/sometype/index.d.ts', result '/home/src/workspaces/project/packages/typeroot1/sometype/index.d.ts'.
======== Type reference directive 'sometype' was successfully resolved to '/home/src/workspaces/project/packages/typeroot1/sometype/index.d.ts', primary: true. ========
File '/home/src/workspaces/project/packages/typeroot1/sometype/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/packages/typeroot1/package.json' does not exist.
File '/home/src/workspaces/project/packages/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[[90mHH:MM:SS AM[0m] Project 'packages/pkg2.tsconfig.json' is out of date because output file 'packages/pkg2.tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/packages/pkg2.tsconfig.json'...

File '/home/src/workspaces/project/packages/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving type reference directive 'sometype', containing file '/home/src/workspaces/project/packages/__inferred type names__.ts', root directory '/home/src/workspaces/project/packages/typeroot2'. ========
Resolving with primary search path '/home/src/workspaces/project/packages/typeroot2'.
File '/home/src/workspaces/project/packages/typeroot2/sometype.d.ts' does not exist.
File '/home/src/workspaces/project/packages/typeroot2/sometype/package.json' does not exist.
File '/home/src/workspaces/project/packages/typeroot2/sometype/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/packages/typeroot2/sometype/index.d.ts', result '/home/src/workspaces/project/packages/typeroot2/sometype/index.d.ts'.
======== Type reference directive 'sometype' was successfully resolved to '/home/src/workspaces/project/packages/typeroot2/sometype/index.d.ts', primary: true. ========
File '/home/src/workspaces/project/packages/typeroot2/sometype/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/packages/typeroot2/package.json' does not exist.
File '/home/src/workspaces/project/packages/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.


//// [/home/src/workspaces/project/packages/pkg1_index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theNum = void 0;
exports.theNum = "type1";


//// [/home/src/workspaces/project/packages/pkg1_index.d.ts]
export declare const theNum: TheNum;


//// [/home/src/workspaces/project/packages/pkg1.tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./pkg1_index.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-9601687719-export const theNum: TheNum = \"type1\";","signature":"-11475605505-export declare const theNum: TheNum;\n","impliedFormat":1},{"version":"-4557394441-declare type TheNum = \"type1\";","affectsGlobalScope":true,"impliedFormat":1}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./pkg1_index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/packages/pkg1.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./pkg1_index.ts",
    "./typeroot1/sometype/index.d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
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
    "./pkg1_index.ts": {
      "original": {
        "version": "-9601687719-export const theNum: TheNum = \"type1\";",
        "signature": "-11475605505-export declare const theNum: TheNum;\n",
        "impliedFormat": 1
      },
      "version": "-9601687719-export const theNum: TheNum = \"type1\";",
      "signature": "-11475605505-export declare const theNum: TheNum;\n",
      "impliedFormat": "commonjs"
    },
    "./typeroot1/sometype/index.d.ts": {
      "original": {
        "version": "-4557394441-declare type TheNum = \"type1\";",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4557394441-declare type TheNum = \"type1\";",
      "signature": "-4557394441-declare type TheNum = \"type1\";",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./pkg1_index.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./pkg1_index.d.ts",
  "version": "FakeTSVersion",
  "size": 975
}

//// [/home/src/workspaces/project/packages/pkg2_index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theNum = void 0;
exports.theNum = "type2";


//// [/home/src/workspaces/project/packages/pkg2_index.d.ts]
export declare const theNum: TheNum2;


//// [/home/src/workspaces/project/packages/pkg2.tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./pkg2_index.ts","./typeroot2/sometype/index.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-12823281204-export const theNum: TheNum2 = \"type2\";","signature":"-13622769679-export declare const theNum: TheNum2;\n","impliedFormat":1},{"version":"-980425686-declare type TheNum2 = \"type2\";","affectsGlobalScope":true,"impliedFormat":1}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./pkg2_index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/packages/pkg2.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./pkg2_index.ts",
    "./typeroot2/sometype/index.d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
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
    "./pkg2_index.ts": {
      "original": {
        "version": "-12823281204-export const theNum: TheNum2 = \"type2\";",
        "signature": "-13622769679-export declare const theNum: TheNum2;\n",
        "impliedFormat": 1
      },
      "version": "-12823281204-export const theNum: TheNum2 = \"type2\";",
      "signature": "-13622769679-export declare const theNum: TheNum2;\n",
      "impliedFormat": "commonjs"
    },
    "./typeroot2/sometype/index.d.ts": {
      "original": {
        "version": "-980425686-declare type TheNum2 = \"type2\";",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-980425686-declare type TheNum2 = \"type2\";",
      "signature": "-980425686-declare type TheNum2 = \"type2\";",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./pkg2_index.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./pkg2_index.d.ts",
  "version": "FakeTSVersion",
  "size": 978
}


exitCode:: ExitStatus.Success

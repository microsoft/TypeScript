currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/tsconfig.json]
{
  "references": [
    {
      "path": "./shared/tsconfig.json"
    },
    {
      "path": "./webpack/tsconfig.json"
    }
  ],
  "files": []
}

//// [/home/src/workspaces/solution/shared/tsconfig-base.json]
{
  "include": [
    "./typings-base/"
  ]
}

//// [/home/src/workspaces/solution/shared/typings-base/globals.d.ts]
type Unrestricted = any;

//// [/home/src/workspaces/solution/shared/tsconfig.json]
{
  "extends": "./tsconfig-base.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "../target-tsc-build/",
    "rootDir": ".."
  },
  "files": [
    "./index.ts"
  ]
}

//// [/home/src/workspaces/solution/shared/index.ts]
export const a: Unrestricted = 1;

//// [/home/src/workspaces/solution/webpack/tsconfig.json]
{
  "extends": "../shared/tsconfig-base.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "../target-tsc-build/",
    "rootDir": ".."
  },
  "files": [
    "./index.ts"
  ],
  "references": [
    {
      "path": "../shared/tsconfig.json"
    }
  ]
}

//// [/home/src/workspaces/solution/webpack/index.ts]
export const b: Unrestricted = 1;

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


/home/src/tslibs/TS/Lib/tsc.js --b webpack/tsconfig.json --v --listFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * shared/tsconfig.json
    * webpack/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'shared/tsconfig.json' is out of date because output file 'target-tsc-build/shared/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/shared/tsconfig.json'...

/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/shared/index.ts
/home/src/workspaces/solution/shared/typings-base/globals.d.ts
[[90mHH:MM:SS AM[0m] Project 'webpack/tsconfig.json' is out of date because output file 'target-tsc-build/webpack/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/webpack/tsconfig.json'...

/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/webpack/index.ts
/home/src/workspaces/solution/shared/typings-base/globals.d.ts


//// [/home/src/workspaces/solution/target-tsc-build/shared/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 1;


//// [/home/src/workspaces/solution/target-tsc-build/shared/index.d.ts]
export declare const a: Unrestricted;


//// [/home/src/workspaces/solution/target-tsc-build/shared/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","../../shared/index.ts","../../shared/typings-base/globals.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-22125360210-export const a: Unrestricted = 1;","signature":"115643418-export declare const a: Unrestricted;\n"},{"version":"4725476611-type Unrestricted = any;","affectsGlobalScope":true}],"root":[2,3],"options":{"composite":true,"outDir":"..","rootDir":"../.."},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/target-tsc-build/shared/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "../../shared/index.ts",
    "../../shared/typings-base/globals.d.ts"
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../shared/index.ts": {
      "original": {
        "version": "-22125360210-export const a: Unrestricted = 1;",
        "signature": "115643418-export declare const a: Unrestricted;\n"
      },
      "version": "-22125360210-export const a: Unrestricted = 1;",
      "signature": "115643418-export declare const a: Unrestricted;\n"
    },
    "../../shared/typings-base/globals.d.ts": {
      "original": {
        "version": "4725476611-type Unrestricted = any;",
        "affectsGlobalScope": true
      },
      "version": "4725476611-type Unrestricted = any;",
      "signature": "4725476611-type Unrestricted = any;",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "../../shared/index.ts"
    ],
    [
      3,
      "../../shared/typings-base/globals.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "..",
    "rootDir": "../.."
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 949
}

//// [/home/src/workspaces/solution/target-tsc-build/webpack/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 1;


//// [/home/src/workspaces/solution/target-tsc-build/webpack/index.d.ts]
export declare const b: Unrestricted;


//// [/home/src/workspaces/solution/target-tsc-build/webpack/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","../../webpack/index.ts","../../shared/typings-base/globals.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14405273073-export const b: Unrestricted = 1;","signature":"-6010538469-export declare const b: Unrestricted;\n"},{"version":"4725476611-type Unrestricted = any;","affectsGlobalScope":true}],"root":[2,3],"options":{"composite":true,"outDir":"..","rootDir":"../.."},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/target-tsc-build/webpack/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "../../webpack/index.ts",
    "../../shared/typings-base/globals.d.ts"
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../webpack/index.ts": {
      "original": {
        "version": "-14405273073-export const b: Unrestricted = 1;",
        "signature": "-6010538469-export declare const b: Unrestricted;\n"
      },
      "version": "-14405273073-export const b: Unrestricted = 1;",
      "signature": "-6010538469-export declare const b: Unrestricted;\n"
    },
    "../../shared/typings-base/globals.d.ts": {
      "original": {
        "version": "4725476611-type Unrestricted = any;",
        "affectsGlobalScope": true
      },
      "version": "4725476611-type Unrestricted = any;",
      "signature": "4725476611-type Unrestricted = any;",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "../../webpack/index.ts"
    ],
    [
      3,
      "../../shared/typings-base/globals.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "..",
    "rootDir": "../.."
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 952
}


exitCode:: ExitStatus.Success

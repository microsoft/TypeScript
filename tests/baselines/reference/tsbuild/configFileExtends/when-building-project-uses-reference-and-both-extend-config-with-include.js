currentDirectory:: / useCaseSensitiveFileNames: false
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

//// [/src/shared/index.ts]
export const a: Unrestricted = 1;

//// [/src/shared/tsconfig-base.json]
{
  "include": [
    "./typings-base/"
  ]
}

//// [/src/shared/tsconfig.json]
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

//// [/src/shared/typings-base/globals.d.ts]
type Unrestricted = any;

//// [/src/tsconfig.json]
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

//// [/src/webpack/index.ts]
export const b: Unrestricted = 1;

//// [/src/webpack/tsconfig.json]
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



Output::
/lib/tsc --b /src/webpack/tsconfig.json --v --listFiles
[[90m12:00:16 AM[0m] Projects in this build: 
    * src/shared/tsconfig.json
    * src/webpack/tsconfig.json

[[90m12:00:17 AM[0m] Project 'src/shared/tsconfig.json' is out of date because output file 'src/target-tsc-build/shared/tsconfig.tsbuildinfo' does not exist

[[90m12:00:18 AM[0m] Building project '/src/shared/tsconfig.json'...

/lib/lib.d.ts
/src/shared/index.ts
/src/shared/typings-base/globals.d.ts
[[90m12:00:26 AM[0m] Project 'src/webpack/tsconfig.json' is out of date because output file 'src/target-tsc-build/webpack/tsconfig.tsbuildinfo' does not exist

[[90m12:00:27 AM[0m] Building project '/src/webpack/tsconfig.json'...

/lib/lib.d.ts
/src/webpack/index.ts
/src/shared/typings-base/globals.d.ts
exitCode:: ExitStatus.Success


//// [/src/target-tsc-build/shared/index.d.ts]
export declare const a: Unrestricted;


//// [/src/target-tsc-build/shared/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 1;


//// [/src/target-tsc-build/shared/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","../../shared/index.ts","../../shared/typings-base/globals.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-22125360210-export const a: Unrestricted = 1;","signature":"115643418-export declare const a: Unrestricted;\n"},{"version":"4725476611-type Unrestricted = any;","affectsGlobalScope":true}],"root":[2,3],"options":{"composite":true,"outDir":"..","rootDir":"../.."},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/src/target-tsc-build/shared/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "../../shared/index.ts",
      "../../shared/typings-base/globals.d.ts"
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
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
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../shared/index.ts",
      "../../shared/typings-base/globals.d.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1028
}

//// [/src/target-tsc-build/webpack/index.d.ts]
export declare const b: Unrestricted;


//// [/src/target-tsc-build/webpack/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 1;


//// [/src/target-tsc-build/webpack/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","../../webpack/index.ts","../../shared/typings-base/globals.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14405273073-export const b: Unrestricted = 1;","signature":"-6010538469-export declare const b: Unrestricted;\n"},{"version":"4725476611-type Unrestricted = any;","affectsGlobalScope":true}],"root":[2,3],"options":{"composite":true,"outDir":"..","rootDir":"../.."},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/src/target-tsc-build/webpack/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "../../webpack/index.ts",
      "../../shared/typings-base/globals.d.ts"
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
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
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../shared/typings-base/globals.d.ts",
      "../../webpack/index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1031
}


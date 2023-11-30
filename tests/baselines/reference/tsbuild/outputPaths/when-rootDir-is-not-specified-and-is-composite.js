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

//// [/src/src/index.ts]
export const x = 10;

//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "dist",
    "composite": true
  }
}



Output::
/lib/tsc --b /src/tsconfig.json -v
[[90m12:00:09 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:10 AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/dist/tsconfig.tsbuildinfo' does not exist

[[90m12:00:11 AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/dist/src/index.d.ts]
export declare const x = 10;


//// [/src/dist/src/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/dist/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../src/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"}],"root":[2],"options":{"composite":true,"outDir":"./"},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./src/index.d.ts"},"version":"FakeTSVersion"}

//// [/src/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../src/index.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../src/index.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6821242887-export declare const x = 10;\n"
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      }
    },
    "root": [
      [
        2,
        "../src/index.ts"
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../src/index.ts"
    ],
    "latestChangedDtsFile": "./src/index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 864
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json -v
[[90m12:00:19 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:20 AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/src/index.ts' is older than output 'src/dist/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: Normal build without change, that does not block emit on error to show files that get emitted
Input::


Output::
/lib/tsc -p /src/tsconfig.json
exitCode:: ExitStatus.Success



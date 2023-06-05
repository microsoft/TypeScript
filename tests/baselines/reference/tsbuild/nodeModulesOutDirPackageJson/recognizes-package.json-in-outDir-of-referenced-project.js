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

//// [/shared/dist/package.json]
{"type":"module"}

//// [/shared/red.ts]
export const red = 'fish';

//// [/shared/tsconfig.json]
{"compilerOptions":{"target":"es5","composite":true,"outDir":"dist"}}

//// [/src/index.ts]
import { red } from '../shared/red';

//// [/src/tsconfig.json]
{"compilerOptions":{"target":"es5","module":"nodenext","noEmit":true},"references":[{"path":"../shared"}]}



Output::
/lib/tsc -b /src/tsconfig.json -v
[[90m12:00:13 AM[0m] Projects in this build: 
    * shared/tsconfig.json
    * src/tsconfig.json

[[90m12:00:14 AM[0m] Project 'shared/tsconfig.json' is out of date because output file 'shared/dist/tsconfig.tsbuildinfo' does not exist

[[90m12:00:15 AM[0m] Building project '/shared/tsconfig.json'...

[[90m12:00:21 AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/index.js' does not exist

[[90m12:00:22 AM[0m] Building project '/src/tsconfig.json'...

[96msrc/index.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("../shared/red")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts' or create a local package.json file with `{ "type": "module" }`.

[7m1[0m import { red } from '../shared/red';
[7m [0m [91m                    ~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/shared/dist/red.d.ts]
export declare const red = "fish";


//// [/shared/dist/red.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.red = void 0;
exports.red = 'fish';


//// [/shared/dist/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../red.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12638551303-export const red = 'fish';","signature":"-3876195575-export declare const red = \"fish\";\n"}],"root":[2],"options":{"composite":true,"outDir":"./","target":1},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./red.d.ts"},"version":"FakeTSVersion"}

//// [/shared/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../red.ts"
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
      "../red.ts": {
        "original": {
          "version": "-12638551303-export const red = 'fish';",
          "signature": "-3876195575-export declare const red = \"fish\";\n"
        },
        "version": "-12638551303-export const red = 'fish';",
        "signature": "-3876195575-export declare const red = \"fish\";\n"
      }
    },
    "root": [
      [
        2,
        "../red.ts"
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./",
      "target": 1
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../red.ts"
    ],
    "latestChangedDtsFile": "./red.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 877
}


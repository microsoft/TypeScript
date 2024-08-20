currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/alpha/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "bin"
  },
  "references": []
}

//// [/alpha/src/a.ts]
export const m: number = 3;

//// [/home/src/tslibs/ts/lib/lib.d.ts]
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


/home/src/tslibs/ts/lib/tsc.js --p /alpha/tsconfig.json
Output::


//// [/alpha/bin/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m = void 0;
exports.m = 3;


//// [/alpha/bin/src/a.d.ts]
export declare const m: number;


//// [/alpha/bin/tsconfig.tsbuildinfo]
{"fileNames":["../../home/src/tslibs/ts/lib/lib.d.ts","../src/a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12181672471-export const m: number = 3;","signature":"-6260611917-export declare const m: number;\n"}],"root":[2],"options":{"composite":true,"outDir":"./"},"latestChangedDtsFile":"./src/a.d.ts","version":"FakeTSVersion"}

//// [/alpha/bin/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../home/src/tslibs/ts/lib/lib.d.ts",
    "../src/a.ts"
  ],
  "fileInfos": {
    "../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../src/a.ts": {
      "original": {
        "version": "-12181672471-export const m: number = 3;",
        "signature": "-6260611917-export declare const m: number;\n"
      },
      "version": "-12181672471-export const m: number = 3;",
      "signature": "-6260611917-export declare const m: number;\n"
    }
  },
  "root": [
    [
      2,
      "../src/a.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "latestChangedDtsFile": "./src/a.d.ts",
  "version": "FakeTSVersion",
  "size": 795
}


exitCode:: ExitStatus.Success

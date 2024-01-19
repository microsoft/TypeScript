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

//// [/primary/a.ts]
export { };

//// [/primary/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "bin",
    "declaration": false
  },
  "references": []
}



Output::
/lib/tsc --p /primary/tsconfig.json
[96mprimary/tsconfig.json[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS6304: [0mComposite projects may not disable declaration emit.

[7m5[0m     "declaration": false
[7m [0m [91m    ~~~~~~~~~~~~~[0m


Found 1 error in primary/tsconfig.json[90m:5[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/primary/bin/a.d.ts]
export {};


//// [/primary/bin/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/primary/bin/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3531955686-export { };","signature":"-3531856636-export {};\n"}],"root":[2],"options":{"composite":true,"declaration":false,"outDir":"./"},"referencedMap":[],"exportedModulesMap":[],"latestChangedDtsFile":"./a.d.ts"},"version":"FakeTSVersion"}

//// [/primary/bin/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../a.ts"
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
      "../a.ts": {
        "original": {
          "version": "-3531955686-export { };",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-3531955686-export { };",
        "signature": "-3531856636-export {};\n"
      }
    },
    "root": [
      [
        2,
        "../a.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": false,
      "outDir": "./"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "latestChangedDtsFile": "./a.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 805
}


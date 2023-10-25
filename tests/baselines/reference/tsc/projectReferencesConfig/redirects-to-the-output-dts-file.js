currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/alpha/a.ts]
export const m: number = 3;

//// [/alpha/bin/a.d.ts]
export { };

//// [/alpha/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "bin"
  },
  "references": []
}

//// [/beta/b.ts]
import { m } from '../alpha/a'

//// [/beta/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "bin"
  },
  "references": [
    {
      "path": "../alpha"
    }
  ]
}

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



Output::
/lib/tsc --p /beta/tsconfig.json --explainFiles
[96mbeta/b.ts[0m:[93m1[0m:[93m10[0m - [91merror[0m[90m TS2305: [0mModule '"../alpha/a"' has no exported member 'm'.

[7m1[0m import { m } from '../alpha/a'
[7m [0m [91m         ~[0m

lib/lib.d.ts
  Default library for target 'es5'
alpha/bin/a.d.ts
  Imported via '../alpha/a' from file 'beta/b.ts'
  File is output of project reference source 'alpha/a.ts'
beta/b.ts
  Matched by default include pattern '**/*'

Found 1 error in beta/b.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/beta/bin/b.d.ts]
export {};


//// [/beta/bin/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/beta/bin/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../../alpha/bin/a.d.ts","../b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-3531955686-export { };",{"version":"-4853599800-import { m } from '../alpha/a'","signature":"-3531856636-export {};\n"}],"root":[3],"options":{"composite":true,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[2,[3,[{"file":"../b.ts","start":9,"length":1,"messageText":"Module '\"../alpha/a\"' has no exported member 'm'.","category":1,"code":2305}]],1],"latestChangedDtsFile":"./b.d.ts"},"version":"FakeTSVersion"}

//// [/beta/bin/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../../alpha/bin/a.d.ts",
      "../b.ts"
    ],
    "fileNamesList": [
      [
        "../../alpha/bin/a.d.ts"
      ]
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
      "../../alpha/bin/a.d.ts": {
        "version": "-3531955686-export { };",
        "signature": "-3531955686-export { };"
      },
      "../b.ts": {
        "original": {
          "version": "-4853599800-import { m } from '../alpha/a'",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-4853599800-import { m } from '../alpha/a'",
        "signature": "-3531856636-export {};\n"
      }
    },
    "root": [
      [
        3,
        "../b.ts"
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../b.ts": [
        "../../alpha/bin/a.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../alpha/bin/a.d.ts",
      [
        "../b.ts",
        [
          {
            "file": "../b.ts",
            "start": 9,
            "length": 1,
            "messageText": "Module '\"../alpha/a\"' has no exported member 'm'.",
            "category": 1,
            "code": 2305
          }
        ]
      ],
      "../../lib/lib.d.ts"
    ],
    "latestChangedDtsFile": "./b.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1054
}


currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/alpha/a.ts]
export const m: number = 3;

//// [/alpha/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "bin"
  },
  "references": []
}

//// [/beta/b.ts]
import { m } from '@alpha/a'

//// [/beta/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "bin",
    "baseUrl": "./",
    "paths": {
      "@alpha/*": [
        "/alpha/*"
      ]
    }
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
/lib/tsc --p /beta/tsconfig.json
[96mbeta/b.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS6305: [0mOutput file '/alpha/bin/a.d.ts' has not been built from source file '/alpha/a.ts'.

[7m1[0m import { m } from '@alpha/a'
[7m [0m [91m                  ~~~~~~~~~~[0m


Found 1 error in beta/b.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/beta/bin/b.d.ts]
export {};


//// [/beta/bin/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/beta/bin/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"2892088637-import { m } from '@alpha/a'","signature":"-3531856636-export {};\n"}],"root":[2],"options":{"composite":true,"outDir":"./"},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[[2,[{"file":"../b.ts","start":18,"length":10,"messageText":"Output file '/alpha/bin/a.d.ts' has not been built from source file '/alpha/a.ts'.","category":1,"code":6305}]],1],"latestChangedDtsFile":"./b.d.ts"},"version":"FakeTSVersion"}

//// [/beta/bin/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../b.ts"
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
      "../b.ts": {
        "original": {
          "version": "2892088637-import { m } from '@alpha/a'",
          "signature": "-3531856636-export {};\n"
        },
        "version": "2892088637-import { m } from '@alpha/a'",
        "signature": "-3531856636-export {};\n"
      }
    },
    "root": [
      [
        2,
        "../b.ts"
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      [
        "../b.ts",
        [
          {
            "file": "../b.ts",
            "start": 18,
            "length": 10,
            "messageText": "Output file '/alpha/bin/a.d.ts' has not been built from source file '/alpha/a.ts'.",
            "category": 1,
            "code": 6305
          }
        ]
      ],
      "../../lib/lib.d.ts"
    ],
    "latestChangedDtsFile": "./b.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1006
}


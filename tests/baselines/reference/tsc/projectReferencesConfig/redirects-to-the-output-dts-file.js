currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/alpha/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "bin"
  },
  "references": []
}

//// [/home/src/workspaces/project/alpha/a.ts]
export const m: number = 3;

//// [/home/src/workspaces/project/alpha/bin/a.d.ts]
export { };

//// [/home/src/workspaces/project/beta/tsconfig.json]
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

//// [/home/src/workspaces/project/beta/b.ts]
import { m } from '../alpha/a'

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


/home/src/tslibs/TS/Lib/tsc.js --p beta/tsconfig.json --explainFiles
Output::
[96mbeta/b.ts[0m:[93m1[0m:[93m10[0m - [91merror[0m[90m TS2305: [0mModule '"../alpha/a"' has no exported member 'm'.

[7m1[0m import { m } from '../alpha/a'
[7m [0m [91m         ~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
alpha/bin/a.d.ts
  Imported via '../alpha/a' from file 'beta/b.ts'
  File is output of project reference source 'alpha/a.ts'
beta/b.ts
  Matched by default include pattern '**/*'

Found 1 error in beta/b.ts[90m:1[0m



//// [/home/src/workspaces/project/beta/bin/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/beta/bin/b.d.ts]
export {};


//// [/home/src/workspaces/project/beta/bin/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","../../alpha/bin/a.d.ts","../b.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-3531955686-export { };",{"version":"-4853599800-import { m } from '../alpha/a'","signature":"-3531856636-export {};\n"}],"root":[3],"options":{"composite":true,"outDir":"./"},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"start":9,"length":1,"messageText":"Module '\"../alpha/a\"' has no exported member 'm'.","category":1,"code":2305}]]],"latestChangedDtsFile":"./b.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/beta/bin/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "../../alpha/bin/a.d.ts",
    "../b.ts"
  ],
  "fileIdsList": [
    [
      "../../alpha/bin/a.d.ts"
    ]
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
  "semanticDiagnosticsPerFile": [
    [
      "../b.ts",
      [
        {
          "start": 9,
          "length": 1,
          "messageText": "Module '\"../alpha/a\"' has no exported member 'm'.",
          "category": 1,
          "code": 2305
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./b.d.ts",
  "version": "FakeTSVersion",
  "size": 1013
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

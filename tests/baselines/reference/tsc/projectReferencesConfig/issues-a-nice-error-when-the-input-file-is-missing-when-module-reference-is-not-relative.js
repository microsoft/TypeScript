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

//// [/home/src/workspaces/project/beta/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "bin",
    "baseUrl": "./",
    "paths": {
      "@alpha/*": [
        "/home/src/workspaces/project/alpha/*"
      ]
    }
  },
  "references": [
    {
      "path": "../alpha"
    }
  ]
}

//// [/home/src/workspaces/project/beta/b.ts]
import { m } from '@alpha/a'

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


/home/src/tslibs/TS/Lib/tsc.js --p beta/tsconfig.json
Output::
[96mbeta/b.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS6305: [0mOutput file '/home/src/workspaces/project/alpha/bin/a.d.ts' has not been built from source file '/home/src/workspaces/project/alpha/a.ts'.

[7m1[0m import { m } from '@alpha/a'
[7m [0m [91m                  ~~~~~~~~~~[0m


Found 1 error in beta/b.ts[90m:1[0m



//// [/home/src/workspaces/project/beta/bin/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/beta/bin/b.d.ts]
export {};


//// [/home/src/workspaces/project/beta/bin/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","../b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"2892088637-import { m } from '@alpha/a'","signature":"-3531856636-export {};\n"}],"root":[2],"options":{"composite":true,"outDir":"./"},"semanticDiagnosticsPerFile":[[2,[{"start":18,"length":10,"messageText":"Output file '/home/src/workspaces/project/alpha/bin/a.d.ts' has not been built from source file '/home/src/workspaces/project/alpha/a.ts'.","category":1,"code":6305}]]],"latestChangedDtsFile":"./b.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/beta/bin/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "../b.ts"
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
  "semanticDiagnosticsPerFile": [
    [
      "../b.ts",
      [
        {
          "start": 18,
          "length": 10,
          "messageText": "Output file '/home/src/workspaces/project/alpha/bin/a.d.ts' has not been built from source file '/home/src/workspaces/project/alpha/a.ts'.",
          "category": 1,
          "code": 6305
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./b.d.ts",
  "version": "FakeTSVersion",
  "size": 1004
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

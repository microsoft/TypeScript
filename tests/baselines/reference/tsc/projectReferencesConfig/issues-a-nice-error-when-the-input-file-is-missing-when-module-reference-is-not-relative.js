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
[96mbeta/tsconfig.json[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'baseUrl' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.
  Visit https://aka.ms/ts6 for migration information.

[7m5[0m     "baseUrl": "./",
[7m [0m [91m    ~~~~~~~~~[0m


Found 1 error in beta/tsconfig.json[90m:5[0m



//// [/home/src/workspaces/project/beta/bin/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/beta/bin/b.d.ts]
export {};


//// [/home/src/workspaces/project/beta/bin/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","../b.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"2892088637-import { m } from '@alpha/a'","signature":"-3531856636-export {};\n"}],"root":[2],"options":{"composite":true,"outDir":"./"},"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./b.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/beta/bin/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "../b.ts"
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
      "../../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "../b.ts",
      "not cached or not changed"
    ]
  ],
  "latestChangedDtsFile": "./b.d.ts",
  "version": "FakeTSVersion",
  "size": 757
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

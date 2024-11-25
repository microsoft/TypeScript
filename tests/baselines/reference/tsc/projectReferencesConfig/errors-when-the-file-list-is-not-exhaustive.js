currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/primary/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "bin"
  },
  "references": [],
  "files": [
    "a.ts"
  ]
}

//// [/home/src/workspaces/project/primary/a.ts]
import * as b from './b'

//// [/home/src/workspaces/project/primary/b.ts]
export {}

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


/home/src/tslibs/TS/Lib/tsc.js --p primary/tsconfig.json
Output::
[96mprimary/a.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/primary/b.ts' is not listed within the file list of project '/home/src/workspaces/project/primary/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import * as b from './b'
[7m [0m [91m                   ~~~~~[0m


Found 1 error in primary/a.ts[90m:1[0m



//// [/home/src/workspaces/project/primary/bin/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/primary/bin/b.d.ts]
export {};


//// [/home/src/workspaces/project/primary/bin/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/primary/bin/a.d.ts]
export {};


//// [/home/src/workspaces/project/primary/bin/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","../b.ts","../a.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-2704852577-export {}","signature":"-3531856636-export {};\n"},{"version":"-4190788607-import * as b from './b'","signature":"-3531856636-export {};\n"}],"root":[3],"options":{"composite":true,"outDir":"./"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./a.d.ts","errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/primary/bin/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "../b.ts",
    "../a.ts"
  ],
  "fileIdsList": [
    [
      "../b.ts"
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
    "../b.ts": {
      "original": {
        "version": "-2704852577-export {}",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-2704852577-export {}",
      "signature": "-3531856636-export {};\n"
    },
    "../a.ts": {
      "original": {
        "version": "-4190788607-import * as b from './b'",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-4190788607-import * as b from './b'",
      "signature": "-3531856636-export {};\n"
    }
  },
  "root": [
    [
      3,
      "../a.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "referencedMap": {
    "../a.ts": [
      "../b.ts"
    ]
  },
  "latestChangedDtsFile": "./a.d.ts",
  "errors": true,
  "version": "FakeTSVersion",
  "size": 902
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

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
    "composite": false,
    "outDir": "bin"
  },
  "references": []
}

//// [/reference/b.ts]
import * as mod_0 from "../primary/a"

//// [/reference/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "bin"
  },
  "references": [
    {
      "path": "../primary"
    }
  ],
  "files": [
    "b.ts"
  ]
}



Output::
/lib/tsc --p /reference/tsconfig.json
[96mreference/tsconfig.json[0m:[93m7[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/primary' must have setting "composite": true.

[7m7[0m     {
[7m [0m [91m    ~[0m
[7m8[0m       "path": "../primary"
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m9[0m     }
[7m [0m [91m~~~~~[0m


Found 1 error in reference/tsconfig.json[90m:7[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/reference/bin/b.d.ts]
export {};


//// [/reference/bin/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/reference/bin/tsconfig.tsbuildinfo]
<<<<<<< HEAD
{"program":{"fileNames":["../../lib/lib.d.ts","../b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-9543969340-import * as mod_0 from \"../primary/a\"","signature":"-3531856636-export {};\n","impliedFormat":1}],"root":[2],"options":{"composite":true,"outDir":"./"},"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./b.d.ts"},"version":"FakeTSVersion"}
=======
{"fileNames":["../../lib/lib.d.ts","../b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-9543969340-import * as mod_0 from \"../primary/a\"","signature":"-3531856636-export {};\n"}],"root":[2],"options":{"composite":true,"outDir":"./"},"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./b.d.ts","version":"FakeTSVersion"}
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)

//// [/reference/bin/tsconfig.tsbuildinfo.readable.baseline.txt]
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
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
<<<<<<< HEAD
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../b.ts": {
        "original": {
          "version": "-9543969340-import * as mod_0 from \"../primary/a\"",
          "signature": "-3531856636-export {};\n",
          "impliedFormat": 1
        },
        "version": "-9543969340-import * as mod_0 from \"../primary/a\"",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "../b.ts"
      ]
=======
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../b.ts": {
      "original": {
        "version": "-9543969340-import * as mod_0 from \"../primary/a\"",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-9543969340-import * as mod_0 from \"../primary/a\"",
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
      "../../lib/lib.d.ts",
      "not cached or not changed"
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
    ],
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "semanticDiagnosticsPerFile": [
      [
        "../../lib/lib.d.ts",
        "not cached or not changed"
      ],
      [
        "../b.ts",
        "not cached or not changed"
      ]
    ],
    "latestChangedDtsFile": "./b.d.ts"
  },
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 841
=======
  "size": 793
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
}


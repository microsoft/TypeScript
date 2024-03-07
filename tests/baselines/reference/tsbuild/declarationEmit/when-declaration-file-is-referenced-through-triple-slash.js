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

//// [/src/solution/src/common/nominal.ts]
/// <reference path="./types.d.ts" />
export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;

//// [/src/solution/src/common/tsconfig.json]
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true
  },
  "include": [
    "./nominal.ts"
  ]
}

//// [/src/solution/src/common/types.d.ts]
declare type MyNominal<T, Name extends string> = T & {
    specialKey: Name;
};

//// [/src/solution/src/subProject/index.ts]
import { Nominal } from '../common/nominal';
export type MyNominal = Nominal<string, 'MyNominal'>;

//// [/src/solution/src/subProject/tsconfig.json]
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../common"
    }
  ],
  "include": [
    "./index.ts"
  ]
}

//// [/src/solution/src/subProject2/index.ts]
import { MyNominal } from '../subProject/index';
const variable = {
    key: 'value' as MyNominal,
};
export function getVar(): keyof typeof variable {
    return 'key';
}

//// [/src/solution/src/subProject2/tsconfig.json]
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../subProject"
    }
  ],
  "include": [
    "./index.ts"
  ]
}

//// [/src/solution/src/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "./subProject"
    },
    {
      "path": "./subProject2"
    }
  ],
  "include": []
}

//// [/src/solution/tsconfig.base.json]
{
  "compilerOptions": {
    "rootDir": "./",
    "outDir": "lib"
  }
}

//// [/src/solution/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "./src"
    }
  ],
  "include": []
}



Output::
/lib/tsc --b /src/solution/tsconfig.json --verbose
[[90m12:00:21 AM[0m] Projects in this build: 
    * src/solution/src/common/tsconfig.json
    * src/solution/src/subProject/tsconfig.json
    * src/solution/src/subProject2/tsconfig.json
    * src/solution/src/tsconfig.json
    * src/solution/tsconfig.json

[[90m12:00:22 AM[0m] Project 'src/solution/src/common/tsconfig.json' is out of date because output file 'src/solution/lib/src/common/tsconfig.tsbuildinfo' does not exist

[[90m12:00:23 AM[0m] Building project '/src/solution/src/common/tsconfig.json'...

[[90m12:00:32 AM[0m] Project 'src/solution/src/subProject/tsconfig.json' is out of date because output file 'src/solution/lib/src/subProject/tsconfig.tsbuildinfo' does not exist

[[90m12:00:33 AM[0m] Building project '/src/solution/src/subProject/tsconfig.json'...

[96msrc/solution/lib/src/common/nominal.d.ts[0m:[93m1[0m:[93m55[0m - [91merror[0m[90m TS2552: [0mCannot find name 'MyNominal'. Did you mean 'Nominal'?

[7m1[0m export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;
[7m [0m [91m                                                      ~~~~~~~~~[0m

[[90m12:00:38 AM[0m] Project 'src/solution/src/subProject2/tsconfig.json' can't be built because its dependency 'src/solution/src/subProject' has errors

[[90m12:00:39 AM[0m] Skipping build of project '/src/solution/src/subProject2/tsconfig.json' because its dependency '/src/solution/src/subProject' has errors


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/solution/lib/src/common/nominal.d.ts]
export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;


//// [/src/solution/lib/src/common/nominal.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./types.d.ts" />


//// [/src/solution/lib/src/common/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../lib/lib.d.ts","../../../src/common/types.d.ts","../../../src/common/nominal.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"23815050294-declare type MyNominal<T, Name extends string> = T & {\n    specialKey: Name;\n};","affectsGlobalScope":true},{"version":"4107369137-/// <reference path=\"./types.d.ts\" />\nexport declare type Nominal<T, Name extends string> = MyNominal<T, Name>;","signature":"-15213577403-export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;\n"}],"root":[3],"options":{"composite":true,"outDir":"../..","rootDir":"../../.."},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,2],"latestChangedDtsFile":"./nominal.d.ts"},"version":"FakeTSVersion"}

//// [/src/solution/lib/src/common/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../lib/lib.d.ts",
      "../../../src/common/types.d.ts",
      "../../../src/common/nominal.ts"
    ],
    "fileNamesList": [
      [
        "../../../src/common/types.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../../src/common/types.d.ts": {
        "original": {
          "version": "23815050294-declare type MyNominal<T, Name extends string> = T & {\n    specialKey: Name;\n};",
          "affectsGlobalScope": true
        },
        "version": "23815050294-declare type MyNominal<T, Name extends string> = T & {\n    specialKey: Name;\n};",
        "signature": "23815050294-declare type MyNominal<T, Name extends string> = T & {\n    specialKey: Name;\n};",
        "affectsGlobalScope": true
      },
      "../../../src/common/nominal.ts": {
        "original": {
          "version": "4107369137-/// <reference path=\"./types.d.ts\" />\nexport declare type Nominal<T, Name extends string> = MyNominal<T, Name>;",
          "signature": "-15213577403-export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;\n"
        },
        "version": "4107369137-/// <reference path=\"./types.d.ts\" />\nexport declare type Nominal<T, Name extends string> = MyNominal<T, Name>;",
        "signature": "-15213577403-export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;\n"
      }
    },
    "root": [
      [
        3,
        "../../../src/common/nominal.ts"
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "../..",
      "rootDir": "../../.."
    },
    "referencedMap": {
      "../../../src/common/nominal.ts": [
        "../../../src/common/types.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../lib/lib.d.ts",
      "../../../src/common/nominal.ts",
      "../../../src/common/types.d.ts"
    ],
    "latestChangedDtsFile": "./nominal.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1242
}

//// [/src/solution/lib/src/subProject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../lib/lib.d.ts","../common/nominal.d.ts","../../../src/subproject/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-15213577403-export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;\n","-25117049605-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;"],"root":[3],"options":{"composite":true,"outDir":"../..","rootDir":"../../.."},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,[2,[{"file":"../common/nominal.d.ts","start":54,"length":9,"messageText":"Cannot find name 'MyNominal'. Did you mean 'Nominal'?","category":1,"code":2552}]],3],"affectedFilesPendingEmit":[3],"emitSignatures":[3]},"version":"FakeTSVersion"}

//// [/src/solution/lib/src/subProject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../lib/lib.d.ts",
      "../common/nominal.d.ts",
      "../../../src/subproject/index.ts"
    ],
    "fileNamesList": [
      [
        "../common/nominal.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../common/nominal.d.ts": {
        "version": "-15213577403-export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;\n",
        "signature": "-15213577403-export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;\n"
      },
      "../../../src/subproject/index.ts": {
        "version": "-25117049605-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;",
        "signature": "-25117049605-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;"
      }
    },
    "root": [
      [
        3,
        "../../../src/subproject/index.ts"
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "../..",
      "rootDir": "../../.."
    },
    "referencedMap": {
      "../../../src/subproject/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../../../src/subproject/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../lib/lib.d.ts",
      [
        "../common/nominal.d.ts",
        [
          {
            "file": "../common/nominal.d.ts",
            "start": 54,
            "length": 9,
            "messageText": "Cannot find name 'MyNominal'. Did you mean 'Nominal'?",
            "category": 1,
            "code": 2552
          }
        ]
      ],
      "../../../src/subproject/index.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "../../../src/subproject/index.ts",
        "Js | Dts"
      ]
    ],
    "emitSignatures": [
      "../../../src/subproject/index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1237
}


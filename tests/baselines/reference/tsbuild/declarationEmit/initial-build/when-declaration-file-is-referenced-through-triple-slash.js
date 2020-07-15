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
{"extends":"../../tsconfig.base.json","compilerOptions":{"composite":true},"include":["./nominal.ts"]}

//// [/src/solution/src/common/types.d.ts]
declare type MyNominal<T, Name extends string> = T & {
    specialKey: Name;
};

//// [/src/solution/src/subProject/index.ts]
import { Nominal } from '../common/nominal';
export type MyNominal = Nominal<string, 'MyNominal'>;

//// [/src/solution/src/subProject/tsconfig.json]
{"extends":"../../tsconfig.base.json","compilerOptions":{"composite":true},"references":[{"path":"../common"}],"include":["./index.ts"]}

//// [/src/solution/src/subProject2/index.ts]


//// [/src/solution/src/subProject2/tsconfig.json]
{"extends":"../../tsconfig.base.json","compilerOptions":{"composite":true},"references":[{"path":"../subProject"}],"include":["./index.ts"]}

//// [/src/solution/src/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"./subProject"},{"path":"./subProject2"}],"include":[]}

//// [/src/solution/tsconfig.base.json]
{"compilerOptions":{"rootDir":"./","outDir":"lib"}}

//// [/src/solution/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"./src"}],"include":[]}



Output::
/lib/tsc --b /src/solution/tsconfig.json --verbose
[[90m12:00:00 AM[0m] Projects in this build: 
    * src/solution/src/common/tsconfig.json
    * src/solution/src/subProject/tsconfig.json
    * src/solution/src/subProject2/tsconfig.json
    * src/solution/src/tsconfig.json
    * src/solution/tsconfig.json

[[90m12:00:00 AM[0m] Project 'src/solution/src/common/tsconfig.json' is out of date because output file 'src/solution/lib/src/common/nominal.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/solution/src/common/tsconfig.json'...

[[90m12:00:00 AM[0m] Project 'src/solution/src/subProject/tsconfig.json' is out of date because output file 'src/solution/lib/src/subProject/index.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/solution/src/subProject/tsconfig.json'...

[96msrc/solution/lib/src/common/nominal.d.ts[0m:[93m2[0m:[93m55[0m - [91merror[0m[90m TS2304: [0mCannot find name 'MyNominal'.

[7m2[0m export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;
[7m [0m [91m                                                      ~~~~~~~~~[0m

[96msrc/solution/lib/src/common/nominal.d.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/src/common/types.d.ts' not found.

[7m1[0m /// <reference path="../../../src/common/types.d.ts" />
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:00:00 AM[0m] Project 'src/solution/src/subProject2/tsconfig.json' can't be built because its dependency 'src/solution/src/subProject' has errors

[[90m12:00:00 AM[0m] Skipping build of project '/src/solution/src/subProject2/tsconfig.json' because its dependency '/src/solution/src/subProject' has errors


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/solution/lib/src/common/nominal.d.ts]
/// <reference path="../../../src/common/types.d.ts" />
export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;


//// [/src/solution/lib/src/common/nominal.js]
"use strict";
exports.__esModule = true;
/// <reference path="./types.d.ts" />


//// [/src/solution/lib/src/common/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../../src/common/types.d.ts": {
        "version": "23815050294-declare type MyNominal<T, Name extends string> = T & {\n    specialKey: Name;\n};",
        "signature": "23815050294-declare type MyNominal<T, Name extends string> = T & {\n    specialKey: Name;\n};",
        "affectsGlobalScope": true
      },
      "../../../src/common/nominal.ts": {
        "version": "4107369137-/// <reference path=\"./types.d.ts\" />\nexport declare type Nominal<T, Name extends string> = MyNominal<T, Name>;",
        "signature": "-18894149496-/// <reference path=\"../../../src/common/types.d.ts\" />\r\nexport declare type Nominal<T, Name extends string> = MyNominal<T, Name>;\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "rootDir": "../../..",
      "outDir": "../..",
      "composite": true,
      "configFilePath": "../../../src/common/tsconfig.json"
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
    ]
  },
  "version": "FakeTSVersion"
}

//// [/src/solution/lib/src/subProject/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../common/nominal.d.ts": {
        "version": "-18894149496-/// <reference path=\"../../../src/common/types.d.ts\" />\r\nexport declare type Nominal<T, Name extends string> = MyNominal<T, Name>;\r\n",
        "signature": "-18894149496-/// <reference path=\"../../../src/common/types.d.ts\" />\r\nexport declare type Nominal<T, Name extends string> = MyNominal<T, Name>;\r\n",
        "affectsGlobalScope": false
      },
      "../../../src/subproject/index.ts": {
        "version": "-25117049605-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;",
        "signature": "-21416888433-import { Nominal } from '../common/nominal';\r\nexport declare type MyNominal = Nominal<string, 'MyNominal'>;\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "rootDir": "../../..",
      "outDir": "../..",
      "composite": true,
      "configFilePath": "../../../src/subProject/tsconfig.json"
    },
    "referencedMap": {
      "../common/nominal.d.ts": [
        "../../../src/common/types.d.ts"
      ],
      "../../../src/subproject/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../common/nominal.d.ts": [
        "../../../src/common/types.d.ts"
      ],
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
            "start": 111,
            "length": 9,
            "messageText": "Cannot find name 'MyNominal'.",
            "category": 1,
            "code": 2304
          }
        ]
      ],
      "../../../src/subproject/index.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "../common/nominal.d.ts",
        1
      ],
      [
        "../../../src/subproject/index.ts",
        1
      ]
    ]
  },
  "version": "FakeTSVersion"
}


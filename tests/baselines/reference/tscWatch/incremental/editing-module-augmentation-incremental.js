currentDirectory:: /users/username/projects/project useCaseSensitiveFileNames: false
Input::
//// [/a/lib/lib.d.ts]
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

//// [/users/username/projects/project/node_modules/classnames/index.d.ts]
export interface Result {} export default function classNames(): Result;

//// [/users/username/projects/project/src/types/classnames.d.ts]
export {}; declare module "classnames" { interface Result { foo } }

//// [/users/username/projects/project/src/index.ts]
import classNames from "classnames"; classNames().foo;

//// [/users/username/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs",
    "incremental": true
  }
}


/a/lib/tsc.js -i
Output::


//// [/users/username/projects/project/src/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classnames_1 = require("classnames");
(0, classnames_1.default)().foo;


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../a/lib/lib.d.ts","./node_modules/classnames/index.d.ts","./src/index.ts","./src/types/classnames.d.ts"],"fileIdsList":[[2,4],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1239706283-export interface Result {} export default function classNames(): Result;","impliedFormat":1},"-5756287633-import classNames from \"classnames\"; classNames().foo;","-16510108606-export {}; declare module \"classnames\" { interface Result { foo } }"],"root":[3,4],"options":{"module":1},"referencedMap":[[3,1],[4,2]],"version":"FakeTSVersion"}

//// [/users/username/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../a/lib/lib.d.ts",
    "./node_modules/classnames/index.d.ts",
    "./src/index.ts",
    "./src/types/classnames.d.ts"
  ],
  "fileIdsList": [
    [
      "./node_modules/classnames/index.d.ts",
      "./src/types/classnames.d.ts"
    ],
    [
      "./node_modules/classnames/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../a/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./node_modules/classnames/index.d.ts": {
      "original": {
        "version": "1239706283-export interface Result {} export default function classNames(): Result;",
        "impliedFormat": 1
      },
      "version": "1239706283-export interface Result {} export default function classNames(): Result;",
      "signature": "1239706283-export interface Result {} export default function classNames(): Result;",
      "impliedFormat": "commonjs"
    },
    "./src/index.ts": {
      "version": "-5756287633-import classNames from \"classnames\"; classNames().foo;",
      "signature": "-5756287633-import classNames from \"classnames\"; classNames().foo;"
    },
    "./src/types/classnames.d.ts": {
      "version": "-16510108606-export {}; declare module \"classnames\" { interface Result { foo } }",
      "signature": "-16510108606-export {}; declare module \"classnames\" { interface Result { foo } }"
    }
  },
  "root": [
    [
      3,
      "./src/index.ts"
    ],
    [
      4,
      "./src/types/classnames.d.ts"
    ]
  ],
  "options": {
    "module": 1
  },
  "referencedMap": {
    "./src/index.ts": [
      "./node_modules/classnames/index.d.ts",
      "./src/types/classnames.d.ts"
    ],
    "./src/types/classnames.d.ts": [
      "./node_modules/classnames/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1013
}


Program root files: [
  "/users/username/projects/project/src/index.ts",
  "/users/username/projects/project/src/types/classnames.d.ts"
]
Program options: {
  "module": 1,
  "incremental": true,
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/node_modules/classnames/index.d.ts
/users/username/projects/project/src/index.ts
/users/username/projects/project/src/types/classnames.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/node_modules/classnames/index.d.ts
/users/username/projects/project/src/index.ts
/users/username/projects/project/src/types/classnames.d.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/users/username/projects/project/node_modules/classnames/index.d.ts (used version)
/users/username/projects/project/src/index.ts (used version)
/users/username/projects/project/src/types/classnames.d.ts (used version)

exitCode:: ExitStatus.Success

Change::

Input::
//// [/users/username/projects/project/src/types/classnames.d.ts]
export {}; declare module "classnames" { interface Result {} }


Output::
[96msrc/index.ts[0m:[93m1[0m:[93m51[0m - [91merror[0m[90m TS2339: [0mProperty 'foo' does not exist on type 'Result'.

[7m1[0m import classNames from "classnames"; classNames().foo;
[7m [0m [91m                                                  ~~~[0m


Found 1 error in src/index.ts[90m:1[0m



//// [/users/username/projects/project/src/index.js] file written with same contents
//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../a/lib/lib.d.ts","./node_modules/classnames/index.d.ts","./src/index.ts","./src/types/classnames.d.ts"],"fileIdsList":[[2,4],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1239706283-export interface Result {} export default function classNames(): Result;","impliedFormat":1},{"version":"-5756287633-import classNames from \"classnames\"; classNames().foo;","signature":"-3531856636-export {};\n"},"-14890340642-export {}; declare module \"classnames\" { interface Result {} }"],"root":[3,4],"options":{"module":1},"referencedMap":[[3,1],[4,2]],"semanticDiagnosticsPerFile":[[3,[{"start":50,"length":3,"code":2339,"category":1,"messageText":"Property 'foo' does not exist on type 'Result'."}]]],"version":"FakeTSVersion"}

//// [/users/username/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../a/lib/lib.d.ts",
    "./node_modules/classnames/index.d.ts",
    "./src/index.ts",
    "./src/types/classnames.d.ts"
  ],
  "fileIdsList": [
    [
      "./node_modules/classnames/index.d.ts",
      "./src/types/classnames.d.ts"
    ],
    [
      "./node_modules/classnames/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../a/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./node_modules/classnames/index.d.ts": {
      "original": {
        "version": "1239706283-export interface Result {} export default function classNames(): Result;",
        "impliedFormat": 1
      },
      "version": "1239706283-export interface Result {} export default function classNames(): Result;",
      "signature": "1239706283-export interface Result {} export default function classNames(): Result;",
      "impliedFormat": "commonjs"
    },
    "./src/index.ts": {
      "original": {
        "version": "-5756287633-import classNames from \"classnames\"; classNames().foo;",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-5756287633-import classNames from \"classnames\"; classNames().foo;",
      "signature": "-3531856636-export {};\n"
    },
    "./src/types/classnames.d.ts": {
      "version": "-14890340642-export {}; declare module \"classnames\" { interface Result {} }",
      "signature": "-14890340642-export {}; declare module \"classnames\" { interface Result {} }"
    }
  },
  "root": [
    [
      3,
      "./src/index.ts"
    ],
    [
      4,
      "./src/types/classnames.d.ts"
    ]
  ],
  "options": {
    "module": 1
  },
  "referencedMap": {
    "./src/index.ts": [
      "./node_modules/classnames/index.d.ts",
      "./src/types/classnames.d.ts"
    ],
    "./src/types/classnames.d.ts": [
      "./node_modules/classnames/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./src/index.ts",
      [
        {
          "start": 50,
          "length": 3,
          "code": 2339,
          "category": 1,
          "messageText": "Property 'foo' does not exist on type 'Result'."
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1209
}


Program root files: [
  "/users/username/projects/project/src/index.ts",
  "/users/username/projects/project/src/types/classnames.d.ts"
]
Program options: {
  "module": 1,
  "incremental": true,
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/node_modules/classnames/index.d.ts
/users/username/projects/project/src/index.ts
/users/username/projects/project/src/types/classnames.d.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/src/index.ts
/users/username/projects/project/src/types/classnames.d.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/src/types/classnames.d.ts (used version)
/users/username/projects/project/src/index.ts (computed .d.ts)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

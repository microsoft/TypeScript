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

//// [/src/shared/types/db.ts]
export interface A {
    name: string;
}

//// [/src/src/main.ts]
import { A } from "../shared/types/db";
const a: string = 10;

//// [/src/src/other.ts]
console.log("hi");
export { }

//// [/src/tsconfig.json]
{
    "compilerOptions": {
        "outDir": "./dev-build",
        "noEmitOnError": true
    }
}




Output::
/lib/tsc --b /src/tsconfig.json --incremental
[96msrc/src/main.ts[0m:[93m2[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m2[0m const a: string = 10;
[7m [0m [91m      ~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/shared/types/db.ts","/src/src/main.ts","/src/src/other.ts"]
Program options: {"outDir":"/src/dev-build","noEmitOnError":true,"incremental":true,"configFilePath":"/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/shared/types/db.ts
/src/src/main.ts
/src/src/other.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/shared/types/db.ts
/src/src/main.ts
/src/src/other.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/shared/types/db.ts (used version)
/src/src/main.ts (used version)
/src/src/other.ts (used version)


//// [/src/dev-build/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../shared/types/db.ts","../src/main.ts","../src/other.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-9621097780-export interface A {\r\n    name: string;\r\n}","-11111345725-import { A } from \"../shared/types/db\";\nconst a: string = 10;","11373096570-console.log(\"hi\");\r\nexport { }"],"options":{"noEmitOnError":true,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,[3,[{"file":"../src/main.ts","start":46,"length":1,"code":2322,"category":1,"messageText":"Type 'number' is not assignable to type 'string'."}]],4],"affectedFilesPendingEmit":[[2,1],[3,1],[4,1]]},"version":"FakeTSVersion"}

//// [/src/dev-build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../shared/types/db.ts",
      "../src/main.ts",
      "../src/other.ts"
    ],
    "fileNamesList": [
      [
        "../shared/types/db.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../shared/types/db.ts": {
        "version": "-9621097780-export interface A {\r\n    name: string;\r\n}",
        "signature": "-9621097780-export interface A {\r\n    name: string;\r\n}"
      },
      "../src/main.ts": {
        "version": "-11111345725-import { A } from \"../shared/types/db\";\nconst a: string = 10;",
        "signature": "-11111345725-import { A } from \"../shared/types/db\";\nconst a: string = 10;"
      },
      "../src/other.ts": {
        "version": "11373096570-console.log(\"hi\");\r\nexport { }",
        "signature": "11373096570-console.log(\"hi\");\r\nexport { }"
      }
    },
    "options": {
      "noEmitOnError": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../src/main.ts": [
        "../shared/types/db.ts"
      ]
    },
    "exportedModulesMap": {
      "../src/main.ts": [
        "../shared/types/db.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../shared/types/db.ts",
      [
        "../src/main.ts",
        [
          {
            "file": "../src/main.ts",
            "start": 46,
            "length": 1,
            "code": 2322,
            "category": 1,
            "messageText": "Type 'number' is not assignable to type 'string'."
          }
        ]
      ],
      "../src/other.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "../shared/types/db.ts",
        "Full"
      ],
      [
        "../src/main.ts",
        "Full"
      ],
      [
        "../src/other.ts",
        "Full"
      ]
    ]
  },
  "version": "FakeTSVersion",
  "size": 1165
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json --incremental
[96msrc/src/main.ts[0m:[93m2[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m2[0m const a: string = 10;
[7m [0m [91m      ~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/shared/types/db.ts","/src/src/main.ts","/src/src/other.ts"]
Program options: {"outDir":"/src/dev-build","noEmitOnError":true,"incremental":true,"configFilePath":"/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/shared/types/db.ts
/src/src/main.ts
/src/src/other.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::




Change:: Fix error
Input::
//// [/src/src/main.ts]
import { A } from "../shared/types/db";
const a: string = "hello";



Output::
/lib/tsc --b /src/tsconfig.json --incremental
exitCode:: ExitStatus.Success
Program root files: ["/src/shared/types/db.ts","/src/src/main.ts","/src/src/other.ts"]
Program options: {"outDir":"/src/dev-build","noEmitOnError":true,"incremental":true,"configFilePath":"/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/shared/types/db.ts
/src/src/main.ts
/src/src/other.ts

Semantic diagnostics in builder refreshed for::
/src/src/main.ts

Shape signatures in builder refreshed for::
/src/src/main.ts (computed .d.ts)


//// [/src/dev-build/shared/types/db.js]
"use strict";
exports.__esModule = true;


//// [/src/dev-build/src/main.js]
"use strict";
exports.__esModule = true;
var a = "hello";


//// [/src/dev-build/src/other.js]
"use strict";
exports.__esModule = true;
console.log("hi");


//// [/src/dev-build/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../shared/types/db.ts","../src/main.ts","../src/other.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-9621097780-export interface A {\r\n    name: string;\r\n}",{"version":"-8373351622-import { A } from \"../shared/types/db\";\nconst a: string = \"hello\";","signature":"-4882119183-export {};\r\n"},"11373096570-console.log(\"hi\");\r\nexport { }"],"options":{"noEmitOnError":true,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4]},"version":"FakeTSVersion"}

//// [/src/dev-build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../shared/types/db.ts",
      "../src/main.ts",
      "../src/other.ts"
    ],
    "fileNamesList": [
      [
        "../shared/types/db.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../shared/types/db.ts": {
        "version": "-9621097780-export interface A {\r\n    name: string;\r\n}",
        "signature": "-9621097780-export interface A {\r\n    name: string;\r\n}"
      },
      "../src/main.ts": {
        "version": "-8373351622-import { A } from \"../shared/types/db\";\nconst a: string = \"hello\";",
        "signature": "-4882119183-export {};\r\n"
      },
      "../src/other.ts": {
        "version": "11373096570-console.log(\"hi\");\r\nexport { }",
        "signature": "11373096570-console.log(\"hi\");\r\nexport { }"
      }
    },
    "options": {
      "noEmitOnError": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../src/main.ts": [
        "../shared/types/db.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../shared/types/db.ts",
      "../src/main.ts",
      "../src/other.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1029
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json --incremental
exitCode:: ExitStatus.Success


